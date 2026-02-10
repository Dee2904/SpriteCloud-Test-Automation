import { Page, expect } from '@playwright/test'

export abstract class BasePage {
  protected readonly page: Page

  // Adding this to basePage as this element is present on all pages
  private cartLink = '[data-test="shopping-cart-link"]'

  constructor(page: Page) {
    this.page = page
  }
  
   async goToCart() {
    await this.page.click(this.cartLink)
  }

 async assertPage(expected: { title: string; url: RegExp }) {

  await expect(this.page).toHaveURL(expected.url)
  await expect(
    this.page.locator('[data-test="title"]')
  ).toHaveText(expected.title)
}
}
