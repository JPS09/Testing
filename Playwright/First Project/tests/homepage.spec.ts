import { test, expect } from "@playwright/test";
import { HomePage } from "../Pages/homepage.page";

test("Test if a user is able to click on the connect dropdown", async ({
  page,
}) => {
  const homepage = new HomePage(page);
  await homepage.goToLandingPage("https://www.amazon.fr/");
  await homepage.closeCookiesBanner()
  await homepage.checkIfConnectButtonPresent(
    '//a[contains(@id,"nav-link-accountList")]'
  );
  await homepage.clickOnConnectButton("//a[contains(@data-nav-role,'signin')]");
  await page.close();
});

test("Check if search elements are available", async ({ page }) => {
  const homepage = new HomePage(page);
  await homepage.goToLandingPage("https://www.amazon.fr/");
  await homepage.closeCookiesBanner()
  await homepage.checkAvailableCategoriesInSelectElement('//select[contains(@title,"Rechercher dans")]//option')
  await homepage.checksearchBarPresent("//input[contains(@aria-label,'Rechercher Amazon.fr')]")
  await page.close();
});

