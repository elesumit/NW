import personalInsurancePage from '../../pages/personalInsurance.js';
import pageControllers from '../../pages/pageControllers.js';
import productsPage from '../../pages/productsPage.js';
import utils from '../../support/utils.js';
import  launchBaseUrl  from '../../support/baseUrlLauncher.js';

const config = require('../../../config.json');


Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});


// Iterate over each viewport configuration
// Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
//     // Run Cypress tests with the current viewport settings
//     describe(`Validate the personal & business login for various account types - ${viewportName}`, () => {
//         beforeEach(() => {
//             cy.visit(config.environments.baseURL + "/" + config.environments.personalInsurance);
//             if (viewportSetting.includes(':')) {
//                 // Custom viewport size specified
//                 const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
//                 cy.viewport(width, height);
//             } else {
//                 // Predefined device name
//                 cy.viewport(viewportSetting);
//             }
//         });





// Assuming personalInsurancePath is determined dynamically based on test cases
const personalInsurancePath = 'config.environments.personalInsurance';

// Call the launchBaseUrl function with the dynamic personalInsurancePath
launchBaseUrl(config, 'personalInsurance');

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


            // it(`Validate property insurance types  `, () => {
            //     pageControllers.clickContainsText("Property");
            //     pageControllers.clickOnText2("Homeowners");
            //     pageControllers.validatePageText("Homeowners insurance");
            //     cy.go('back');


            //     pageControllers.clickContainsText("Property");
            //     pageControllers.clickOnText2("Renters");
            //     pageControllers.validatePageText("What is renters insurance?");
            //     cy.go('back');

            //     pageControllers.clickContainsText("Property");
            //     pageControllers.clickOnText2("Condo");
            //     pageControllers.validatePageText("Condo insurance");
            //     cy.go('back');

            //     pageControllers.clickContainsText("Property");
            //     pageControllers.clickOnText2("Flood");
            //     pageControllers.validatePageText("Flood insurance");


            // })

            // it(`Validate life insurance types  `, () => {
            //     pageControllers.clickContainsText("Life");
            //     pageControllers.clickOnTitle("Term Life Insurance");
            //     pageControllers.validatePageText("Term life insurance");
            //     cy.go('back');


            //     pageControllers.clickContainsText("Life");
            //     pageControllers.clickOnTitle("Universal Life Insurance");
            //     pageControllers.validatePageText("Universal life insurance");
            //     cy.go('back');

            //     pageControllers.clickContainsText("Life");
            //     pageControllers.clickOnTitle("Whole Life Insurance");
            //     pageControllers.validatePageText("Whole life insurance");
            //     cy.go('back');

            //     pageControllers.clickContainsText("Life");
            //     pageControllers.clickOnTitle("Life Insurance");
            //     pageControllers.validatePageText("Life insurance");

            // })

            // it(`Validate specialty insurance types  `, () => {
            //     pageControllers.clickContainsText("Specialty");
            //     pageControllers.clickOnText("Personal umbrella");
            //     pageControllers.validatePageText("Personal umbrella insurance");
            //     cy.go('back');


            //     pageControllers.clickContainsText("Specialty");
            //     pageControllers.clickOnText("Pet");
            //     pageControllers.validatePageText("Nationwide pet insurance");
            //     cy.go('back');

            //     pageControllers.clickContainsText("Specialty");
            //     pageControllers.clickOnText2("Identity theft");
            //     pageControllers.validatePageText("ID theft protection");
            //     cy.go('back');

            //     pageControllers.clickContainsText("Specialty");
            //     pageControllers.clickOnText2("Travel");
            //     pageControllers.validatePageText("Nationwide recognized as a top travel insurance company");
            //     cy.go('back');

            //     pageControllers.clickContainsText("Specialty");
            //     pageControllers.clickOnText2("Dental");
            //     pageControllers.validatePageText(" Dental insurance from Nationwide");

            // })

            // 4/8 - start from here
            // it(`Validate Nationwide member benefits  `, () => {
            //     pageControllers.clickOnText("On Your Side® Review");
            //     pageControllers.validatePageText("On Your Side® Review");
            //     cy.go('back');


            //     pageControllers.clickOnText("Worry-free claims");
            //     pageControllers.validatePageText("File a Nationwide claim");
            //     cy.go('back');

            //     pageControllers.clickOnText("Usage-based car insurance");
            //     pageControllers.validatePageText("Usage-based insurance from Nationwide®");
            //     cy.go('back');

            //     pageControllers.clickOnText("Multi-policy discounts");
            //     pageControllers.validatePageText("Bundle insurance and save money");
            //     cy.go('back');

            // })

            // it(`Validate Get a Quote button  `, () => {
            //     pageControllers.clickOnText2("Get a quote");
            //     //pageControllers.clickLink1("https://qec.petinsurance.com/?OM=CI0438&amp;_gl=1*1v7pndr*_ga*MTY2MTIxNjg5Ny4xNjk3NzQ0OTU0*_ga_GLJSQEPWL4*MTcxMTk0MjEzNi44NC4xLjE3MTE5NDYyNjcuMTkuMC4w");


            //     const fullURL = "https://qec.petinsurance.com/quote1?OM=CI0438&_gl=1*1edvi1w*_ga*ODE0MTgwNjg0LjE3MTE5NDcwMTI.*_ga_GLJSQEPWL4*MTcxMTk0NzAxMS4xLjAuMTcxMTk0NzAxMy41OC4wLjA.";
            //     const expectedURL = "https://qec.petinsurance.com"; // Truncated URL
  
            //     pageControllers.clickLink1(fullURL); // Pass the full URL


                
            //     pageControllers.validatePageText("Tell us about your pet.");
            //     cy.go('back');
            

            // })


        });
  //  });
//});