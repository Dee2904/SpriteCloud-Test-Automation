import { BasePage } from './BasePage'

export class InventoryPage extends BasePage {

  private cartBadge = '[data-test="shopping-cart-badge"]'
  private cartLink = '[data-test="shopping-cart-link"]'
  private sortDropdown = '[data-test="product-sort-container"]'
  private itemNames = '[data-test="inventory-item-name"]'
   private addToCartButton = (itemId: string) =>
    `[data-test="add-to-cart-${itemId}"]`

 async addItemToCart(itemId: string) {
    await this.page.click(this.addToCartButton(itemId))
  }

  async getCartItemCount(): Promise<number> {
    const text = await this.page.locator(this.cartBadge).textContent()
    return Number(text?.trim() || 0)
  }

  async goToCart() {
    await this.page.click(this.cartLink)
  }

   async sortBy(optionValue: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.selectOption(this.sortDropdown, optionValue)
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator(this.itemNames).allTextContents()
  }
}
