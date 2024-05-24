import utils from '../../support/utils.js';
const config = require('../../../config.json');
const pageControllers = require('../../pages/pageControllers');
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

// Iterate over each viewport configuration
Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
    // Run Cypress tests with the current viewport settings
    describe(`Validate animal Safety page - ${viewportName}`, () => {
        beforeEach(() => {
            cy.visit(config.environments.baseURL + "/" + config.environments.animalSafety);
            if (viewportSetting.includes(':')) {
                // Custom viewport size specified
                const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
                cy.viewport(width, height);
            } else {
                // Predefined device name
                cy.viewport(viewportSetting);
            }
        });

        describe('Validate animal Safety page', () => {

            it('Validate links on animal Safety page', () => { 
                let currentPageUrl;
              
                cy.url().then(url => {
                  currentPageUrl = url;
                });

                utils.readCsvrows("animalSafetyPage.csv").then((rowsWithExecutionYes) => {
                    rowsWithExecutionYes.forEach(row => {
                        const { execution, links, newTab, expectedtext, elementText } = row;
                        
                        // Split the links value by ':'
                        const linksArray = links.split(':');
                
                        linksArray.forEach((link) => {
                            cy.log(`Execution: ${execution}, Link: ${link}, expectedtext: ${expectedtext}, elementText: ${elementText}` );
                            
                            if (newTab !== 'no') {
                                //this will execute in yes condition
                                pageControllers.clickLink3(elementText);
                                cy.wait(2000);
                                cy.contains(expectedtext).should('be.visible');
                               // cy.go('back');
                               cy.window().then((win) => {
                                win.history.back();
                              });
                                              
                              }

                              else
                              {

                                pageControllers.clickLink2(elementText);
                                cy.wait(2000);
                                cy.contains(expectedtext).should('be.visible');
                               // cy.go('back');
                            //    cy.window().then((win) => {
                            //     win.history.back();
                            //   });

                            Cypress.Commands.add('goBack', () => {
                                cy.window().then((win) => {
                                  win.history.back();
                                });
                              });
                              
                              // Usage
                              cy.goBack();
                              
                               
                              }

                        });
                    });
                });
              
               
              });
           
            // it('Validate links on animal Safety page', () => { 
            //     let currentPageUrl;
              
            //     cy.url().then(url => {
            //       currentPageUrl = url;
            //     });

            //     utils.readCsvrows("animalSafetyPage.csv").then((rowsWithExecutionYes) => {
            //         rowsWithExecutionYes.forEach(row => {
            //             const { execution, links, newTab, expectedtext, elementText } = row;
                
            //             // Split the links value by ':'
            //             const linksArray = links.split(':');
                
            //             linksArray.forEach((link) => {
            //                 cy.log(`Execution: ${execution}, Link: ${link}, expectedtext: ${expectedtext}, elementText: ${elementText}` );
            //                 cy.contains(link).should('exist').then(($link) => {
            //                     cy.wrap($link).click().then(() => {
            //                         cy.wait(2000);
            //                         if (newTab !== "yes") {
            //                             cy.contains(expectedtext).should('be.visible');
            //                             cy.go('back');
            //                         } else {
            //                             pageControllers.clickLink2(elementText);
            //                             cy.wait(2000);
            //                             cy.log(expectedtext)
            //                             cy.contains(expectedtext).should('be.visible');
            //                             cy.go('back');
            //                         }
            //                     });
            //                 });
            //             });
            //         });
            //     });
              
               
            //   });
        });

    });

});
