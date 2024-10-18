class HomePage {
  // Définition des éléments de la page d'accueil
  elements = {
    userNameInput: () => cy.get('[data-test="username"]'), // Champ de saisie du nom d'utilisateur
    passwordInput: () => cy.get('[data-test="password"]'), // Champ de saisie du mot de passe
    loginButton: () => cy.get('[data-test="login-button"]'), // Bouton de connexion
    errorMessage: () => cy.get('[data-test="error"]'), // Message d'erreur en cas de mauvais identifiant ou compte bloqué
  };

  // Méthode pour saisir le nom d'utilisateur
  enterUserName(username) {
    this.elements.userNameInput().clear(); 
    this.elements.userNameInput().type(username); 
  }

  // Méthode pour saisir le mot de passe
  enterPassword(password) {
    this.elements.passwordInput().clear(); 
    this.elements.passwordInput().type(password); 
  }

  // Méthode pour se connecter
  login(username, password) {
    this.enterUserName(username);
    this.enterPassword(password); 
    this.elements.loginButton().click(); 
  }
}

export default HomePage;
