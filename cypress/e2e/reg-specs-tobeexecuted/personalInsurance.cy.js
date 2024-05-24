import personalInsurancePage from '../../pages/personalInsurance.js';
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
            cy.visit(config.environments.baseURL + "/" + config.environments.personalInsurance);
            if (viewportSetting.includes(':')) {
                // Custom viewport size specified
                const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
                cy.viewport(width, height);
            } else {
                // Predefined device name
                cy.viewport(viewportSetting);
            }
        });

        describe('Validate personal insurance page', () => {

            it('Validate Quote for various Insurance types', () => { 
                utils.readCsvrows("personalInsurance.csv").then((rowsWithExecutionYes) => {
                  cy.log('This is a log message');
                  if (Array.isArray(rowsWithExecutionYes)) {
                    rowsWithExecutionYes.forEach(row => {
                
                     pageControllers.selectDropdownOption("selectQuoteForm",row['insuranceType']);
                     personalInsurancePage.zipCode(row['prop_zipcode'], row['zipCode']);
                     personalInsurancePage.clickOnQuote(row['prop_startquote']);
                     pageControllers.validatePageText(row['expected_Result']);
                     cy.go('back');
                      
                    });
                  } else {
                    // Log an error if the data is not in the expected format
                    Cypress.log({
                      name: 'Error',
                      message: `Unexpected data format: ${typeof rowsWithExecutionYes}`,
                    });
                  }
                }).catch((error) => {
                  console.error(error); // Log any errors during data retrieval
                });
              });
              

            

            it(`Validate Vehicle insurance types  `, () => {
                pageControllers.clickContainsText("Vehicle");
                pageControllers.clickOnText3("Auto");
                pageControllers.validatePageText("Car insurance");
                cy.go('back');


                pageControllers.clickContainsText("Vehicle");
                pageControllers.clickOnText2("Classic car");
                pageControllers.validatePageText("Classic car insurance");
                cy.go('back');

                pageControllers.clickContainsText("Vehicle");
                pageControllers.clickOnText("RV, motorhome, travel trailer & camper");
                pageControllers.validatePageText("RV insurance");
                cy.go('back');

                pageControllers.clickContainsText("Vehicle");
                pageControllers.clickOnText2("Golf cart");
                pageControllers.validatePageText("Golf cart insurance");


            })


            it(`Validate property insurance types  `, () => {
                pageControllers.clickContainsText("Property");
                pageControllers.clickOnText2("Homeowners");
                pageControllers.validatePageText("Homeowners insurance");
                cy.go('back');


                pageControllers.clickContainsText("Property");
                pageControllers.clickOnText2("Renters");
                pageControllers.validatePageText("What is renters insurance?");
                cy.go('back');

                pageControllers.clickContainsText("Property");
                pageControllers.clickOnText2("Condo");
                pageControllers.validatePageText("Condo insurance");
                cy.go('back');

                pageControllers.clickContainsText("Property");
                pageControllers.clickOnText2("Flood");
                pageControllers.validatePageText("Flood insurance");


            })

            it(`Validate life insurance types  `, () => {
                pageControllers.clickContainsText("Life");
                pageControllers.clickOnTitle("Term Life Insurance");
                pageControllers.validatePageText("Term life insurance");
                cy.go('back');


                pageControllers.clickContainsText("Life");
                pageControllers.clickOnTitle("Universal Life Insurance");
                pageControllers.validatePageText("Universal life insurance");
                cy.go('back');

                pageControllers.clickContainsText("Life");
                pageControllers.clickOnTitle("Whole Life Insurance");
                pageControllers.validatePageText("Whole life insurance");
                cy.go('back');

                pageControllers.clickContainsText("Life");
                pageControllers.clickOnTitle("Life Insurance");
                pageControllers.validatePageText("Life insurance");

            })

            it(`Validate specialty insurance types  `, () => {
                pageControllers.clickContainsText("Specialty");
                pageControllers.clickOnText("Personal umbrella");
                pageControllers.validatePageText("Personal umbrella insurance");
                cy.go('back');


                pageControllers.clickContainsText("Specialty");
                pageControllers.clickOnText("Pet");
                pageControllers.validatePageText("Nationwide pet insurance");
                cy.go('back');

                pageControllers.clickContainsText("Specialty");
                pageControllers.clickOnText2("Identity theft");
                pageControllers.validatePageText("ID theft protection");
                cy.go('back');

                pageControllers.clickContainsText("Specialty");
                pageControllers.clickOnText2("Travel");
                pageControllers.validatePageText("Nationwide recognized as a top travel insurance company");
                cy.go('back');

                pageControllers.clickContainsText("Specialty");
                pageControllers.clickOnText2("Dental");
                pageControllers.validatePageText(" Dental insurance from Nationwide");

            })


        });
    });
});