const { I } = inject();
import assert from "assert";

export = {
  buttons: {
    cookie_button: '//button[contains(@class,"agree-c")]',
    signup_button: "//a[contains(@href,'/login')]",
  },
  visible_username:
    '//a[contains(@class,"user-menu-button")]/span[contains(@class,"text")]',
  // insert your locators and methods here

  async handleCookie() {
    await I.seeElement(this.buttons.cookie_button);
    await I.click(this.buttons.cookie_button);
  },
  async checkIfConnected() {
    await I.seeElement(this.visible_username);
    let username_text = (
      await I.grabTextFrom(this.visible_username)
    ).toLowerCase();
    assert.equal(username_text, process.env.USER_1_ID);
  },
};
