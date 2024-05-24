import utils from '../../support/utils.js';
const config = require('../../../config.json');
const pageControllers = require('../../pages/pageControllers');
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

// Iterate over each viewport configuration
Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
    // Run Cypress tests with the current viewport settings
    describe(`Validate annual report page - ${viewportName}`, () => {
        beforeEach(() => {
            cy.visit(config.environments.baseURL + "/" + config.environments.annualReport);
            if (viewportSetting.includes(':')) {
                // Custom viewport size specified
                const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
                cy.viewport(width, height);
            } else {
                // Predefined device name
                cy.viewport(viewportSetting);
            }
        });

        describe('Validate annual report page', () => {

            it('Validate links on annual report page', () => { 
                let currentPageUrl;
              
                cy.url().then(url => {
                  currentPageUrl = url;
                });

                utils.readCsvrows("annualReportPage.csv").then((rowsWithExecutionYes) => {
                    rowsWithExecutionYes.forEach(row => {
                        const { execution, links, newTab, expectedtext, elementText } = row;
                
                        // Split the links value by ':'
                        const linksArray = links.split(':');
                
                        linksArray.forEach((link) => {
                            cy.log(`Execution: ${execution}, Link: ${link}, expectedtext: ${expectedtext}, elementText: ${elementText}` );
                            cy.contains(link).should('exist').then(($link) => {
                                cy.wrap($link).click().then(() => {
                                    cy.wait(2000);
                                    if (newTab !== "yes") {
                                        cy.contains(expectedtext).should('be.visible');
                                        cy.go('back');
                                    } else {
                                        pageControllers.clickLink2(elementText);
                                        cy.wait(2000);
                                        cy.log(expectedtext)
                                        cy.contains(expectedtext).should('be.visible');
                                        cy.go('back');
                                    }
                                });
                            });
                        });
                    });
                });
              
               
              });
           

        });

    });

});
