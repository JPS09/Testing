import { expect, type Locator, type Page } from "@playwright/test";
import { fail } from "assert";
export class InventoryPage {
  readonly page: Page;
  readonly inventoryUrl: string;
  readonly cartButton: Locator;
  readonly burgerButton: Locator;
  readonly logOutButton: Locator;
  readonly selectElement: Locator;
  readonly productItems: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryUrl = "https://www.saucedemo.com/inventory.html";
    this.cartButton = page.locator(".shopping-cart-link");
    this.burgerButton = page.getByRole("button", { name: "Open Menu" });
    this.logOutButton = page.locator('[data-test="logout-sidebar-link"]');
    this.selectElement = page.locator('[data-test="product-sort-container"]');
    this.productItems = page.locator('[data-test="inventory-item"]');
    this.productPrice = page.locator(".inventory_item_price");
  }

  async checkUrl(url_to_check: string) {
    expect(url_to_check).toMatch(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    );
    await expect(this.page).toHaveURL(RegExp(url_to_check));
  }

  async disconnectAsUser() {
    await expect(this.burgerButton).toBeAttached();
    await expect(this.burgerButton).toBeVisible();
    await this.burgerButton.click();

    await expect(this.logOutButton).toBeVisible();
    await expect(this.logOutButton).toBeEnabled();
    await this.logOutButton.click();
    await expect(this.page).not.toHaveURL(this.inventoryUrl);
  }

  async selectSortChoice(sort_by: string) {
    const accepted_values = ["az", "za", "hilo", "lohi"];
    if (!accepted_values.includes(sort_by)) {
      fail(
        `The provided value : ${sort_by} is not a valid option. Please choose between the following ${accepted_values}`
      );
    }
    await this.selectElement.selectOption(sort_by);
    await expect(this.selectElement).toHaveValue(sort_by);
  }

  async checkSort(sort_by: string) {
    const accepted_values = ["az", "za", "hilo", "lohi"];
    if (!accepted_values.includes(sort_by)) {
      fail(
        `The provided value : ${sort_by} is not a valid option. Please choose between the following ${accepted_values}`
      );
    }
    const converted_prices = new Array<number>();

    (await this.productPrice.all()).forEach(async (element) => {
      let text = await element.textContent();
      if (text !== null) {
        text.replace("$", "");
        let converted_el = parseFloat(text);
        converted_prices.push(converted_el);
      }
    });

    if (sort_by == "hilo") {
      for (let index = 0; index < converted_prices.length; index++) {
        let first = converted_prices[index];
        let second = converted_prices[index + 1];

        if (first <= second) {
          fail(`Element ${first} is not greater than ${second}.`);
        }
      }
    } else if (sort_by == "lohi") {
      for (let index = 0; index < converted_prices.length; index++) {
        let first = converted_prices[index];
        let second = converted_prices[index + 1];

        if (first >= second) {
          fail(`Element ${first} is not smaller than ${second}.`);
        }
      }
    }
  }

  async AddNumberOfElementsToCart(number_of_elem: number) {
    for (let index = 0; index < number_of_elem; index++) {
      await this.page.getByText("Add to cart").nth(index).click();
    }
  }

  async checkCartProductNumber(locator: string, expected_number: number) {
    await expect(this.page.locator(locator)).toHaveText(
      expected_number.toString()
    );
  }

  async checkNumberofCartItem(locator: string, expected_number: number) {
    await expect(this.page.locator(locator)).toHaveCount(expected_number);
  }

  async goToCartPage(locator: string) {
    expect(this.page.locator(locator)).toBeVisible();
    await this.page.locator(locator).click();
  }

  async goToNthProduct(product_number: number) {
    const product = await this.productItems.nth(product_number - 1);
    product.locator(".inventory_item_name").click();
  }
}
