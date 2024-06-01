class InventoryPage {
  elements = {
    burgerMenu: () => cy.get("#react-burger-menu-btn"),
    logOutButton: () => cy.get('[data-test="logout-sidebar-link"]'),
    selectElement: () => cy.get('[data-test="product-sort-container"]'),
    elementPrices: () => cy.get('[data-test="inventory-item-price"]'),
  };

  addToCart(locator) {
    cy.get(locator);
  }

  sort_by(sort_choice) {
    const accepted_values = ["az", "za", "hilo", "lohi"];
    if (!accepted_values.includes(sort_choice)) {
      throw new Error(
        `The provided value : ${sort_choice} is not a valid option. Please choose between the following ${accepted_values}`
      );
    }
    this.elements.selectElement().select(sort_choice);
  }

  checkSorted(sort_choice) {
    const accepted_values = ["az", "za", "hilo", "lohi"];
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
}
export default InventoryPage;
