const { defineConfig } = require("cypress");

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter', // for html report
  includeShadowDom: true,
  "chromeWebSecurity": false,
  e2e: {
    experimentalWebKitSupport: true, // for Webkit - Safari Browser 
    setupNodeEvents(on, config) {


      // implement node event listeners here
      this.screenshotOnRunFailure=true;
      require('cypress-mochawesome-reporter/plugin')(on); // for html report
      

    },
  },
});
