import claimsPage from '../../pages/claimsPage.js'
import pageControllers from '../../pages/pageControllers.js';
import productsPage from '../../pages/productsPage.js';
import utils from '../../support/utils.js';

const config = require('../../../config.json');

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});


// Iterate over each viewport configuration
Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
    // Run Cypress tests with the current viewport settings
    describe(`Validate the personal & business login for various account types - ${viewportName}`, () => {
        beforeEach(() => {
            cy.visit(config.environments.baseURL + "/" + config.environments.personalClaims);
            if (viewportSetting.includes(':')) {
                // Custom viewport size specified
                const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
                cy.viewport(width, height);
            } else {
                // Predefined device name
                cy.viewport(viewportSetting);
            }
        });

        describe('Validate claims page', () => {

            it(`Validate file a claim on claims page `, () => {
                pageControllers.clickOnText("File a claim");
                pageControllers.clickLink1("https://claimsservicing.nationwide.com/fileclaim/info/claim-process-intro");
                pageControllers.validatePageText("Filing a claim will be easy!");
                cy.go('back');
                pageControllers.clickOnText("File a claim now");
                pageControllers.clickLink1("https://claimsservicing.nationwide.com/fileclaim/info/claim-process-intro");
                pageControllers.validatePageText("Filing a claim will be easy!");
            })

            it(`Validate file a business claim on claims page `, () => {
                pageControllers.clickOnText("File a business insurance claim");
                pageControllers.validatePageText("File a business insurance claim");
                cy.go('back');
            })


            it(`Validate file a claim on claims page `, () => {
                pageControllers.clickOnText("Check the status");
                pageControllers.clickLink1("https://claimsselfservice.nationwide.com/claims/index.html#/express-login");
                pageControllers.validatePageText("Track Your Claim");
                cy.go('back');
            })

            it(`Validate Get help online link on claims page `, () => {
                pageControllers.clickOnText("Get help online");
                pageControllers.clickLink1("https://nationwide.rsahelp.com/");
                pageControllers.validatePageText("Enter Phone Number");
                cy.go('back');
            })


            it(`Validate various claim type links on claims page `, () => {
                pageControllers.clickOnTitle("Auto Claims");
                pageControllers.validatePageText("Nationwide auto claims");
                cy.go('back');

                pageControllers.clickOnTitle("Homeowners/Condo Claims");
                pageControllers.validatePageText("Have a homeowners, condo or renters insurance claim?");
                cy.go('back');

                pageControllers.clickOnTitle("Pet Claims");
                pageControllers.validatePageText("We make it easy to submit your Nationwide pet insurance claim.");
                cy.go('back');

                pageControllers.clickOnTitle("Life and Annuity Claims");
                pageControllers.validatePageText("Annuity death benefit and life insurance claims");
                cy.go('back');

                pageControllers.clickOnTitle("Boat claims");
                pageControllers.validatePageText("Boat & watercraft insurance claims");
                cy.go('back');

                pageControllers.clickOnTitle("Renters Claims");
                pageControllers.validatePageText("Starting a property damage claim");
                cy.go('back');

                pageControllers.clickOnText("Harleysville");
                pageControllers.validatePageText("File a Harleysville claim");
                cy.go('back');

                pageControllers.clickOnText("Long-Term Care'");
                pageControllers.validatePageText("Long-term care benefit claims");
                cy.go('back');
            })


            //5/19- Not working
            // it(`Validate claims FAQ on claims page `, () => {
            //     pageControllers.clickOnTitle("Claims FAQ");
            //     pageControllers.validatePageText("Insurance claims FAQ");
            //     cy.go('back');

            // })

            // it(`Validate Disaster prep on claims page `, () => {
            //     pageControllers.clickOnTitle("Disaster prep");
            //     pageControllers.validatePageText("Preparing for a natural disaster");
            //     cy.go('back');

            // })

            // it(`Validate Find a report shop link on claims page `, () => {
            //     pageControllers.clickOnText("Find a repair shop");
            //     pageControllers.clickLink1("https://claimsselfservice.nationwide.com/claims/#/find-repair-shop");
            //     pageControllers.validatePageText("We Can Help You Find a Repair Shop");
            //     cy.go('back');

            // })

           

        });
    });
});