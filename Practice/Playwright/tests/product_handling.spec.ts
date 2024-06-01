import { expect, test } from "@playwright/test";
import { HomePage } from "../Pages/home-page";
import { InventoryPage } from "../Pages/inventory-page";
import { CheckOutPage } from "../Pages/checkout-page";

test("Order the two most expensive products", async ({ page }) => {
  const homePage = new HomePage(page);
  const inventoryPage = new InventoryPage(page);
  const checkOutPage = new CheckOutPage(page);

  await homePage.goToLandingPage(homePage.homeUrl);
  await homePage.connectAsUser("standard_user", "secret_sauce");
  await inventoryPage.checkUrl(inventoryPage.inventoryUrl);
  await inventoryPage.selectSortChoice("hilo");
  await inventoryPage.AddNumberOfElementsToCart(2);
  await inventoryPage.checkCartProductNumber(
    '[data-test="shopping-cart-badge"]',
    2
  );
  await inventoryPage.goToCartPage('[data-test="shopping-cart-link"]');
  await inventoryPage.checkNumberofCartItem(".cart_item", 2);
  await checkOutPage.goToFirstStep()
  await checkOutPage.fillUserInfo(
    "John",
    "Neo",
    "0110100001100101011011000110110001101111"
  );
  await inventoryPage.checkNumberofCartItem(".cart_item", 2);
  await checkOutPage.goTofinalStep();
  expect(page).toHaveURL(checkOutPage.finalStepUrl);
  expect(checkOutPage.finalMessage).toHaveText("Thank you for your order!");
});

test("Sort product by prices", async ({ page }) => {
  const homePage = new HomePage(page);
  const inventoryPage = new InventoryPage(page);

  await homePage.goToLandingPage(homePage.homeUrl);
  await homePage.connectAsUser("standard_user", "secret_sauce");
  await inventoryPage.checkUrl(inventoryPage.inventoryUrl);
  await inventoryPage.selectSortChoice("hilo");
  await inventoryPage.checkSort("hilo");
  await inventoryPage.selectSortChoice("lohi");
  await inventoryPage.checkSort("lohi");
});

test("Check product details", async ({ page }) => {
  const homePage = new HomePage(page);
  const inventoryPage = new InventoryPage(page);
  await homePage.goToLandingPage(homePage.homeUrl);
  await homePage.connectAsUser("standard_user", "secret_sauce");
  await inventoryPage.goToNthProduct(2);
  await inventoryPage.checkUrl("https://www.saucedemo.com/inventory-item.html");
});
