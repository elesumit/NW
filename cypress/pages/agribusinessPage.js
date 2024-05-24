class agribusinessPage {
   
  click_RelatedtopicsResourcesLinks(linkText) {     
      
   
   cy.xpath(`//span[text()="${linkText}"]//parent::a`)
   
   .should('exist')
   .wait(5000) // Adjust timeout as needed
   .should('be.visible')
   .invoke('attr', 'target', '_self').click({force: true});
   //.invoke('removeAttr', 'target').click();
 
   
   }
      
    }
  
   module.exports = new agribusinessPage();
  