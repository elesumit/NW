import accountLoginPage from '../../pages/accountLoginPage.js'
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
          cy.visit(config.environments.baseURL + "/" + config.environments.accLogin);
          if (viewportSetting.includes(':')) {
            // Custom viewport size specified
            const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
            cy.viewport(width, height);
          } else {
            // Predefined device name
            cy.viewport(viewportSetting);
          }
        });
    
        describe('Validate account login screen', () => {   
      it('Validate login without entering password', () => {   
                   
        accountLoginPage.selectpersonalaccounttype("Insurance");
        accountLoginPage.enterUserName("Insurance");
       accountLoginPage.clickButton("loginButton");
       accountLoginPage.expectedResult("Enter your password").should('have.text', "Enter your password");
       
      })


      it('Validate login without entering username', () => {   
                  
        accountLoginPage.selectpersonalaccounttype("Insurance");
        accountLoginPage.enterPassword("Password");
       accountLoginPage.clickButton("loginButton");
       accountLoginPage.expectedResult("Enter your username").should('have.text', "Enter your username");
       
      })
  
      
      it('Validate business login for business insurance type', () => {     
        
       accountLoginPage.selectbusinessaccounttype("Business insurance");
       accountLoginPage.clickButton("busLoginbutton");
       accountLoginPage.validatePageText("Login for Business Insurance");
      
      })

      it('Validate business Pay your bill page', () => { 
      
        accountLoginPage.clickbLPayYourBill();
        accountLoginPage.expectedResult("Make a payment");
        
      })
      
      //5/7 - Page not loading - HTTP Status 400 – Bad Request 
      it('Validate businss - view self help video page', () => { 
        accountLoginPage.selectbusinessaccounttype("Business insurance");
        accountLoginPage.clickbLWatchSelfVideo();
        accountLoginPage.expectedResult("Business Insurance Member Resources");
       })

       
       it('Validate personal account type page', () => {     
      
        accountLoginPage.selectpersonalaccounttype("Insurance");
        accountLoginPage.clickforgotUsernamePassword();
        accountLoginPage.expectedResult("Forgot username/password");
        cy.go('back');
        accountLoginPage.selectpersonalaccounttype("Insurance");
        accountLoginPage.clicksignupLink();
        accountLoginPage.expectedResult("Sign up for online access");
        cy.go('back');
        accountLoginPage.selectpersonalaccounttype("Insurance");
        accountLoginPage.clickpLPayYourBill();
        accountLoginPage.expectedResult("Welcome to Quick Pay");
        cy.go('back');
        accountLoginPage.selectpersonalaccounttype("Insurance");
        accountLoginPage.clicktrackClaim();
        accountLoginPage.expectedResult("Track Your Claim");
       

        })



    });
  });
});

  
