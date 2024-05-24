import { readCsvFixture } from '../../support/util1.js';
const pageControllers = require('../../pages/pageControllers.js');
const personalInsurancePage = require('../../pages/personalInsurance.js');

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Master-Child CSV Execution', () => {
    it('Runs tests based on master CSV data', () => {
        cy.fixture('master.csv').then(neatCsv).then((masterRows) => {
            masterRows.forEach(masterRow => {
                const { Scenario, specname, execution, csvtype } = masterRow;

                if (execution === 'yes') {
                    describe(`Executing ${Scenario} for ${specname}`, () => {
                        it(`should execute tests from ${csvtype}`, () => {
                            readCsvFixture(`cypress/fixtures/${csvtype}`).then((childRows) => {
                                childRows.forEach(childRow => {
                                    if (csvtype.includes('quote')) {
                                        describe(`Validate personal insurance page for ${childRow.insuranceType}`, () => {
                                            it(`Validate Quote for ${childRow.insuranceType}`, () => {
                                                pageControllers.selectDropdownOption("selectQuoteForm", childRow['insuranceType']);
                                                personalInsurancePage.zipCode(childRow['prop_zipcode'], childRow['zipCode']);
                                                personalInsurancePage.clickOnQuote(childRow['prop_startquote']);
                                                pageControllers.validatePageText(childRow['expectedText']);
                                                cy.go('back');
                                            });
                                        });
                                    } else if (csvtype.includes('link')) {
                                        describe(`Validate link for ${childRow.linkText}`, () => {
                                            it(`Validate link for ${childRow.linkText}`, () => {
                                                let currentPageUrl;

                                                cy.url().then(url => {
                                                    currentPageUrl = url;
                                                });

                                                const linksArray = childRow.linkText.split(':');
                                                linksArray.forEach(link => {
                                                    cy.log(`Link: ${link}, expectedText: ${childRow.expectedText}`);

                                                    const xpath = pageControllers.getXPath(childRow.condition, link);

                                                    if (xpath) {
                                                        pageControllers.clickLink(xpath);
                                                        cy.wait(2000);
                                                        cy.contains(childRow.expectedText).should('be.visible');
                                                        cy.visit(currentPageUrl);
                                                    } else {
                                                        cy.log(`No matching XPath for condition: ${childRow.condition}`);
                                                    }
                                                });
                                            });
                                        });
                                    } else {
                                        Cypress.log({
                                            name: 'Error',
                                            message: `Unexpected CSV type: ${csvtype}`,
                                        });
                                    }
                                });
                            });
                        });
                    });
                }
            });
        }).catch((error) => {
            console.error(error); // Log any errors during data retrieval
        });
    });
});
