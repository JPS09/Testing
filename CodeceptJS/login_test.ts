import assert from "assert";


require("dotenv").config({ path: ".env" });
Feature("login");

Scenario("Header presence", async ({ I }) => {
  I.amOnPage("/");
  const title = "Start your journey today";
  I.seeTextEquals(title.toLocaleUpperCase(), ".banner.header-banner");
});

Scenario("I can login", async ({ I, homePage, loginPage }) => {
  const baseUrl = process.env.base_url;
  const login_url = process.env.login_url;

  I.amOnPage("/");
  await homePage.handleCookie();
  I.click(homePage.buttons.signup_button);
  I.waitInUrl(login_url);
  await loginPage.enterDataAndLog()
  I.waitForURL(baseUrl, "load");
});
