import { test, expect } from '@playwright/test'
import { LoginPage } from '../../src/pages/LoginPage'
import { InventoryPage } from '../../src/pages/InventoryPage'
import { CartPage } from '../../src/pages/CartPage'
import { users } from '../../src/data/users'
import { inventory } from '../../src/data/inventory'
import { CheckoutInformationPage } from '../../src/pages/CheckoutInformationPage'
import { CheckoutOverviewPage } from '../../src/pages/CheckoutOverviewPage'
import { PAGES } from '../../src/data/pages'

test('User can checkout with two items and correct prices', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const inventoryPage = new InventoryPage(page)
  const cartPage = new CartPage(page)
  const checkoutInfoPage = new CheckoutInformationPage(page)
  const checkoutOverviewPage = new CheckoutOverviewPage(page)

  const selectedItems = [
    inventory.backpack,
    inventory.fleeceJacket,
  ]

  await test.step('User logs in', async () => {
    await loginPage.navigateToLoginPage()
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    )
  })

  await test.step('User adds two items from inventory', async () => {
  await inventoryPage.assertPage(PAGES.INVENTORY)

  for (const item of selectedItems) {
    await inventoryPage.addItemToCart(item.id)
  }
})

  await test.step('User navigates to cart', async () => {
  await page.locator('[data-test="shopping-cart-link"]').click(); //PUT this in the base page
  await cartPage.assertPage(PAGES.CART)
});



  await test.step('Cart shows correct items and prices', async () => {
    const names = await cartPage.getCartItemNames()
    const prices = await cartPage.getCartItemPrices()

    expect(names).toEqual(
      expect.arrayContaining(selectedItems.map(item => item.name))
    )

     expect(prices).toEqual(
    expect.arrayContaining(selectedItems.map(i => i.price))
    )
  })
  await test.step('User proceeds to checkout information page', async () => {
  await cartPage.proceedToCheckout()
  await checkoutInfoPage.assertPage(PAGES.CHECKOUT_INFO)
})

await test.step('User enters checkout personal information', async () => {
  await checkoutInfoPage.fillCustomerInformation(
    'Deeksha',
    'Srivastava',
    '12345'
  )
  await checkoutInfoPage.continueToOverview()
})

await test.step('User reviews order summary', async () => {
  await checkoutOverviewPage.assertPage(PAGES.CHECKOUT_OVERVIEW)
  await checkoutOverviewPage.assertItemCount(selectedItems.length)
  await checkoutOverviewPage.assertSubtotalMatchesItems()
  await checkoutOverviewPage.assertTotalIsCorrect()
})

})
