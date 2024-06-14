import businessPage from '../../pages/business.js'
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
          cy.visit(config.environments.baseURL + "/" + config.environments.business);
          if (viewportSetting.includes(':')) {
            // Custom viewport size specified
            const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
            cy.viewport(width, height);
          } else {
            // Predefined device name
            cy.viewport(viewportSetting);
          }
        });
  
      describe('Validate business page', () => {
 
        it(`Validate startup quote functionality `, () => {
        businessPage.clickStartQuote();
        cy.contains(' Thanks for choosing Nationwide - Start your quote ').should('exist');

        })
 
        it(`validate quote from different links`, () => {         
          businessPage.farmAgentLink();
          cy.contains(' Farm Agent Finder').should('exist');
          cy.go('back');  
          businessPage.businessAgentLink();
          cy.contains('Find an Agency Near You').should('exist');
    });

    it(`Validate see partner solution button`, () => {
        businessPage.clickSeePartnerSolution();
        cy.contains('Start your journey to amplified savings and a brighter future today.').should('exist');

        })
 
  });
});
});