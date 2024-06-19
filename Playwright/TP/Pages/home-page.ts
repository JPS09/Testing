import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class HomePage {
  readonly page: Page; 
  readonly userNameInput: Locator; // Localisateur pour le champ de saisie du nom d'utilisateur
  readonly passwordInput: Locator; // Localisateur pour le champ de saisie du mot de passe
  readonly connectButton: Locator; // Localisateur pour le bouton de connexion
  readonly errorMessage: Locator; // Localisateur pour le message d'erreur
  readonly homeUrl: string; // URL de la page d'accueil

  // Constructeur de la classe
  constructor(page: Page) {
    this.page = page;
    // Initialisation des localisateurs
    this.userNameInput = page.locator('[data-test="username"]'); 
    this.passwordInput = page.locator('[data-test="password"]');
    this.connectButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    // Initialisation de l'URL de la page d'accueil
    this.homeUrl = "https://www.saucedemo.com/"; 
  }

  // Méthode pour accéder à la page d'accueil
  async goToLandingPage(url: string) {
    await this.page.goto(url); 
    await expect(this.page).toHaveURL(url);
  }

  // Méthode pour se connecter en tant qu'utilisateur
  async connectAsUser(username: string, passsword: string) {
    await this.userNameInput.isVisible(); 
    await this.userNameInput.isEnabled(); 
    await this.userNameInput.fill(username); 
    await expect(this.userNameInput).toHaveValue(username); // Vérifier que la valeur saisie est correcte

    await this.passwordInput.isVisible(); 
    await this.passwordInput.isEnabled(); 
    await this.passwordInput.fill(passsword); 
    await expect(this.passwordInput).toHaveValue(passsword); // Vérifier que la valeur saisie est correcte

    await this.connectButton.isVisible(); 
    await this.connectButton.isEnabled();
    await this.connectButton.click(); // Cliquer sur le bouton de connexion
  }

  // Méthode pour vérifier la présence d'un message d'erreur
  async checkErrorPresence(expected_message: string) {
    await expect(this.errorMessage).toBeVisible(); // Vérifier que le message d'erreur est visible
    await expect(this.errorMessage).toContainText(expected_message); // Vérifier que le message d'erreur contient le texte attendu
  }
}
