import pageControllers from '../../pages/pageControllers.js';
import utils from '../../support/utils.js';
import personalAuto from '../../pages/personalAuto.js';

const config = require('../../../config.json');

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});


// Iterate over each viewport configuration
Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
    // Run Cypress tests with the current viewport settings
    describe(`Validate the personal & business login for various account types - ${viewportName}`, () => {
        beforeEach(() => {
            cy.visit(config.environments.baseURL + "/" + config.environments.personalAuto);
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
                utils.readCsvrows("personalAuto.csv").then((rowsWithExecutionYes) => {
                  cy.log('This is a log message');
                  if (Array.isArray(rowsWithExecutionYes)) {
                    rowsWithExecutionYes.forEach(row => {
                   
                     pageControllers.selectDropdownOption("selectQuoteForm",row['insuranceType']);
                     personalAuto.zipCode(row['prop_zipcode'], row['zipCode']);
                     personalAuto.clickOnQuote(row['prop_startquote']);
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
              

            it(`Validate Continue a saved quote, find agent, prepare for auto quote link `, () => {
                pageControllers.clickOnText2("Continue a saved quote »");
                pageControllers.validatePageText("Retrieve a Quote");
                cy.go('back');

                personalAuto.clickAgent("Find an agent");
                pageControllers.validatePageText("Find local Nationwide Insurance Agencies near you");
                cy.go('back');

                pageControllers.clickOnText("Preparing for an auto quote »");
                pageControllers.validatePageText("What do I need for an auto insurance quote?");
                cy.go('back');

            })


            it(`Validate smart ride and smart miles link `, () => {
              pageControllers.clickOnText("SmartRide®");
              pageControllers.validatePageText("Nationwide’s SmartRide program rewards safe driving");
              cy.go('back');

              pageControllers.clickOnText("SmartMiles®");
              pageControllers.validatePageText("Pay-per-mile car insurance program");
              cy.go('back');

          })


          it(`Validate auto insurance coverage and discounts buttons `, () => {
            pageControllers.clickOnText("Standard & optional coverages");
            pageControllers.validatePageText("Full coverage insurance");
            cy.go('back');

            pageControllers.clickOnText("Get Accident Forgiveness");
            pageControllers.validatePageText("Accident Forgiveness");
            cy.go('back');

            pageControllers.clickOnText("See how you can save");
            pageControllers.validatePageText("Auto insurance discounts");
            cy.go('back');
            

        })
   
        it(`Validate common auto coverages link `, () => {
          pageControllers.clickOnText("Comprehensive");
          pageControllers.validatePageText("Comprehensive coverage");
          cy.go('back');

          pageControllers.clickOnText("Collision");
          pageControllers.validatePageText("Collision coverage");
          cy.go('back');

          pageControllers.clickOnText("Gap coverage");
          pageControllers.validatePageText("Gap insurance");
          cy.go('back');
          
          
          pageControllers.clickOnText("Uninsured motorist");
          pageControllers.validatePageText("Uninsured motorist coverage");
          cy.go('back');

          
          pageControllers.clickOnText("Bodily injury liability");
          pageControllers.validatePageText("Liability car insurance coverage");
          cy.go('back');

          pageControllers.clickOnText("Roadside Assistance");
          pageControllers.validatePageText("Roadside Assistance");
          cy.go('back');

      })

      it(`Validate Superior claims service `, () => {
        pageControllers.clickOnTitle("013-Login SBS Landing Page");
        pageControllers.validatePageText("Log in to your account");
        cy.go('back');

        pageControllers.clickOnText2("Start an auto claim");
        pageControllers.validatePageText("Nationwide auto claims");
        cy.go('back');

        pageControllers.clickOnText2("Claims FAQ");
        pageControllers.validatePageText("Insurance claims FAQ");
        cy.go('back');
      })

      it(`Validate auto insurance glossary `, () => {
        pageControllers.clickOnTitle("auto insurance glossary");
        pageControllers.validatePageText("Auto insurance terms and definitions");
        cy.go('back');

      })

      it(`Validate related topics links `, () => {
        pageControllers.clickOnText("Nationwide’s SmartRide program rewards safe driving");
        pageControllers.validatePageText("Nationwide’s SmartRide program rewards safe driving");
        cy.go('back');

        pageControllers.clickOnText("Get Roadside Assistance and don't be stranded");
        pageControllers.validatePageText("Roadside Assistance");
        cy.go('back');


        pageControllers.clickOnText("Understand the parts of your policy");
        pageControllers.validatePageText("How to read & understand a car insurance policy");
        cy.go('back');

        pageControllers.clickOnText("Calculate your monthly auto loan payment.");
        pageControllers.validatePageText("Calculate your monthly auto loan payment");
        cy.go('back');


      })


        });
    });
});