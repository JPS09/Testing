const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/tests/**/*.cy.{js,jsx,ts,tsx}",
    watchForFileChanges: false,
    baseUrl: "https://www.saucedemo.com",
  },
});
