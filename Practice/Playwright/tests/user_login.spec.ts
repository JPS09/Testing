import { test } from "@playwright/test";
import { HomePage } from "../Pages/home-page";
import { InventoryPage } from "../Pages/inventory-page";


test("Connect as Standard user", async ({ page }) => {
  const homePage = new HomePage(page);
  const inventoryPage = new InventoryPage(page);

  await homePage.goToLandingPage('https://www.saucedemo.com/')
  await homePage.connectAsUser("standard_user","secret_sauce")
  await inventoryPage.checkUrl(inventoryPage.inventoryUrl)
  await inventoryPage.disconnectAsUser()
});

test("Attempt connection as locked_out_user", async({page})=>{
    const homePage = new HomePage(page);

    await homePage.goToLandingPage('https://www.saucedemo.com/')
    await homePage.connectAsUser("locked_out_user","secret_sauce")
    await homePage.checkErrorPresence("Epic sadface: Sorry, this user has been locked out.")
})
