import utils from '../../support/utils.js';
const config = require('../../../config.json');
const pageControllers = require('../../pages/pageControllers.js');
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

// Iterate over each viewport configuration
Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
    // Run Cypress tests with the current viewport settings
    describe(`Validate learning Center Page - ${viewportName}`, () => {
        beforeEach(() => {
            cy.visit(config.environments.baseURL + "/" + config.environments.learningCenter);
            if (viewportSetting.includes(':')) {
                // Custom viewport size specified
                const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
                cy.viewport(width, height);
            } else {
                // Predefined device name
                cy.viewport(viewportSetting);
            }
        });

        describe('Validate learning Center Page', () => {
            

            it('Validate links on Learning Center Page', () => {
                let currentPageUrl;
            
                // Store the current URL
                cy.url().then(url => {
                    currentPageUrl = url;
                });
            
                // Read rows from the CSV file
                utils.readCsvrows("learningCenter.csv").then((rowsWithExecutionYes) => {
                    rowsWithExecutionYes.forEach(row => {
                        const { execution, links, condition, expectedtext, elementText } = row;
            
                        // Split the links value by ':'
                        const linksArray = links.split(':');
                        linksArray.forEach((link) => {
                            cy.log(`Execution: ${execution}, Link: ${link}, expectedtext: ${expectedtext}, elementText: ${elementText}`);
            
                            // Get the XPath for the given condition and link
                            const xpath = pageControllers.getXPath(condition, elementText);
            
                            // Click the link using the generic click function
                            if (xpath) {
                                pageControllers.clickLink(xpath);
                                cy.wait(2000);
                                cy.contains(expectedtext).should('be.visible');
                                cy.visit(currentPageUrl);
                            } else {
                                cy.log(`No matching XPath for condition: ${condition}`);
                            }
                        });
                    });
                });
            });
            
        });

    });

});
