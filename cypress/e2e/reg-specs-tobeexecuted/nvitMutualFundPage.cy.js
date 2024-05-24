import utils from '../../support/utils.js';
const config = require('../../../config.json');
const pageControllers = require('../../pages/pageControllers.js');
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});


// Iterate over each viewport configuration
Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
    // Run Cypress tests with the current viewport settings
    describe(`Validate pricing and performance page - ${viewportName}`, () => {
        beforeEach(() => {
            cy.visit(config.environments.baseURL + "/" + config.environments.nvitMutualFund);
            if (viewportSetting.includes(':')) {
                // Custom viewport size specified
                const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
                cy.viewport(width, height);
            } else {
                // Predefined device name
                cy.viewport(viewportSetting);
            }
        });

        describe('Validate nvit Mutual Fund page', () => {


            it('Validate all NVIT mutual funds link', () => {

                let currentPageUrl;

                cy.url().then(url => {
                    currentPageUrl = url;
                });

                utils.readCsvrows("nvitMutualFundPageSmoke.csv").then((rowsWithExecutionYes) => {
                    rowsWithExecutionYes.forEach(row => {
                        const { execution, links, url, expectetext } = row;

                        // Split the links value by ':'
                        const linksArray = links.split(':');

                        linksArray.forEach((link) => {
                            // Capture the current page URL

                            cy.log(`Execution: ${execution}, Link: ${link}, url: ${url}, expectetext: ${expectetext}`);
                            cy.contains(link).should('exist');
                            cy.contains(link).then(($link) => {
                                cy.xpath(`//td[text() = "${link}"]/parent::tr/td[3]/a`).click();

                                cy.wait(2000);
                                cy.url().then((newUrl) => {
                                    cy.log(newUrl, currentPageUrl)

                                    if (newUrl !== currentPageUrl) {
                                        cy.contains(expectetext).should('be.visible');
                                        cy.window().then((win) => {
                                            win.history.back();
                                        });

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

});
