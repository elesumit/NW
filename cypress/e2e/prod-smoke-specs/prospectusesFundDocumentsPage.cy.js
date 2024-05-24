import utils from '../../support/utils.js';
const config = require('../../../config.json');
const pageControllers = require('../../pages/pageControllers');
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});


// Iterate over each viewport configuration
Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
    // Run Cypress tests with the current viewport settings
    describe(`Validate pricing and performance page - ${viewportName}`, () => {
        beforeEach(() => {
            cy.visit(config.environments.baseURL + "/" + config.environments.prospectusesFundDocumentsPage);
            if (viewportSetting.includes(':')) {
                // Custom viewport size specified
                const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
                cy.viewport(width, height);
            } else {
                // Predefined device name
                cy.viewport(viewportSetting);
            }
        });

        describe('Validate prospectuses Fund and Documents page', () => {
            it('Validate all prospectuses Fund and Documents links ', () => {
                // Find all rows in the table
                cy.xpath('//table/tbody/tr').each(($row) => {
                    // Find the first link in the current row
                    const link = $row.find('td:first-of-type a');

                    // Check if the link exists in the row
                    if (link.length > 0) {
                        // Capture the text of the link
                        const linkText = link.text();

                        cy.xpath(`//a[text() = "${linkText}"]`).click();

                        cy.wait(2000);

                        cy.xpath('//h1').invoke('text').then(headerText => {
                            // Check if any link text contains '*'
                            const containsAsterisk = headerText.includes('*');

                            // If no link text contains '*', assert that it's not present
                            if (!containsAsterisk) {
                                cy.xpath('//h1').invoke('text').should('eq', link.text());
                                cy.log("No link text contains '*'");
                            } else {
                                // If at least one link text contains '*', assert its presence
                                cy.log("At least one link text contains '*'");
                                cy.xpath('//h1').invoke('text').should('eq', link.text() + '*');
                            }
                        });

                        //cy.go('back');
                        cy.window().then((win) => {
                            win.history.back();
                          });
                    }
                });
            });



        });

    });

});
