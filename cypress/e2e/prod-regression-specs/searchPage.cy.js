import utils from '../../support/utils.js';
const config = require('../../../config.json');
const pageControllers = require('../../pages/pageControllers.js');
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

// Iterate over each viewport configuration
Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
    // Run Cypress tests with the current viewport settings
    describe(`Validate search Page  - ${viewportName}`, () => {
        beforeEach(() => {
            cy.visit(config.environments.baseURL + "/" + config.environments.search);
            if (viewportSetting.includes(':')) {
                // Custom viewport size specified
                const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
                cy.viewport(width, height);
            } else {
                // Predefined device name
                cy.viewport(viewportSetting);
            }
        });

        describe('Validate search Page', () => {
            it('Validate links on search Page', () => {
                let currentPageUrl;

                cy.url().then(url => {
                    currentPageUrl = url;
                });
                utils.readCsvrows("search.csv").then((rowsWithExecutionYes) => {
                    rowsWithExecutionYes.forEach(row => {
                        const { execution, links, newTab, expectedtext, elementText } = row;

                        // Split the links value by ':'
                        const linksArray = links.split(':');
                        linksArray.forEach((link) => {
                            cy.log(`Execution: ${execution}, Link: ${link}, expectedtext: ${expectedtext}, elementText: ${elementText}`);

                            if (newTab !== 'no') {
                                //this will execute in yes condition
                                pageControllers.clickLink3(elementText);
                                cy.wait(2000);
                                cy.contains(expectedtext).should('be.visible');
                                cy.go('back');

                            }
                            else {
                                //this will execute in no condition
                                pageControllers.clickLink2(elementText);
                                cy.wait(2000);
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
