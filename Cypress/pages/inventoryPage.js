class InventoryPage {
  // Définition des éléments de la page
  elements = {
    burgerMenu: () => cy.get("#react-burger-menu-btn"), // Bouton du menu burger
    logOutButton: () => cy.get("#logout_sidebar_link"), // Bouton de déconnexion
    selectElement: () => cy.get('[data-test="product-sort-container"]'), // Élément de tri des produits
    elementPrices: () => cy.get('[data-test="inventory-item-price"]'), // Prix des éléments de l'inventaire
    addToCartButton: () => cy.get('[data-test^="add-to-cart-sauce-labs"]'), // Bouton "Ajouter au panier"
    displayedCartNumber: () => cy.get('[data-test="shopping-cart-badge"]'), // Nombre d'éléments affichés dans le panier
    productTitles: () => cy.get('[data-test="inventory-item-name"]'), // Titres des produits
    cartButton: () => cy.get('[data-test="shopping-cart-link"]'), // Bouton du panier
  };

  // Méthode pour ajouter un élément au panier
  addToCart(locator) {
    cy.get(locator);
  }

  // Méthode pour trier les produits
  sort_by(sort_choice) {
    const accepted_values = ["az", "za", "hilo", "lohi"]; // Valeurs de tri acceptées
    if (!accepted_values.includes(sort_choice)) {
      throw new Error(
        `The provided value : ${sort_choice} is not a valid option. Please choose between the following ${accepted_values}`
      );
    }
    this.elements.selectElement().select(sort_choice); // Sélectionner l'option de tri
  }

  // Méthode pour vérifier si les produits sont triés correctement
  checkSorted(sort_choice) {
    const accepted_values = ["az", "za", "hilo", "lohi"]; // Valeurs de tri acceptées
    if (!accepted_values.includes(sort_choice)) {
      throw new Error(
        `The provided value : ${sort_choice} is not a valid option. Please choose between the following ${accepted_values}`
      );
    }
    this.elements.elementPrices().each((element) => {
      let text = element.text();
      if (text !== null) {
        text.replace("$", "");
        let converted_el = parseFloat(text);
        converted_prices.push(converted_el);
      }
    });

    const converted_prices = new Array();
    if (sort_choice == "hilo") {
      for (let index = 0; index < converted_prices.length; index++) {
        let first = converted_prices[index];
        let second = converted_prices[index + 1];

        if (first <= second) {
          throw new Error(`Element ${first} is not greater than ${second}.`);
        }
      }
    } else if (sort_choice == "lohi") {
      for (let index = 0; index < converted_prices.length; index++) {
        let first = converted_prices[index];
        let second = converted_prices[index + 1];

        if (first >= second) {
          throw new Error(`Element ${first} is not smaller than ${second}.`);
        }
      }
    }
  }

  // Méthode pour ajouter un certain nombre d'éléments au panier
  addNumberOfElementsToCart(number_of_elem) {
    for (let index = 0; index < number_of_elem - 1; index++) {
      this.elements
        .addToCartButton()
        .filter((index) => index < number_of_elem)
        .then((el) => {
          el.trigger("click");
        });
    }
  }

  // Méthode pour vérifier le nombre d'éléments affichés dans le panier
  checkDisplayedCartNumber(expected_number) {
    this.elements
      .displayedCartNumber()
      .invoke("text")
      .then((currentNumber) => {
        expect(parseInt(currentNumber)).to.equal(parseInt(expected_number));
      });
  }

  // Méthode pour récupérer les titres des premiers N éléments
  returnProductTitleOfFirstNElements(numberOfTitles) {
    this.elements
      .productTitles()
      .filter((index) => index < numberOfTitles)
      .then(($el) => {
        cy.wrap(Cypress._.map($el, "innerText")).as("productListTitles");
      });
  }
}
