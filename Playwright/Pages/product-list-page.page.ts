import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
export class ProductListPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async checkResultsTitle(search_term: string) {
    const title = this.page.locator(
      `css=.a-spacing-top-small:has-text('résultats pour "${search_term}"')`
    );
    await expect(title).toBeVisible();
    await expect(title).toContainText(search_term);
  }

  async checkPresenceofProduct(search_term: RegExp) {
    // const product = this.page.locator(
    //   "//div[contains(@data-cy,'title-recipe')]"
    // );
    const product = this.page.getByRole("heading", {
      name: "Sony WH1000XM4| Casque Bluetooth à réduction de bruit sans fil, 30 heures d'autonomie, avec micro pour appels téléphoniques, optimisé pour Amazon Alexa et Google assistant, Noir",
      exact: true,
    });
    await expect(product).toContainText(search_term);
  }

  async clickOnFirstElement(search_term: string) {
    // const element = this.page.getByText(/Sony WH1000XM4/).first();
    const product = this.page
      .getByRole("link", {
        name: search_term,
      })
      .first();
    //await expect(product).toContainText(search_term, { ignoreCase: true });
    await product.click();
  }
}
