import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";


export class CheckOutPage {
  readonly page: Page;
  readonly firstNameInput: Locator; // Localisateur pour le champ du prénom
  readonly lastNameInput: Locator; // Localisateur pour le champ du nom
  readonly postalCodeInput: Locator; // Localisateur pour le champ du code postal
  readonly checkoutButton: Locator; // Localisateur pour le bouton de paiement
  readonly continueButton: Locator; // Localisateur pour le bouton "Continuer"
  readonly finishButton: Locator; // Localisateur pour le bouton "Terminer"

  readonly cartUrl: string; // URL de la page du panier
  readonly stepOneUrl: string; // URL de la première étape du paiement
  readonly stepTwoUrl: string; // URL de la deuxième étape du paiement
  readonly finalStepUrl: string; // URL de l'étape finale du paiement
  readonly finalMessage: Locator; // Localisateur pour le message final

  // Constructeur de la classe
  constructor(page: Page) {
    this.page = page; // Initialisation de la propriété page

    // Initialisation des localisateurs
    this.firstNameInput = page.locator('[data-test="firstName"]'); 
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.finalMessage = page.locator('[data-test="complete-header"]');
    // Initialisation des URLs
    this.cartUrl = "https://www.saucedemo.com/cart.html"; 
    this.stepOneUrl = "https://www.saucedemo.com/checkout-step-one.html";
    this.stepTwoUrl = "https://www.saucedemo.com/checkout-step-two.html";
    this.finalStepUrl = "https://www.saucedemo.com/checkout-complete.html";
  }

  // Méthode pour remplir les informations de l'utilisateur
  async fillUserInfo(firstName: string, lastName: string, zipcode: string) {
    await expect(this.page).toHaveURL(this.stepOneUrl); // Vérifier que l'URL correspond à la première étape
    await this.firstNameInput.isVisible(); 
    await this.firstNameInput.isEnabled(); 
    await this.firstNameInput.fill(firstName); 
    await expect(this.firstNameInput).toHaveValue(firstName); // Vérifier que la valeur saisie est correcte

    await this.lastNameInput.isVisible(); 
    await this.lastNameInput.isEnabled(); 
    await this.lastNameInput.fill(lastName); 
    await expect(this.lastNameInput).toHaveValue(lastName); // Vérifier que la valeur saisie est correcte

    await this.postalCodeInput.isVisible(); 
    await this.postalCodeInput.isEnabled(); 
    await this.postalCodeInput.fill(zipcode); 
    await expect(this.postalCodeInput).toHaveValue(zipcode); // Vérifier que la valeur saisie est correcte

    await this.continueButton.isVisible(); 
    await this.continueButton.isEnabled(); 
    await this.continueButton.click(); // Cliquer sur le bouton "Continuer"
  }

  // Méthode pour accéder à la première étape du paiement
  async goToFirstStep() {
    await expect(this.page).toHaveURL(this.cartUrl); // Vérifier que l'URL correspond à la page du panier
    await expect(this.checkoutButton).toBeAttached(); 
    await expect(this.checkoutButton).toBeVisible(); 
    await this.checkoutButton.click(); // Cliquer sur le bouton de paiement
  }

  // Méthode pour accéder à l'étape finale du paiement
  async goTofinalStep() {
    await expect(this.page).toHaveURL(this.stepTwoUrl); // Vérifier que l'URL correspond à la deuxième étape
    await expect(this.finishButton).toBeAttached(); 
    await expect(this.finishButton).toBeVisible(); 
    await this.finishButton.click(); // Cliquer sur le bouton "Terminer"
  }
}
