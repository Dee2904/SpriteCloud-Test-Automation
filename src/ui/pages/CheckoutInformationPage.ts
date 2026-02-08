import { BasePage } from './BasePage'

export class CheckoutInformationPage extends BasePage {

  private firstNameInput = '[data-test="firstName"]'
  private lastNameInput = '[data-test="lastName"]'
  private postalCodeInput = '[data-test="postalCode"]'
  private continueButton = '[data-test="continue"]'


  async fillCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.fill(this.firstNameInput, firstName)
    await this.page.fill(this.lastNameInput, lastName)
    await this.page.fill(this.postalCodeInput, postalCode)
  }

  async continueToOverview() {
    await this.page.click(this.continueButton)
  }
}
