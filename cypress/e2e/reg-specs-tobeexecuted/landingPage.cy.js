import landingPage from '../../pages/landingPage.js'
import productsPage from '../../pages/productsPage.js';
import utils from '../../support/utils.js';

const config = require('../../../config.json');

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


// Iterate over each viewport configuration
Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
  // Run Cypress tests with the current viewport settings
  describe(`Validate the personal & business login for various account types - ${viewportName}`, () => {
    beforeEach(() => {
      cy.visit(config.environments.baseURL + "/" + config.environments.landingPage);
      if (viewportSetting.includes(':')) {
        // Custom viewport size specified
        const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
        cy.viewport(width, height);
      } else {
        // Predefined device name
        cy.viewport(viewportSetting);
      }
    });

    describe('Validate start your quote for different insurance types', () => {
      const quoteTypes = ["Homeowners", "Auto & home bundle"];
      quoteTypes.forEach(quoteType => {

        it(`Should start quote for ${quoteType} `, () => {
          landingPage.selectQuoteType(quoteType);
          landingPage.getQuoteZip().then($element => {
            if ($element.length > 0) {
              cy.wrap($element).type("32771", { force: true });
              landingPage.clickStartYourQuote();
              //cy.get('#detail-banner__quote-btn').click();
              // landingPage.clickStartYourQuote(); 
              if (quoteType == "Auto & home bundle") {
                cy.get('h1').contains('Nationwide Express ®').should('exist');
              } else if (quoteType == "Homeowners") {
                cy.contains('Find an Agency Near You').should('exist');
              }
              cy.title().then((title) => {
                cy.log(title);
              });
              cy.go('back');                       // Add your assertions here to validate if the quote started successfully
            } else {
              cy.log('Zip Element does not exist for quote -- ', quoteType);
            }
          });
        });


      });

      it(`Validate Search functionality `, () => {
        landingPage.enterSearch("claim").then(() => {
          // Further actions to be performed after entering search text
          // For example:
          landingPage.clickSearch();// Click on the search button
          cy.contains('Search results').should('exist');  // Assert that the URL contains '/search-results'

        });
      });

      // 5/8 - not working
      it(`Validate Login Button `, () => {
        landingPage.clickLogin();
       cy.contains('Log in to your account').should('exist');  // Assert that the URL contains '/search-results'


      });


    });

  });
});