class accountLoginPage {
   
    selectpersonalaccounttype(accountType) {     
        return cy.get('[id="loginType"]').select(accountType);
      }

      enterUserName(userName) {     
        return cy.get('[id="loginUsername"]').type(userName);
      }

      enterPassword(password)
      {
        return cy.get('[id="loginPassword"]').type(password);
      }

      clickButton(button)
      {
        return cy.get(`[id="${button}"]`).click();
        
      }

      expectedResult(expectedText)
      {
        return cy.xpath(`//*[contains(text(), "${expectedText}")]`);    
      }
    
      selectbusinessaccounttype(accountType) {             
        return cy.get('[id="busLoginType"]').select(accountType);
      }

      validatePageText(expectedText)
      {
        cy.contains(expectedText).should('be.visible');
      }


      clickforgotUsernamePassword()
      {
        return cy.get(`[id="forgotUsernamePassword"]`).click();
        
      }

      clicksignupLink()
      {
        return cy.get(`[id="signupLink"]`).click();
        
      }
      clickbsignupLink()
      {
        return cy.get(`[id="busSignupLink"]`).click();
        
      }

      clickpLPayYourBill()
      {
        return cy.xpath("(//*[@role='button'])[1]").click({ force: true });
        
      }
      clickbLPayYourBill()
      {
        return cy.xpath("(//*[@role='button'])[7]").click({ force: true });
        
      }
      clickbLWatchSelfVideo()
      {
        return cy.xpath("(//*[@role='button'])[8]").click({ force: true });
        
      }
      clicktrackClaim()
      {
        return cy.xpath("(//*[@role='button'])[4]").click({ force: true });
      }
      


    }

    module.exports = new accountLoginPage();