const { getSecondColumnValue } = require('../../support/utils.js');

import landingPage from '../../pages/landingPage-obselete.js'

import environment from '../../pages/environment.js';

const pages = ['Homeowners', 'Renters', 'Condo','Flood','Business property', 'Home & auto']


Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

 // describe - is the test suite (similar to feature)
 //it - is the test method (similar to test scenario)

  describe('Validate Property Products pages', () => {
    it('should click on broken links and validate the title of the displayed page', () => {
      // Visit the initial page with the links
      environment.URL.prodUrl();
      landingPage.elements.propertyProductsBtn().click();

      // Get the number of li elements and loop through them
      pages.forEach(page => {
        cy.contains(page).click()
        //cy.location('pathname').should('eq', `/${page}`)
        cy.url().then((url) => {
          cy.title().then((title) => {
            // Get the second column value from getSecondColumnValue
            getSecondColumnValue(url, 'title').then((secondColumnValue) => {
              // Assert the title with the second column value
              cy.log(secondColumnValue);
              cy.title().should('eq', secondColumnValue);
              

            });
          });
        });
        cy.go('back')
        
        landingPage.elements.propertyProductsBtn().click();
      })
    
    });
      });
    
  