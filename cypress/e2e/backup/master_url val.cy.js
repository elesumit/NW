import personalInsurancePage from '../../pages/personalInsurance.js';
import pageControllers from '../../pages/pageControllers.js';
import utils from '../../support/utils.js';
import { getURL } from '../../support/urlHelper.js';
import { handleQuote } from '../../support/quoteHelper.js';
import { handleLinkValidation } from '../../support/linkHelper-url.js';

const config = require('../../../config.json');

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

            getURL(viewportSetting, environmentURL, extensionURL).then((currentPageUrl) => {
                readCsv(`cypress/fixtures/${childCsvPath}`).then((childRows) => {
                    if (objType.includes('quote')) {
                        handleQuote(childRows, currentPageUrl);
                    } else if (objType.includes('link')) {
                        handleLinkValidation(childRows, currentPageUrl);
                    }
                }).catch((error) => {
                    console.error(`Error reading child CSV: ${error}`);
                });
            });
        });
    });
});
