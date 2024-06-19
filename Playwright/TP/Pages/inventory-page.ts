import { expect, type Locator, type Page } from "@playwright/test";
import { fail } from "assert";

export class InventoryPage {
  readonly page: Page; // Propriété en lecture seule pour la page
  readonly inventoryUrl: string; // URL de la page d'inventaire
  readonly cartButton: Locator; // Localisateur pour le bouton du panier
  readonly burgerButton: Locator; // Localisateur pour le bouton du menu burger
  readonly logOutButton: Locator; // Localisateur pour le bouton de déconnexion
  readonly selectElement: Locator; // Localisateur pour l'élément de tri
  readonly productItems: Locator; // Localisateur pour les éléments de produits
  readonly productPrice: Locator; // Localisateur pour les prix des produits

  // Constructeur de la classe
  constructor(page: Page) {
    this.page = page; // Initialisation de la propriété page
    this.inventoryUrl = "https://www.saucedemo.com/inventory.html"; // Initialisation de l'URL de la page d'inventaire
    // Initialisation des localisateurs
    this.cartButton = page.locator(".shopping-cart-link"); 
    this.burgerButton = page.getByRole("button", { name: "Open Menu" });
    this.logOutButton = page.locator('[data-test="logout-sidebar-link"]');
    this.selectElement = page.locator('[data-test="product-sort-container"]');
    this.productItems = page.locator('[data-test="inventory-item"]');
    this.productPrice = page.locator(".inventory_item_price");
  }

  // Méthode pour vérifier l'URL
  async checkUrl(url_to_check: string) {
    expect(url_to_check).toMatch(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    );
    await expect(this.page).toHaveURL(RegExp(url_to_check));
  }

  // Méthode pour se déconnecter
  async disconnectAsUser() {
    await expect(this.burgerButton).toBeAttached(); 
    await expect(this.burgerButton).toBeVisible(); 
    await this.burgerButton.click(); // Cliquer sur le bouton du menu burger

    await expect(this.logOutButton).toBeVisible(); 
    await expect(this.logOutButton).toBeEnabled(); 
    await this.logOutButton.click(); // Cliquer sur le bouton de déconnexion
    await expect(this.page).not.toHaveURL(this.inventoryUrl); // Vérifier que l'URL actuelle n'est pas celle de la page d'inventaire
  }

  // Méthode pour sélectionner un critère de tri
  async selectSortChoice(sort_by: string) {
    const accepted_values = ["az", "za", "hilo", "lohi"]; // Valeurs de tri acceptées
    if (!accepted_values.includes(sort_by)) {
      fail(
        `The provided value : ${sort_by} is not a valid option. Please choose between the following ${accepted_values}`
      ); // Lever une erreur si la valeur de tri n'est pas valide
    }
    await this.selectElement.selectOption(sort_by); // Sélectionner l'option de tri
    await expect(this.selectElement).toHaveValue(sort_by); // Vérifier que l'option de tri sélectionnée est correcte
  }

  // Méthode pour vérifier le tri des produits
  async checkSort(sort_by: string) {
    const accepted_values = ["az", "za", "hilo", "lohi"]; // Valeurs de tri acceptées
    if (!accepted_values.includes(sort_by)) {
      fail(
        `The provided value : ${sort_by} is not a valid option. Please choose between the following ${accepted_values}`
      ); // Lever une erreur si la valeur de tri n'est pas valide
    }
    const converted_prices = new Array<number>(); // Tableau pour stocker les prix convertis

    (await this.productPrice.all()).forEach(async (element) => {
      let text = await element.textContent();
      if (text !== null) {
        text.replace("$", ""); // Supprimer le symbole "$" du prix
        let converted_el = parseFloat(text); // Convertir le prix en nombre
        converted_prices.push(converted_el); // Ajouter le prix converti au tableau
      }
    });
    if (sort_by == "hilo") {
      // Vérifier si les produits sont triés de façon décroissante
      for (let index = 0; index < converted_prices.length; index++) {
        let first = converted_prices[index];
        let second = converted_prices[index + 1];

        if (first <= second) {
          fail(`Element ${first} is not greater than ${second}.`); // Lever une erreur si les éléments ne sont pas triés correctement
        }
      }
    } else if (sort_by == "lohi") {
      // Vérifier si les produits sont triés de façon croissante
      for (let index = 0; index < converted_prices.length; index++) {
        let first = converted_prices[index];
        let second = converted_prices[index + 1];

        if (first >= second) {
          fail(`Element ${first} is not smaller than ${second}.`); // Lever une erreur si les éléments ne sont pas triés correctement
        }
      }
    }
  }

  // Méthode pour ajouter un certain nombre d'éléments au panier
  async AddNumberOfElementsToCart(number_of_elem: number) {
    for (let index = 0; index < number_of_elem; index++) {
      await this.page.getByText("Add to cart").nth(index).click(); // Cliquer sur le bouton "Ajouter au panier" pour chaque élément
    }
  }

  // Méthode pour vérifier le nombre d'éléments dans le panier
  async checkCartProductNumber(locator: string, expected_number: number) {
    await expect(this.page.locator(locator)).toHaveText(
      expected_number.toString()
    ); // Vérifier que le nombre d'éléments dans le panier correspond au nombre attendu
  }

  // Méthode pour vérifier le nombre d'éléments correspondant à un localisateur
  async checkNumberofCartItem(locator: string, expected_number: number) {
    await expect(this.page.locator(locator)).toHaveCount(expected_number); // Vérifier que le nombre d'éléments correspondant au localisateur est égal au nombre attendu
  }

  // Méthode pour accéder à la page du panier
  async goToCartPage(locator: string) {
    expect(this.page.locator(locator)).toBeVisible();
    await this.page.locator(locator).click(); // Cliquer sur le bouton panier
  }

  // Méthode pour accéder à un produit spécifique
  async goToNthProduct(product_number: number) {
    const product = await this.productItems.nth(product_number - 1); // Sélectionner le produit correspondant au numéro fourni
    product.locator(".inventory_item_name").click(); // Cliquer sur le nom du produit
  }
}
