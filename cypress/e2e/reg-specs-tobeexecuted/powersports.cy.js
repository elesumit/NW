
import pageControllers from '../../pages/pageControllers.js';
import powersports from '../../pages/powersports.js';
const config = require('../../../config.json');

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


// Iterate over each viewport configuration
Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
  // Run Cypress tests with the current viewport settings
  describe(`Validate the personal & business login for various account types - ${viewportName}`, () => {
    beforeEach(() => {
      cy.visit(config.environments.baseURL + "/" + config.environments.powersports);
      if (viewportSetting.includes(':')) {
        // Custom viewport size specified
        const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
        cy.viewport(width, height);
      } else {
        // Predefined device name
        cy.viewport(viewportSetting);
      }
    });

    describe('Validate powersports insurance resources screen', () => {

      it(`Validate find agent button click `, () => {

        powersports.clickAgent("Find an agent");
        pageControllers.clickLink5("https://agency.nationwide.com/");
        pageControllers.validatePageText("Find local Nationwide Insurance Agencies near you");
        cy.go('back');
      })


      it(`Validate Boat resources broken links`, () => {

        pageControllers.clickOnText1("Cheap Boat Insurance");
        pageControllers.validatePageText("Cheap boat insurance");
        cy.go('back');

        pageControllers.clickOnText1("How much is sailboat insurance?");
        pageControllers.validatePageText("How much is sailboat insurance?");
        cy.go('back');

        pageControllers.clickOnText1("Boat caught in severe weather: What to do");
        pageControllers.validatePageText("What to do when caught in severe weather while boating");
        cy.go('back');


        pageControllers.clickOnText1("How much is boat insurance?");
        pageControllers.validatePageText("How much is boat insurance?");
        cy.go('back');

        pageControllers.clickOnText1("Do I need boat insurance?");
        pageControllers.validatePageText("Do I need boat insurance?");
        cy.go('back');

        pageControllers.clickOnText1("Watercraft insurance considerations");
        pageControllers.validatePageText("What boat insurance coverages do I need to consider?");
        cy.go('back');

      })

      it(`Validate Motorcycle resources broken links`, () => {

        pageControllers.clickOnText1("How much is motorcycle insurance?");
        pageControllers.validatePageText("How much does motorcycle insurance cost?");
        cy.go('back');

        pageControllers.clickOnText1("Do you need motorcycle insurance?");
        pageControllers.validatePageText("When do you need motorcycle insurance?");
        cy.go('back');

        pageControllers.clickOnText1("Can my motorcycle be insured?");
        pageControllers.validatePageText("Nationwide insures many types of motorcycles");
        cy.go('back');


        pageControllers.clickOnText1("Prepping for motorcycle group rides");
        pageControllers.validatePageText("Motorcycle group riding safety tips");
        cy.go('back');

        pageControllers.clickOnText1("Motorcycle maintenance checklist");
        pageControllers.validatePageText("8 motorcycle maintenance tasks you should be doing");
        cy.go('back');

        pageControllers.clickOnText1("How to buy a motorcycle helmet");
        pageControllers.validatePageText("How to find the right motorcycle helmet for you");
        cy.go('back');

        pageControllers.clickOnText1("Motorcycle buying guide");
        pageControllers.validatePageText("Your complete guide to buying a motorcycle");
        cy.go('back');

        pageControllers.clickOnText1("How to buy a used motorcycle");
        pageControllers.validatePageText("Consider a few things before purchasing a used motorcycle");
        cy.go('back');

      })



      it(`Validate Powersports resources broken links`, () => {

        
        pageControllers.clickOnText1("How much is scooter/moped insurance?");
        pageControllers.validatePageText("How much is scooter / moped insurance?");
        cy.go('back');

        pageControllers.clickOnText1("Do I need scooter insurance?");
        pageControllers.validatePageText("How much is ATV insurance?");
        cy.go('back');

        pageControllers.clickOnText1("How much is ATV insurance?");
        pageControllers.validatePageText("How much is ATV insurance?");
        cy.go('back');

        pageControllers.clickOnText1("How much is Jet Ski insurance?");
        pageControllers.validatePageText("How much is Jet Ski® insurance?");
        cy.go('back');

        pageControllers.clickOnText1("Understanding ATV insurance");
        pageControllers.validatePageText("What are a few things to consider when purchasing ATV insurance?");
        cy.go('back');


        pageControllers.clickOnText1("Personal watercraft coverage tips");
        pageControllers.validatePageText("5 things to know about personal watercraft insurance coverage");
        cy.go('back');

        pageControllers.clickOnText1("Why get Segway insurance?");
        pageControllers.validatePageText("Segway riding risks & insurance tips");
        cy.go('back');

        pageControllers.clickOnText1("ATVs vs UTVs");
        pageControllers.validatePageText("What is the difference between an ATV and UTV?");
        cy.go('back');

      })



      it(`Validate RV resources broken links`, () => {

        
        pageControllers.clickOnText1("Do I need RV insurance?");
        pageControllers.validatePageText("Is RV insurance required?");
        cy.go('back');

        pageControllers.clickOnText1("How much is RV insurance?");
        pageControllers.validatePageText("How much is RV insurance?");
        cy.go('back');



      })

    });

  });
});


