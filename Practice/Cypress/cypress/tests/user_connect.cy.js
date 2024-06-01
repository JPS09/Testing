import data from "../fixtures/source_data.json";
import HomePage from "../../pages/homePage";
import InventoryPage from "../../pages/inventoryPage";
context("Sauce Demo App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("User Test Suite", () => {
    const homePage = new HomePage();
    const inventoryPage = new InventoryPage();
    it("A standard user should be able to connect", () => {
      cy.url().should("contain", "https://www.saucedemo.com");
      const usernameInput = homePage.elements.userNameInput();
      const passwordInput = homePage.elements.passwordInput();
      const loginButton = homePage.elements.loginButton();
      const burgerMenu = inventoryPage.elements.burgerMenu();
      const logOutButton = inventoryPage.elements.logOutButton();

      usernameInput.should("be.visible").and("be.enabled").and("be.empty");
      passwordInput.should("be.visible").and("be.enabled").and("be.empty");
      loginButton.should("be.visible").and("be.enabled");

      homePage.enterUserName(data.standard_user);
      homePage.enterPassword(data.password);

      usernameInput.should("contain.value", data.standard_user);
      passwordInput.should("contain.value", data.password);
      loginButton.click();

      cy.url().should("contain", "https://www.saucedemo.com/inventory.html");

      burgerMenu.should("be.visible").and("be.enabled");
      burgerMenu.click();
      logOutButton.should("be.visible");
      logOutButton.click();

      cy.url()
        .should("not.contain", "https://www.saucedemo.com/inventory.html")
        .and("contain", "https://www.saucedemo.com");
      loginButton.should("be.visible").and("be.enabled");
    });

    it("A locked out user should not be able to connect", () => {
      cy.url().should("contain", "https://www.saucedemo.com");
      homePage.login(data.locked_out_user, data.password);
      homePage.elements
        .userNameInput()
        .should("contain.value", data.locked_out_user);
      homePage.elements.passwordInput().should("contain.value", data.password);
      homePage.elements.loginButton().click();
      homePage.elements
        .errorMessage()
        .should("be.visible")
        .and(
          "contain.text",
          "Epic sadface: Sorry, this user has been locked out."
        );
    });
  });
});
