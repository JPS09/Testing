import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";
export class CheckOutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly checkoutButton: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;

  readonly cartUrl: string;
  readonly stepOneUrl: string;
  readonly stepTwoUrl: string;
  readonly finalStepUrl: string;
  readonly finalMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cartUrl = "https://www.saucedemo.com/cart.html";
    this.stepOneUrl = "https://www.saucedemo.com/checkout-step-one.html";
    this.stepTwoUrl = "https://www.saucedemo.com/checkout-step-two.html";
    this.finalStepUrl = "https://www.saucedemo.com/checkout-complete.html";
    this.finalMessage = page.locator('[data-test="complete-header"]');
  }

  async fillUserInfo(firstName: string, lastName: string, zipcode: string) {
    await expect(this.page).toHaveURL(this.stepOneUrl);
    await this.firstNameInput.isVisible();
    await this.firstNameInput.isEnabled();
    await this.firstNameInput.fill(firstName);
    await expect(this.firstNameInput).toHaveValue(firstName);

    await this.lastNameInput.isVisible();
    await this.lastNameInput.isEnabled();
    await this.lastNameInput.fill(lastName);
    await expect(this.lastNameInput).toHaveValue(lastName);

    await this.postalCodeInput.isVisible();
    await this.postalCodeInput.isEnabled();
    await this.postalCodeInput.fill(zipcode);
    await expect(this.postalCodeInput).toHaveValue(zipcode);

    await this.continueButton.isVisible();
    await this.continueButton.isEnabled();
    await this.continueButton.click();
  }
  async goToFirstStep() {
    await expect(this.page).toHaveURL(this.cartUrl);
    await expect(this.checkoutButton).toBeAttached();
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
  }

  async goTofinalStep() {
    await expect(this.page).toHaveURL(this.stepTwoUrl);
    await expect(this.finishButton).toBeAttached();
    await expect(this.finishButton).toBeVisible();
    await this.finishButton.click();
  }
}
