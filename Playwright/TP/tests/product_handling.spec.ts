import { expect, test } from "@playwright/test";
import { HomePage } from "../Pages/home-page";
import { InventoryPage } from "../Pages/inventory-page";
import { CheckOutPage } from "../Pages/checkout-page";

// Test pour commander les deux produits les plus chers
test("Order the two most expensive products", async ({ page }) => {
  const homePage = new HomePage(page);
  const inventoryPage = new InventoryPage(page);
  const checkOutPage = new CheckOutPage(page);

  await homePage.goToLandingPage(homePage.homeUrl);
  await homePage.connectAsUser("standard_user", "secret_sauce"); // Se connecter avec un utilisateur standard
  await inventoryPage.checkUrl(inventoryPage.inventoryUrl);
  await inventoryPage.selectSortChoice("hilo"); // Trier les produits du plus cher au moins cher
  await inventoryPage.AddNumberOfElementsToCart(2); // Ajouter les deux premiers produits au panier
  await inventoryPage.checkCartProductNumber(
    '[data-test="shopping-cart-badge"]',
    2
  ); // Vérifier le nombre d'éléments affiché sur la pastille du panier
  await inventoryPage.goToCartPage('[data-test="shopping-cart-link"]');
  await inventoryPage.checkNumberofCartItem(".cart_item", 2); // Vérifier le nombre d'éléments dans le panier
  await checkOutPage.goToFirstStep(); 
  await checkOutPage.fillUserInfo(
    "John",
    "Neo",
    "0110100001100101011011000110110001101111"
  ); 
  await inventoryPage.checkNumberofCartItem(".cart_item", 2); // Vérifier le nombre d'éléments à cette étape de la commande
  await checkOutPage.goTofinalStep(); 
  expect(page).toHaveURL(checkOutPage.finalStepUrl); 
  expect(checkOutPage.finalMessage).toHaveText("Thank you for your order!"); // Vérifier le message de confirmation de la commande
});

// Test pour trier les produits par prix
test("Sort product by prices", async ({ page }) => {
  const homePage = new HomePage(page); 
  const inventoryPage = new InventoryPage(page); 

  await homePage.goToLandingPage(homePage.homeUrl); 
  await homePage.connectAsUser("standard_user", "secret_sauce"); // Se connecter avec un utilisateur standard
  await inventoryPage.checkUrl(inventoryPage.inventoryUrl); 
  await inventoryPage.selectSortChoice("hilo"); // Trier les produits du plus cher au moins cher
  await inventoryPage.checkSort("hilo"); // Vérifier que les produits sont triés du plus cher au moins cher
  await inventoryPage.selectSortChoice("lohi"); // Trier les produits du moins cher au plus cher
  await inventoryPage.checkSort("lohi"); // Vérifier que les produits sont triés du moins cher au plus cher
});

// Test pour vérifier les détails d'un produit
test("Check product details", async ({ page }) => {
  const homePage = new HomePage(page); 
  const inventoryPage = new InventoryPage(page); 
  await homePage.goToLandingPage(homePage.homeUrl); 
  await homePage.connectAsUser("standard_user", "secret_sauce"); // Se connecter avec un utilisateur standard
  await inventoryPage.goToNthProduct(2); // Accéder au deuxième produit de la liste
  await inventoryPage.checkUrl("https://www.saucedemo.com/inventory-item.html");
});
