const { readCsv } = require('../../support/util1.js');
const config = require('../../../config.json');

const getURL = require('../../support/urlHelper.js');
const handleQuote = require('../../support/quoteHelper.js');
const handleLinkValidation = require('../../support/linkHelper.js');

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
});

Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
    describe(`Validate scenarios based on master CSV - ${viewportName}`, () => {
        it('Validate links and Quote in various nationwide screens', () => {
            const environmentURL = Cypress.env('baseURL');
            const extensionURL = Cypress.env('URLextension');
            const childCsvPath = Cypress.env('childCsvPath');
            const objType = Cypress.env('objType');
            const childRowEnv = Cypress.env('childRow');
            
            if (childRowEnv) {
                const decodedChildRowEnv = decodeURIComponent(childRowEnv); // Decode the childRow
                const childRow = JSON.parse(decodedChildRowEnv); // Parse the childRow
                console.log('Parsed childRow:', childRow);

                getURL(viewportSetting, environmentURL, extensionURL);

                cy.url().then((currentPageUrl) => {
                    if (objType.includes('quote')) {
                        handleQuote(childRow, currentPageUrl);
                    } else if (objType.includes('link')) {
                        handleLinkValidation(childRow, currentPageUrl);
                    }
                });
            } else {
                console.error('childRow environment variable is not set or is undefined.');
            }
        });
    });
});
