import { BasePage } from './BasePage'
import { expect } from '@playwright/test'

export class CheckoutOverviewPage extends BasePage {

  private itemPriceLocator = '[data-test="inventory-item-price"]'
  private subtotalLocator = '[data-test="subtotal-label"]'
  private taxLocator = '[data-test="tax-label"]'
  private totalLocator = '[data-test="total-label"]'
  private finishButtonLocator = '[data-test="finish"]'
  
    
  async getItemPrices(): Promise<number[]> {
    const pricesText = await this.page
      .locator(this.itemPriceLocator)
      .allTextContents()

    return pricesText.map(p => parseFloat(p.replace('$', '')))
  }

  async assertItemCount(expectedCount: number) {
    await expect(
      this.page.locator('[data-test="inventory-item"]')
    ).toHaveCount(expectedCount)
  }

  async assertSubtotalMatchesItems() {
    const prices = await this.getItemPrices()
    const expectedSubtotal = prices.reduce((a, b) => a + b, 0)

    await expect(
      this.page.locator(this.subtotalLocator)
    ).toHaveText(`Item total: $${expectedSubtotal.toFixed(2)}`)
  }

  //Assuming tax is always calculated as a fixed percentage of the subtotal
  async assertTotalIsCorrect() {
    const prices = await this.getItemPrices()
    const subtotal = prices.reduce((a, b) => a + b, 0)

    const taxText = await this.page
      .locator(this.taxLocator)
      .textContent()

    const tax = parseFloat(taxText!.replace('Tax: $', ''))
    const expectedTotal = subtotal + tax

    await expect(
      this.page.locator(this.totalLocator)
    ).toHaveText(`Total: $${expectedTotal.toFixed(2)}`)
  }

  async continueToFinishPage() {
    await this.page.click(this.finishButtonLocator)
  }
}
