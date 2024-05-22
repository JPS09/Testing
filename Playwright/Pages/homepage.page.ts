import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
export class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goToLandingPage(url: string) {
    await this.page.goto(url);
    await expect(this.page).toHaveURL(url);
  }

  async closeCookiesBanner() {
    await expect(
      this.page.getByRole("button", { name: "Refuser" })
    ).toBeVisible();
    await this.page.getByRole("button", { name: "Refuser" }).click();
  }

  async checkIfConnectButtonPresent(connectButtonLocator: string) {
    const connectButton = connectButtonLocator;
    await expect(this.page.locator(connectButton)).toBeVisible();
    await expect(this.page.locator(connectButton)).toBeEnabled();
    await expect(this.page.locator(connectButton)).toHaveAttribute(
      "data-nav-role",
      "signin"
    );
  }

  async clickOnConnectButton(locator: string) {
    const testIfPresent = await this.page.locator(locator).isVisible();
    if (testIfPresent) {
    }
    const connectButton = this.page.locator(locator).first();
    await connectButton.isVisible();
    await connectButton.isEnabled();
    await connectButton.click();
  }

  async checkAvailableCategoriesInSelectElement(locator: string) {
    const optionsElements = this.page.locator(locator);
    await expect(optionsElements).toHaveCount(49);
  }

  async checksearchBarPresent(aria_label: string) {
    const searchBar = this.page.getByLabel(aria_label);
    await expect(searchBar).toBeVisible();
    await expect(searchBar).toBeEnabled();
  }

  async enterDataInSearchBar(
    ariaLabel: string,
    data: string,
    clickOnSearchButton?: boolean,
    clickButtonLocator?: string
  ) {
    await this.checksearchBarPresent(ariaLabel);
    const searchBar = this.page.getByLabel("Rechercher Amazon.fr");
    await searchBar.click();
    await searchBar.fill(data);
    await expect(searchBar).toHaveValue(data);
    const searchElements = clickButtonLocator && clickOnSearchButton;
    if (searchElements) {
      const searchButton2 = this.page.getByLabel("Go");
      await expect(searchButton2).toBeVisible();
      await searchButton2.click();
    } else {
      await searchBar.focus();
      await searchBar.press("Enter");
    }
  }
}
