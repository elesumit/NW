import personalInsurancePage from '../../pages/personalInsurance.js';
import pageControllers from '../../pages/pageControllers.js';
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
            cy.visit(config.environments.baseURL + "/" + config.environments.quoteRetrieval);
            if (viewportSetting.includes(':')) {
                // Custom viewport size specified
                const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
                cy.viewport(width, height);
            } else {
                // Predefined device name
                cy.viewport(viewportSetting);
            }
        });

        describe('Validate Quote Retrieval page', () => {

            it('Validate error message when zipcode field is blank', () => { 
              pageControllers.type1("quoteNumber","323-232-232"); 
              pageControllers.type1("businessOwnerLastName","Gupta"); 
              pageControllers.clickOnId("retrieve-bp-quote-submit");
              pageControllers.validatePageText("Please check the information below and try again. You have missed the following fields: Zip code.");
              pageControllers.validatePageText("Enter your 5- or 9-digit Zip Code.");
              });
              
              it('Validate error message when business owner last name is blank', () => { 
                pageControllers.type1("quoteNumber","323-232-232");
                pageControllers.type1("zipCode","32771"); 
                pageControllers.clickOnId("retrieve-bp-quote-submit");
                pageControllers.validatePageText("Please check the information below and try again. You have missed the following fields: Business owner's last name.");
                pageControllers.validatePageText("Last name is required.");
                });

                it('Validate error message when quote number is blank', () => { 
                  pageControllers.type1("businessOwnerLastName","Gupta"); 
                  pageControllers.type1("zipCode","32771")
                  pageControllers.clickOnId("retrieve-bp-quote-submit");
                  pageControllers.validatePageText("Please check the information below and try again. You have missed the following fields: Quote number.");
                  pageControllers.validatePageText("Quote number is required.");
                  });
            
                  it('Validate error message when quote number is invalid', () => { 
                    pageControllers.type1("quoteNumber","3232");
                    pageControllers.type1("businessOwnerLastName","Gupta"); 
                    pageControllers.type1("zipCode","32771")
                    pageControllers.clickOnId("retrieve-bp-quote-submit");
                    pageControllers.validatePageText("Please check the information below and try again. You have missed the following fields: Quote number.");
                    pageControllers.validatePageText("Quote number must contain dashes.");
                    });

                    it('Validate error message when quote number is not available', () => { 
                      pageControllers.type1("quoteNumber","323-232-232");
                      pageControllers.type1("businessOwnerLastName","Gupta"); 
                      pageControllers.type1("zipCode","32771")
                      pageControllers.clickOnId("retrieve-bp-quote-submit");
                      pageControllers.validatePageText("We cannot locate a quote associated with this information. Please check the information below and try again.");
                      
                      });
  

            it(`Validate Start a new Quote button `, () => {
                pageControllers.clickContainsText("Or start a new business quote");
                pageControllers.validatePageText(" Thanks for choosing Nationwide - Start your quote ");
                cy.go('back');


            })

            it(`Validate retrieve your Quote link`, () => {
              pageControllers.clickContainsText("Retrieve your quote now.");
              pageControllers.clickLink1("https://multiproduct.nationwide.com/retrieve");
              pageControllers.validatePageText("Retrieve a Quote");
              cy.go('back');


          })


           


        });
    });
});