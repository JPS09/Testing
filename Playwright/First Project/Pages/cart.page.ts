import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";
export class CartPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async checkIfProductInCart(productToCheck: string) {
    const link = this.page
      .getByRole("link", {
        name: productToCheck,
      })
      .first();
    await expect(link).toBeVisible();
  }
}
