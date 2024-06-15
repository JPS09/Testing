class HomePage {
  elements = {
    userNameInput: () => cy.get("#user-name"),
    passwordInput: () => cy.get("#password"),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
  };
  enterUserName(username) {
    this.elements.userNameInput().clear();
    this.elements.userNameInput().type(username);
    return this;
  }
  enterPassword(password) {
    this.elements.passwordInput().clear();
    this.elements.passwordInput().type(password);
    return this;
  }
  login(username, password) {
    this.enterUserName(username);
    this.enterPassword(password);
    this.elements.loginButton().click();
  }
}
export default HomePage;
