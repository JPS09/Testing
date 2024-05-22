import { test, expect } from "@playwright/test";
import { ProductDetailPage } from "../Pages/product-detail.page";
import { ProductListPage } from "../Pages/product-list-page.page";
import { HomePage } from "../Pages/homepage.page";

test("Check if it is an instance of the correct product", async ({ page }) => {
  const homePage = new HomePage(page);
  const productListPage = new ProductListPage(page);
  const productDetailPage = new ProductDetailPage(page);
  await homePage.goToLandingPage("https://www.amazon.fr/");
  await homePage.closeCookiesBanner();
  await homePage.checksearchBarPresent("Rechercher Amazon.fr");
  await homePage.enterDataInSearchBar(
    "Rechercher Amazon.fr",
    "Sony WH1000XM4",
    true,
    "Go"
  );
  await productListPage.clickOnFirstElement("Sony WH1000XM4| Casque");
  await productDetailPage.checkProductTitle("Sony WH1000XM4| Casque");
});

test("Add a product to the cart", async ({ page }) => {
  const productDetailPage = new ProductDetailPage(page);
  const homePage = new HomePage(page);
  await productDetailPage.goToAProduct(
    "https://www.amazon.fr/Sony-WH1000XM4-Bluetooth-dautonomie-t%C3%A9l%C3%A9phoniques/dp/B08C7KG5LP/ref=sr_1_5?crid=1RTTL3YFPSEPP&dib=eyJ2IjoiMSJ9.YhFRSZvmFAt1xLHNemxycsMhCLckf_TSG2Gv_iNaXESK_pU-410uNV0XPhVzZ6ZMcRW8R2wtxgttLrnf94iB19g39Xbtsed8on6AaywRh67T5TOibcSZqufaPMjdmIL952vJUVUpSWGztz2G01e8Cxzw78og42R6DuRMEZMaTzpTL5fM9jIgXD9hm4LoLjQt6bxyqBKMuClXlumF49AZ7HSTJddi5ITOquIEennTRvxJ169GpDIgWrifClp9QhQhdOAXfch7Nyk6CnlL-XV2DOxFBbOqoC1ue8-abWdqBaM.uTlfBrMV10l4ci7_ZWx8QL68DL3AtSbduHKM2280-Mw&dib_tag=se&keywords=sony+wh-1000xm4&qid=1715843304&sprefix=sony%2Caps%2C74&sr=8-5"
  );
  await homePage.closeCookiesBanner()
  await productDetailPage.addProductToCart()
});
