import data from "../fixtures/source_data.json";
import HomePage from "../../pages/homePage";
import InventoryPage from "../../pages/inventoryPage";
import CheckoutPage from "../../pages/checkoutPage";

context("Sauce demo App", () => {
  beforeEach(() => {
    cy.visit("/"); // Visiter l'URL de base
    const homePage = new HomePage();
    homePage.login(data.standard_user, data.password); // Se connecter avec un utilisateur standard
  });

  // Regrouper les tests liés au processus de paiement
  describe("Test Checkout", () => {
    const inventoryPage = new InventoryPage(); 
    const checkoutPage = new CheckoutPage(); 

    // Test pour sélectionner les deux produits les plus chers
    it("Select the first two most expensive products", () => {
      inventoryPage.elements.selectElement().as("selectSortByPrice"); 
      cy.get("@selectSortByPrice").should("be.visible"); // Vérifier la visibilité de l'élément de tri
      inventoryPage.sort_by("hilo"); // Trier les produits du plus cher au moins cher
      inventoryPage.addNumberOfElementsToCart(2); // Ajouter les deux premiers produits au panier
      inventoryPage.checkDisplayedCartNumber(2); // Vérifier le nombre d'éléments dans le panier
      inventoryPage.returnProductTitleOfFirstNElements(2); // Récupérer les titres des deux premiers produits
      inventoryPage.elements.cartButton().click(); // Cliquer sur le bouton du panier
      checkoutPage.checkCartUrl(); // Vérifier l'URL de la page de paiement
      checkoutPage.returnCartProductTitleOfFirstNElements(2); // Récupérer les titres des produits dans le panier

      // Comparer les titres des produits de l'inventaire et du panier
      cy.get("@productListTitles").then((prodTitle) => {
        cy.get("@cartProductTitles").then((cartTitle) => {
          expect(prodTitle).to.deep.equal(cartTitle);
        });
      });
    });

    // Test pour trier les produits par prix (du plus cher au moins cher, puis du moins cher au plus cher)
    it("Sort product by price (high to low -> low to high)", () => {
      inventoryPage.elements.selectElement().as("selectSortByPrice"); 
      cy.get("@selectSortByPrice").should("be.visible"); // Vérifier la visibilité de l'élément de tri
      inventoryPage.sort_by("hilo"); // Trier les produits du plus cher au moins cher
      cy.get("@selectSortByPrice").should("have.value", "hilo"); // Vérifier la valeur de l'élément de tri
      inventoryPage.checkSorted("hilo"); // Vérifier que les produits sont triés du plus cher au moins cher
      inventoryPage.sort_by("lohi"); // Trier les produits du moins cher au plus cher
      cy.get("@selectSortByPrice").should("have.value", "lohi"); // Vérifier la valeur de l'élément de tri
      inventoryPage.checkSorted("lohi"); // Vérifier que les produits sont triés du moins cher au plus cher
    });
  });

  // Regrouper les tests liés à la cohérence des produits
  describe("Check product consistency", () => {
    // Test pour vérifier le deuxième produit de la liste
    it("Check the second product of the list", () => {
      cy.get('[data-test="inventory-item"]').as("inventoryItems");

      cy.get("@inventoryItems")
        .eq(1) // Sélectionner le deuxième élément de l'inventaire
        .within(() => {
          cy.get('[data-test="inventory-item-name"]')
            .invoke("text")
            .then((text) => {
              cy.wrap(text).as("inventory-title"); // Stocker le titre du produit dans un alias
            });

          cy.get('[data-test="inventory-item-name"]').click(); // Cliquer sur le titre du produit
        });

      // Vérifier que le titre du produit est le même sur la page de détails
      cy.get("@inventory-title").then((i_title) => {
        cy.get('[data-test="inventory-item-name"]')
          .invoke("text")
          .then((element) => {
            expect(element).to.equal(i_title);
          });
      });

      cy.get('[data-test="add-to-cart"]').click(); // Ajouter le produit au panier
      cy.get('[data-test="shopping-cart-badge"]').should("contain", "1"); // Vérifier le nombre d'éléments dans le panier
      cy.get('[data-test="shopping-cart-link"]').click(); // Cliquer sur le bouton du panier
      cy.get('[data-test="inventory-item"]')
        .should("be.visible") // Vérifier que le produit est visible dans le panier
        .and("have.length", 1); // Vérifier qu'il n'y a qu'un seul produit dans le panier

      // Vérifier que le titre du produit est le même dans le panier
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
