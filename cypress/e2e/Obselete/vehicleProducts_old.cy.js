const { getSecondColumnValue } = require('../../support/utils.js');

//const pages = ['Auto', 'Motorcycle', 'Snowmobile','Classic car','ATV','RV','Boat','Personal watercraft','Scooter','Golf cart','Business auto','Auto & home']
import landingPage from '../../pages/landingPage-obselete.js'

import environment from '../../pages/environment.js';

const pages = ['Auto', 'Motorcycle', 'Snowmobile','Classic car','ATV','RV','Boat','Personal watercraft','Scooter','Golf cart','Business auto','Auto & home']



Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

     describe('Loop through li elements, print count, and navigate', () => {
      it('should print the count of li elements and navigate through links', () => {
        // Visit the initial page with the list

        environment.URL.prodUrl();
        landingPage.elements.vehicleProductsBtn().click();
            
        // Use XPath to select all li elements under the specified ul

        landingPage.elements.vehicleProductsLink().then(($lis) => {
          const liCount = $lis.length;
          cy.log(`Number of li elements: ${liCount}`);
      
        $lis.each((liIndex) => {
          const dynamicXPath = `(//ul[@class="bolt-text-columns-3"]/li/a)[${liIndex + 1}]`;
          cy.xpath(dynamicXPath).click({force: true});
              
        //  cy.title().then((title) => {
          //  cy.log(title);


            cy.url().then((url) => {
              cy.title().then((title) => {
                // Get the second column value from getSecondColumnValue
                getSecondColumnValue(url, 'title').then((secondColumnValue) => {
                  // Assert the title with the second column value
                  cy.log(secondColumnValue);
                  cy.title().should('eq', secondColumnValue);
                  
    
                });
              });

            cy.go('back');
          });

          cy.xpath('//button[text()="Vehicle"]').click();
      
          if (liIndex < liCount - 1) {
            const nextLiXPath = `(//ul[@class="bolt-text-columns-3"]/li/a)[${liIndex + 2}]`;
            cy.xpath(nextLiXPath).click();
          }
        });
      });
    });
});
    
  