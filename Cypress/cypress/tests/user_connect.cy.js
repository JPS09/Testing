// Importer les données de test depuis un fichier JSON
import data from "../fixtures/source_data.json";
import HomePage from "../../pages/homePage";
import InventoryPage from "../../pages/inventoryPage";

context("Sauce Demo App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // Regroupe les tests liés aux utilisateurs
  describe("User Test Suite", () => {
    const homePage = new HomePage(); 
    const inventoryPage = new InventoryPage();

    // Test de connexion pour un utilisateur standard
    it("A standard user should be able to connect", () => {
      cy.url().should("contain", "https://www.saucedemo.com"); 
      homePage.elements.userNameInput().as("usernameInput"); 
      homePage.elements.passwordInput().as("passwordInput"); 
      homePage.elements.loginButton().as("loginButton");

      // Vérifier les états initiaux des champs et du bouton
      cy.get("@usernameInput").should("be.visible").and("be.enabled").and("be.empty");
      cy.get("@passwordInput").should("be.visible").and("be.enabled").and("be.empty");
      cy.get("@loginButton").should("be.visible").and("be.enabled");

      homePage.enterUserName(data.standard_user); // Saisir le nom d'utilisateur
      cy.get("@usernameInput").should("have.value", data.standard_user); // Vérifier la valeur saisie

      homePage.enterPassword(data.password); // Saisir le mot de passe
      cy.get("@passwordInput").should("have.value", data.password); // Vérifier la valeur saisie

      cy.get("@loginButton").click(); // Cliquer sur le bouton de connexion

      cy.url().should("contain", "https://www.saucedemo.com/inventory.html"); // Vérifier l'URL après connexion

      inventoryPage.elements.burgerMenu().as("burgerMenu"); 
      cy.get("@burgerMenu").should("be.visible").and("be.enabled"); // Vérifier l'état du menu burger
      cy.get("@burgerMenu").click(); // Cliquer sur le menu burger
      inventoryPage.elements.logOutButton().as("logOutButton");
      cy.get("@logOutButton").should("be.visible"); // Vérifier la visibilité du bouton de déconnexion
      cy.get("@logOutButton").click(); // Cliquer sur le bouton de déconnexion

      // Vérifier l'URL après déconnexion
      cy.url()
        .should("not.contain", "https://www.saucedemo.com/inventory.html")
        .and("contain", "https://www.saucedemo.com");
      cy.get("@loginButton").should("be.visible").and("be.enabled"); // Vérifier l'état du bouton de connexion
    });

    // Test de connexion pour un utilisateur bloqué
    it("A locked out user should not be able to connect", () => {
      cy.url().should("contain", "https://www.saucedemo.com"); // Vérifier l'URL
      homePage.login(data.locked_out_user, data.password); // Tenter la connexion avec un utilisateur bloqué
      homePage.elements.userNameInput().should("contain.value", data.locked_out_user); // Vérifier le nom d'utilisateur saisi
      homePage.elements.passwordInput().should("contain.value", data.password); // Vérifier le mot de passe saisi
      homePage.elements.loginButton().click(); // Cliquer sur le bouton de connexion
      homePage.elements.errorMessage()
        .should("be.visible") // Vérifier la visibilité du message d'erreur
        .and("contain.text", "Epic sadface: Sorry, this user has been locked out."); // Vérifier le texte du message d'erreur
    });
  });
});
