import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
export class ProductDetailPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goToAProduct(url_to_the_product: string) {
    expect(url_to_the_product).toMatch(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    );
    await this.page.goto(url_to_the_product);
  }

  async checkProductTitle(textToTest: string) {
    const element = this.page
      .getByRole("heading", { name: textToTest })
      .locator("#productTitle");
    await expect(element).toContainText(textToTest);
  }

  async addProductToCart() {
    const addToCartButton = this.page.locator("#add-to-cart-button");
    const insuranceButton = this.page.getByRole("button", {
      name: "Non, merci.",
    });
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeEnabled();
    await addToCartButton.click();
    if ((await insuranceButton.count()) == 1) {
      await expect(insuranceButton).toBeVisible()
      await expect(insuranceButton).toBeEnabled()
      await insuranceButton.click();
    }
  }
  async goToCart() {
    const cartButton = this.page.locator('#sw-gtc').getByRole('link', { name: 'Aller au panier' })
    await expect(cartButton).toBeVisible();
    await expect(cartButton).toBeEnabled();
    await cartButton.click()
  }
}
