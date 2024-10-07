const { I } = inject();

export = {

  button: {
    login_button: "//button[contains(@id,'button-login')]",
    user_menu:
      '//a[contains(@class,"user-menu-button")]/span[contains(@class,"text")]',
  },

  input: {
    login_input: "//input[contains(@id,'login-username')]",
    password_input: "//input[contains(@id,'login-password')]",
  },

  visible_username: '//a[contains(@class,"user-menu-button")]/span[contains(@class,"text")]',

  async enterDataAndLog() {
    I.dontSeeInField(
     this.input.login_input,
      secret(process.env.USER_1_ID)
    );
    I.dontSeeInField(
      this.input.password_input,
      secret(process.env.USER_1_ID)
    );
    I.fillField(
      this.input.login_input,
      secret(process.env.USER_1_ID)
    );
    I.fillField(
      this.input.password_input,
      secret(process.env.USER_1_PSD)
    );
    I.click(this.button.login_button);
  },

  // insert your locators and methods here
};
