import data from "../fixtures/source_data.json";
import HomePage from "../../pages/homePage";
import InventoryPage from "../../pages/inventoryPage";

context("Sauce demo App", () => {
  beforeEach(() => {
    cy.visit("/");
    const homePage = new HomePage();
    homePage.login(data.standard_user, data.password);
  });

  describe("Test Checkout", () => {
    const inventoryPage = new InventoryPage();
    it("Select the first two most expensive products", () => {
      // Not Finished
      const selectElement = inventoryPage.elements.selectElement();
      selectElement.should("be.visible");
      inventoryPage.sort_by("hilo");
    });
    it("Sort product by price (high to low -> low to high)", () => {
      const selectElement = inventoryPage.elements.selectElement();
      selectElement.should("be.visible");
      inventoryPage.sort_by("hilo");
      inventoryPage.elements.selectElement().should("have.value", "hilo");
      inventoryPage.checkSorted("hilo");
      inventoryPage.sort_by("lohi");
      inventoryPage.elements.selectElement().should("have.value", "lohi");
      inventoryPage.checkSorted("lohi");
    });
  });

  describe("Check product consistency", () => {
    it.only("Check the second product of the list", () => {
      cy.get('[data-test="inventory-item"]').as("inventoryItems");

      cy.get("@inventoryItems")
        .eq(1)
        .within(() => {
          cy.get('[data-test="inventory-item-name"]')
            .invoke("text")
            .then((text) => {
              cy.wrap(text).as("inventory-title");
            });

          cy.get('[data-test="inventory-item-name"]').click();
        });

      cy.get("@inventory-title").then((i_title) => {
        cy.get('[data-test="inventory-item-name"]')
          .invoke("text")
          .then((element) => {
            expect(element).to.equal(i_title);
          });
      });

      cy.get('[data-test="add-to-cart"]').click();
      cy.get('[data-test="shopping-cart-badge"]').should("contain", "1");
      cy.get('[data-test="shopping-cart-link"]').click();
      cy.get('[data-test="inventory-item"]')
        .should("be.visible")
        .and("have.length", 1);

      cy.get("@inventory-title").then((i_title) => {
        cy.get('[data-test="inventory-item-name"]')
          .invoke("text")
          .then((element) => {
            expect(element).to.equal(i_title);
          });
      });
    });
  });
});
