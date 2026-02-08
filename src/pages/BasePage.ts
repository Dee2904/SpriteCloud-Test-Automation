import { Page, expect } from '@playwright/test'

export abstract class BasePage {
  protected readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

 async assertPage(expected: { title: string; url: RegExp }) {
  // 1️⃣ Wait for navigation
  await expect(this.page).toHaveURL(expected.url);

  // 2️⃣ Wait for app shell (stable element)
  // await expect(
  //   this.page.locator('[data-test="primary-header"]')
  // ).toBeVisible();

  // 3️⃣ Assert title text
  await expect(
    this.page.locator('[data-test="title"]')
  ).toHaveText(expected.title);
}
}
