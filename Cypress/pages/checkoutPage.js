class CheckoutPage {
  // Définition des éléments de la page de paiement
  elements = {
    cartProducts: () => cy.get('[data-test="inventory-item-name"]'), // Éléments des produits dans le panier
  };

  // Méthode pour vérifier l'URL du panier
  checkCartUrl() {
    cy.location().should((location) => {
      expect(location.href).to.eq("https://www.saucedemo.com/cart.html"); 
      expect(location.origin).to.eq("https://www.saucedemo.com");
    });
  }

  // Méthode pour récupérer les titres des premiers N éléments du panier
  returnCartProductTitleOfFirstNElements(numberOfTitles) {
    this.elements
      .cartProducts()
      .filter((index) => index < numberOfTitles) // Filtrer les éléments pour récupérer les N premiers
      .then(($el) => {
        cy.wrap(Cypress._.map($el, "innerText")).as("cartProductTitles"); // Récupérer les titres des éléments filtrés et les stocker dans un alias
      });
  }
}

export default CheckoutPage;
