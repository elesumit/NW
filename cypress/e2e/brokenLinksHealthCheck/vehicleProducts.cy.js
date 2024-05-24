//const { getSecondColumnValue } = require('../../support/utils.js');

import utils from '../../support/utils.js';

//const pages = ['Auto', 'Motorcycle', 'Snowmobile','Classic car','ATV','RV','Boat','Personal watercraft','Scooter','Golf cart','Business auto','Auto & home']
import landingPage from '../../pages/landingPage-obselete.js'

const pages = ['Auto', 'Motorcycle', 'Snowmobile','Classic car','ATV','RV','Boat','Personal watercraft','Scooter','Golf cart','Business auto','Auto & home']


Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


  describe('Validate Vehicle Products pages', () => {
    it('should click on broken links and validate the title of the displayed page', () => {
      // Visit the initial page with the links
      cy.visit('https://www.nationwide.com/');

      landingPage.elements.vehicleProductsBtn().click();

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
        
        landingPage.elements.vehicleProductsBtn().click();
      })
    
    });
      });
    
  