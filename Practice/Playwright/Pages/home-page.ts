import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";
export class HomePage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly connectButton: Locator;
  readonly errorMessage: Locator;
  readonly homeUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.connectButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.homeUrl = "https://www.saucedemo.com/";
  }

  async goToLandingPage(url: string) {
    await this.page.goto(url);
    await expect(this.page).toHaveURL(url);
  }

  async connectAsUser(username: string, passsword: string) {
    await this.userNameInput.isVisible();
    await this.userNameInput.isEnabled();
    await this.userNameInput.fill(username);
    await expect(this.userNameInput).toHaveValue(username);

    await this.passwordInput.isVisible();
    await this.passwordInput.isEnabled();
    await this.passwordInput.fill(passsword);
    await expect(this.passwordInput).toHaveValue(passsword);

    await this.connectButton.isVisible();
    await this.connectButton.isEnabled();
    await this.connectButton.click();
  }

  async checkErrorPresence(expected_message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expected_message);
  }
}
