import { Page, expect } from '@playwright/test'

export abstract class BasePage {
  protected readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

 async assertPage(expected: { title: string; url: RegExp }) {

  await expect(this.page).toHaveURL(expected.url);
  await expect(
    this.page.locator('[data-test="title"]')
  ).toHaveText(expected.title);
}
}
