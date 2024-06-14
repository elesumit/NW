//import billPayPage from '../../pages/billPayPage'
import pageControllers from '../../pages/pageControllers.js';
//import utils from '../../support/utils.js';

const config = require('../../../config.json');

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


// Iterate over each viewport configuration
Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
  // Run Cypress tests with the current viewport settings
  describe(`Validate the personal & business login for various account types - ${viewportName}`, () => {
    beforeEach(() => {
      cy.visit(config.environments.baseURL + "/" + config.environments.billPay);
      if (viewportSetting.includes(':')) {
        // Custom viewport size specified
        const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
        cy.viewport(width, height);
      } else {
        // Predefined device name
        cy.viewport(viewportSetting);
      }
    });

    describe('Validate bill pay screen', () => {

   


      it(`Validate vehicle and property insurance bill`, () => {

        pageControllers.clickOnText1("Log in to pay your bill");
        pageControllers.clickLink1("https://login.nationwide.com/access/web/login.htm");
        pageControllers.validatePageText("Login for Insurance & Investments");
        cy.go('back');

        pageControllers.clickOnText1("Mobile App support");
        pageControllers.validatePageText("Nationwide Mobile app");
        cy.go('back');

      })

      it(`Validate life insurance premium links`, () => {

        pageControllers.clickOnText1("Pay without logging in");
        pageControllers.clickLink1("https://myservicing.nationwide.com/#/personal/quickpay/search");
        pageControllers.validatePageText("Welcome to Quick Pay");
        cy.go('back');

        pageControllers.clickOnText1("Life insurance premium");
        pageControllers.clickOnText2("Log in to pay your bill");
        pageControllers.clickLink1("https://login.nationwide.com/access/web/login.htm");
        pageControllers.validatePageText("Login for Insurance & Investments");
        cy.go('back');

      })

      it(`Validate business insurance bill`, () => {

        pageControllers.clickOnText1("Log in/sign up to pay your bill");
        pageControllers.clickLink1("https://login.nationwide.com/access/web/login-commercial.htm");
        pageControllers.validatePageText("Login for Business Insurance");
        cy.go('back');

      })


      //5/8 - Not working
      // it(`Validate Harleysville insurance `, () => {

      //   pageControllers.clickOnText1("Harleysville insurance");
      //   pageControllers.clickOnText1("Make a secure, one-time payment");
      //   pageControllers.clickLink1("https://webpayments.billmatrix.com/nationwide");
      //   pageControllers.validatePageText(" Welcome to the online bill payment system for Nationwide.");
      //   cy.window().then((win) => {
      //     win.history.back();
      //   });

        //5/7 - Go back not working
        // pageControllers.clickOnText1("National Flood Services");
        // pageControllers.clickLink1("https://www.myflood.com/");
        // pageControllers.validatePageText("For assistance in accessing your policy, please contact 1-800-637-3846");
        // cy.go('back');

        // 5/7 - PDF validation is pending
        //     pageControllers.clickOnTitle("EFT form opens in a new window");
        //     pageControllers.clickLink1("/staticassets/Z-1484-Online-Application-for-electronic-signature_2_tcm108-31903.pdf");
        //   //  pageControllers.validatePageText("For assistance in accessing your policy, please contact 1-800-637-3846");
        //     cy.go('back');

        //     pageControllers.clickOnTitle("PAC opens in a new window");
        //     pageControllers.clickLink1("/staticassets/life-pac-form_2_tcm108-57297.pdf");
        // //    pageControllers.validatePageText("For assistance in accessing your policy, please contact 1-800-637-3846");
        //     cy.go('back');

    //  })

       //6/4 - below 2 tc are covered in master file 
      // it(`Validate personal insurance bill`, () => {

      //   pageControllers.clickOnTitle("Learn more about the ways to pay your personal insurance bills");
      //   pageControllers.validatePageText("How would you like to pay us?");
      //   cy.go('back');
      //   pageControllers.clickOnText1("Pay now");
      //   pageControllers.clickLink1("https://myservicing.nationwide.com/#/personal/quickpay/search");
      //   pageControllers.validatePageText("Welcome to Quick Pay");
      //   cy.go('back');

      // })

      // it(`Validate commerical insurance bill`, () => {

      //   pageControllers.clickOnTitle("Learn more about the ways to pay your commercial insurance bills");
      //   pageControllers.validatePageText("Ways to pay your Nationwide commercial insurance bill");
      //   cy.go('back');

      //   pageControllers.clickOnText2("Pay now");
      //   pageControllers.clickLink1("https://commercialservicing.nationwide.com/commercial/#/quickPay/search");
      //   pageControllers.validatePageText("Make a payment");
      //   cy.go('back');

      // })


    });

  });
});


