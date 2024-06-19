import { test } from "@playwright/test";
import { HomePage } from "../Pages/home-page";
import { InventoryPage } from "../Pages/inventory-page";

// Test pour se connecter en tant qu'utilisateur standard
test("Connect as Standard user", async ({ page }) => {
  const homePage = new HomePage(page); 
  const inventoryPage = new InventoryPage(page); 

  await homePage.goToLandingPage('https://www.saucedemo.com/'); 
  await homePage.connectAsUser("standard_user", "secret_sauce"); // Se connecter avec un utilisateur standard
  await inventoryPage.checkUrl(inventoryPage.inventoryUrl); // Vérifier l'URL de la page d'inventaire
  await inventoryPage.disconnectAsUser(); // Se déconnecter
});

// Test pour tenter de se connecter en tant qu'utilisateur bloqué
test("Attempt connection as locked_out_user", async ({ page }) => {
  const homePage = new HomePage(page); 
  await homePage.goToLandingPage('https://www.saucedemo.com/');
  await homePage.connectAsUser("locked_out_user", "secret_sauce"); // Tenter de se connecter avec un utilisateur bloqué
  await homePage.checkErrorPresence("Epic sadface: Sorry, this user has been locked out."); // Vérifier le message d'erreur
});
