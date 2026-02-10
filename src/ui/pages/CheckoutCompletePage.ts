import { BasePage } from './BasePage'
import { expect } from '@playwright/test'

export class CheckoutCompletePage extends BasePage {
  private completeHeader = '[data-test="complete-header"]'
  private completeText = '[data-test="complete-text"]'
  private backToHomeButton = '[data-test="back-to-products"]'

  async assertCheckoutComplete() {
    await expect(
      this.page.locator(this.completeHeader)
    ).toHaveText('Thank you for your order!')

    await expect(
      this.page.locator(this.completeText)
    ).toContainText('Your order has been dispatched')
  }

  async clickBackToHome() {
    await this.page.click(this.backToHomeButton)
  }
}