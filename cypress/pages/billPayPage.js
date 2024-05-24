class billPayPage {
   
      clickLearnMorePi()
      {
        
        return cy.xpath("(//*[contains(text(),'Learn more')])[1]").click();
      }

      clickPayNowPi()
      {
        
        return cy.xpath("(//*[contains(text(),'Pay now')])[1]").click();
      }
      clickLearnMoreCi()
      {
        
        return cy.xpath("(//*[contains(text(),'Learn more')])[2]").click();
        
      }
      
      clickPayNowCi()
      {        
        return cy.xpath("(//*[contains(text(),'Pay now')])[2]").click();
       }

      clickLoginbi()
      {
        
        return cy.xpath("//*[contains(text(),'Log in/sign up to pay your bill')]").click();
        
      }

      clickLoginvi()
      {
        
        return cy.xpath("(//*[contains(text(),'Log in to pay your bill')])[1]").click();
        
        
      }
      clickMobileAppSupport()
      {        
        return cy.xpath("//*[contains(text(), 'Mobile App support')]").click();        
        
      }
      expectedResult(expectedText)
      { 
        return cy.xpath(`//*[contains(text(), "${expectedText}")]`);    
      }
    
      validatePageText(expectedText)
      {
        cy.contains(expectedText).should('be.visible');
      }

    }

    module.exports = new billPayPage();