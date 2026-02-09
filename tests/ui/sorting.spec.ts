import { test, expect } from '@playwright/test'
import { LoginPage } from '../../src/ui/pages/LoginPage'
import { InventoryPage } from '../../src/ui/pages/InventoryPage'
import { users } from '../../src/ui/data/users'
import { PAGES } from '../../src/ui/data/pages'

test('User can sort items by name Z-A', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const inventoryPage = new InventoryPage(page)

  await test.step('User logs in', async () => {
    await loginPage.navigateToLoginPage()
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    )
  })

  await test.step('Inventory page is loaded', async () => {
    await inventoryPage.assertPage(PAGES.INVENTORY)
  })

  await test.step('User sorts items by name Z-A', async () => {
  await inventoryPage.sortBy('za')
})
    await test.step('Items are sorted correctly', async () => {
    const itemNames = await inventoryPage.getItemNames()

    // Used AI to validate the correct approach for locale-aware string sorting
  const expectedSortedNames = [...itemNames].sort((a, b) =>
    b.localeCompare(a)
  )

  expect(itemNames).toEqual(expectedSortedNames)
})
})
