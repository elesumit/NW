import utils from '../../support/utils.js';
const config = require('../../../config.json');
import pageControllers from '../../pages/pageControllers.js';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
      // Iterate over each viewport configuration
    Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
      // Run Cypress tests with the current viewport settings
      describe(`Validate Sem Page - ${viewportName}`, () => {
        beforeEach(() => {         
          cy.visit(config.environments.baseURL + "/" + config.environments.sem);
          if (viewportSetting.includes(':')) {
            // Custom viewport size specified
            const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
            cy.viewport(width, height);
          } else {
            // Predefined device name
            cy.viewport(viewportSetting);
          }
        });
    
    
        it('Validate current member and quote links at Sem page', () => { 
          let currentPageUrl;
        
          cy.url().then(url => {
            currentPageUrl = url;
          });
        
          utils.readCsvrows("semSmoke.csv").then((rowsWithExecutionYes) => {
            rowsWithExecutionYes.forEach(row => {
              const { execution, links, url, elementtext, zip, expectetext } = row;
                
              // Split the links value by ':'
              const linksArray = links.split(':');
        
              linksArray.forEach((link) => {
                // Capture the current page URL

                cy.log(`Execution: ${execution}, Link: ${link}, url: ${url}, expectetext: ${expectetext}`);
                cy.contains(link).should('exist');
              cy.contains(link).then(($link) => {
                  cy.wrap($link).click();

                  if (zip !== '') {
                    
                    cy.xpath(`(//*[@id="${elementtext}"]/div/div/div/input)[1]`).type(zip);
                    cy.xpath(`(//*[@id="${elementtext}"]/div/div/input)[1]`).click();                    
                  }


                  cy.wait(2000); 
                  cy.url().then((newUrl) => {
                    cy.log(newUrl,currentPageUrl)
                    if (link == "Business") {
                      currentPageUrl= newUrl
                    }
                    if (newUrl !== currentPageUrl) {
                      cy.contains(expectetext).should('be.visible');
                      cy.go('back');
                    } else {
                      // Log a message if the URL did not change
                      cy.log("Link did not open a new page");
                    }
                  });
                });
              });
            });
          });
        });

    });

  });
