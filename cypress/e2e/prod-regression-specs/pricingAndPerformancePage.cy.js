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
            cy.visit(config.environments.baseURL + "/" + config.environments.pricingandperformance);
            if (viewportSetting.includes(':')) {
                // Custom viewport size specified
                const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
                cy.viewport(width, height);
            } else {
                // Predefined device name
                cy.viewport(viewportSetting);
            }
        });

        describe('Validate pricing and performance page', () => {
            it('Validate all mutual funds links ', () => {
                // Find all rows in the table
                cy.xpath('//table/tbody/tr').each(($row) => {
                    // Find the first link in the current row
                    const link = $row.find('td:first-of-type div a');

                    // Check if the link exists in the row
                    if (link.length > 0) {
                        // Capture the text of the link
                        const linkText = link.text();

                        cy.xpath(`//a[text() = "${linkText}"]`).click();

                        cy.wait(2000);

                        cy.xpath('//h1').invoke('text').then(headerText => {
                            // Check if any link text contains '*'
                            const containsAsterisk = headerText.includes('*');
                            
                            pageControllers.validatePageText(linkText);

                            
                        });

                        cy.go('back');
                    }
                });
            });


            it('Validate Asset Class filter ', () => {
                let midCapFound = false;
                pageControllers.selectShadowElement("assetOptionn", "Mid Cap");
                //Find all rows in the table
                cy.xpath('//table/tbody/tr').each(($row) => {
                    const rowText = $row.text();
                    // Check if the row contains the text "Mid Cap"
                    if (rowText.includes("Mid Cap")) {

                        midCapFound = true;
                        // Log a message or perform any action when "Mid Cap" is found in the row
                        cy.log("Found 'Mid Cap' in row:", rowText);
                    }
                    else
                    {
                        Cypress.log({
                            name: 'Error',
                            message: `Mid cap is not found in row: ${typeof rowText}`,
                          });
                    }

                    // Find the first link in the current row
                    const link = $row.find('td:first-of-type div a');

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
                        cy.go('back');
                        pageControllers.selectShadowElement("assetOptionn", "Mid Cap");
                    }
                });
            });

        });

    });

});
