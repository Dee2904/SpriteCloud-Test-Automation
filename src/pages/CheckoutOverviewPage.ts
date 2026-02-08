import { BasePage } from './BasePage'
import { expect } from '@playwright/test'

export class CheckoutOverviewPage extends BasePage {
    
  async getItemPrices(): Promise<number[]> {
    const pricesText = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();

    return pricesText.map(p => parseFloat(p.replace('$', '')));
  }

  async assertItemCount(expectedCount: number) {
    await expect(
      this.page.locator('[data-test="inventory-item"]')
    ).toHaveCount(expectedCount);
  }

  async assertSubtotalMatchesItems() {
    const prices = await this.getItemPrices();
    const expectedSubtotal = prices.reduce((a, b) => a + b, 0);

    await expect(
      this.page.locator('[data-test="subtotal-label"]')
    ).toHaveText(`Item total: $${expectedSubtotal.toFixed(2)}`);
  }

  async assertTotalIsCorrect() {
    const prices = await this.getItemPrices();
    const subtotal = prices.reduce((a, b) => a + b, 0);

    const taxText = await this.page
      .locator('[data-test="tax-label"]')
      .textContent();

    const tax = parseFloat(taxText!.replace('Tax: $', ''));
    const expectedTotal = subtotal + tax;

    await expect(
      this.page.locator('[data-test="total-label"]')
    ).toHaveText(`Total: $${expectedTotal.toFixed(2)}`);
  }
}
