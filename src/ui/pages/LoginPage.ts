import { Page, expect } from '@playwright/test'

export class LoginPage {
  private page: Page

  private usernameInput = '#user-name'
  private passwordInput = '#password'
  private loginButton = '#login-button'
  private errorMessageBox = '[data-test="error"]'

  constructor(page: Page) {
    this.page = page
  }

  async navigateToLoginPage() {
  await this.page.goto('/')
  await expect(this.page.locator(this.loginButton)).toBeVisible()
}

  async login(username: string, password: string) {

    await this.page.fill(this.usernameInput, '')
    await this.page.fill(this.passwordInput, '')

    await this.page.fill(this.usernameInput, username)
    await this.page.fill(this.passwordInput, password)
    await this.page.click(this.loginButton)
  }

  async assertLoginErrorVisible() {
    await expect(this.page.locator(this.errorMessageBox)).toBeVisible()
  }

  async assertLoginErrorText(expectedMessage: string) {
    await expect(this.page.locator(this.errorMessageBox))
      .toHaveText(expectedMessage)
  }
}
