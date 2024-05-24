import utils from '../../support/utils.js';
const config = require('../../../config.json');
const pageControllers = require('../../pages/pageControllers');
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

// Iterate over each viewport configuration
Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
    // Run Cypress tests with the current viewport settings
    describe(`Validate contact page - ${viewportName}`, () => {
        beforeEach(() => {
            cy.visit(config.environments.baseURL + "/" + config.environments.contact);
            if (viewportSetting.includes(':')) {
                // Custom viewport size specified
                const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
                cy.viewport(width, height);
            } else {
                // Predefined device name
                cy.viewport(viewportSetting);
            }
        });

        describe('Validate contact page', () => {
           

        });

    });

});
