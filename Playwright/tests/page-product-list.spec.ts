import { test, expect } from "@playwright/test";
import { ProductListPage } from "../Pages/product-list-page.page";
import { HomePage } from "../Pages/homepage.page";

test("check if able to search with enter", async ({ page }) => {
  const homePage = new HomePage(page);
  const productListPage = new ProductListPage(page);
  await homePage.goToLandingPage("https://www.amazon.fr/");
  await homePage.closeCookiesBanner();
  await homePage.checksearchBarPresent("Rechercher Amazon.fr");
  await homePage.enterDataInSearchBar(
    "Rechercher Amazon.fr",
    "Sony WH1000XM4",
    true,
    "Go"
  );
  await productListPage.checkResultsTitle("Sony WH1000XM4");
  await page.close();
});

test("Search and add a product to cart", async ({ page }) => {
  const homePage = new HomePage(page);
  const productListPage = new ProductListPage(page);
  await homePage.goToLandingPage("https://www.amazon.fr/");
  await homePage.closeCookiesBanner();
  await homePage.checksearchBarPresent("Rechercher Amazon.fr");
  await homePage.enterDataInSearchBar(
    "Rechercher Amazon.fr",
    "Sony WH1000XM4",
    true,
    "Go"
  );
  await productListPage.checkResultsTitle("Sony WH1000XM4");
  await productListPage.checkPresenceofProduct(/sony wh-1000xm4/)
  await productListPage.clickOnFirstElement("Sony WH1000XM4");
  await page.close();
});
