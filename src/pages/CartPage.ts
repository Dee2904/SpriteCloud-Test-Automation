import { BasePage } from './BasePage'

export class CartPage extends BasePage {

  // private cartList = '[data-test="cart-list"]'
  private itemName = '[data-test="inventory-item-name"]'
  private itemPrice = '[data-test="inventory-item-price"]'
  private checkoutButton = '[data-test="checkout"]'


  async getCartItemNames(): Promise<string[]> {
    return this.page.locator(this.itemName).allTextContents()
  }

  async getCartItemPrices(): Promise<number[]> {
    const prices = await this.page.locator(this.itemPrice).allTextContents()
    return prices.map(price => Number(price.replace('$', '')))
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton)
  }
}
