import { test } from '@playwright/test'
import { LoginPage } from '../../src/pages/LoginPage'
import { users } from '../../src/data/users'

test('User cannot log in with invalid password', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await test.step('User opens login page', async () => {
    await loginPage.navigateToLoginPage()
  })

  await test.step('User enters valid username and invalid password', async () => {
    await loginPage.login(users.standardUser.username, 'wrong_password')
  })

  await test.step('Error message is shown and login fails', async () => {
    await loginPage.assertLoginErrorVisible()
    await loginPage.assertLoginErrorText(
      'Epic sadface: Username and password do not match any user in this service'
    )
  })
})

test('Locked out user cannot log in', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await test.step('User opens login page', async () => {
    await loginPage.navigateToLoginPage()
  })

  await test.step('Locked out user attempts to log in', async () => {
    await loginPage.login(
      users.lockedOutUser.username,
      users.lockedOutUser.password
    )
  })

  await test.step('Locked out error message is shown', async () => {
    await loginPage.assertLoginErrorVisible()
    await loginPage.assertLoginErrorText(
      'Epic sadface: Sorry, this user has been locked out.'
    )
  })
})
