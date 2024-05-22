import { test, expect } from "@playwright/test";
import { CartPage } from "../Pages/cart.page";
import { ProductDetailPage } from "../Pages/product-detail.page";
import { HomePage } from "../Pages/homepage.page";

test("Check if a product has been added to cart", async ({ page }) => {
  const cartPage = new CartPage(page);
  const productDetailPage = new ProductDetailPage(page);
  const homePage = new HomePage(page);
  await productDetailPage.goToAProduct(
    "https://www.amazon.fr/Sony-WH1000XM4-Bluetooth-dautonomie-t%C3%A9l%C3%A9phoniques/dp/B08C7KG5LP/ref=sr_1_5?crid=1FQ7U5SWK811B&dib=eyJ2IjoiMSJ9.vrfWIE40OQjuk-KnumCe-R8kt0IMUP_7khOi2SCKsLqAVbUvcNd9GaIPnv1K21aDIjbK-cLW2z7MhE5KaV0UTzZsd5-w7PmE9dT0fVFyTWwk0Z86ZI02QBYnhw5SklZRPO5Ug7_Fw4BxojcgPsWJA-muBmMALs8skjfKe8Ux1JZldYeJz4R3PXwo49nbPz-BwbAG0G2SSwdMjcJDhictVRQ8y4WXlIonqO-VcqgxwzH2PkywPbda--3VgH-g-Vz2LxF18albNRt5hFRU1B3VRuETWhnmKZ-ABpiKXUJUuHM.Gtf4hHiUmXZqN9TuoK4qooktn7peQWoMSLVqjwL3v-Q&dib_tag=se&keywords=sony+mx1000xm4&qid=1715930166&sprefix=sony+mx%2Caps%2C85&sr=8-5"
  );
  await homePage.closeCookiesBanner();
  await productDetailPage.addProductToCart();
  await productDetailPage.goToCart()
  await cartPage.checkIfProductInCart("Sony WH1000XM4| Casque");
});
