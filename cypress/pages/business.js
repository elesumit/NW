class businessPage {
   
    businessAgentLink() {     
        
        return cy.xpath('(//a[@href="https://agency.nationwide.com/search"])[1]')
        .invoke('removeAttr', 'target') // Remove any target attribute to prevent opening in a new tab
        .click();
      }
  
      farmAgentLink() {     
        return cy.xpath('(//a[@href="https://www.farmagentfinder.com/home/index"])[2]')  
        .invoke('removeAttr', 'target') // Remove any target attribute to prevent opening in a new tab
          .click();
      }
  
      clickStartQuote() {     
        return cy.xpath('//button[text()="Start your quote"]').click();
      }
      
      clickSeePartnerSolution() {     
        
        return cy.xpath('//*[text()="See partner solutions"]').click();
      }
      
    }
  
   module.exports = new businessPage();
  