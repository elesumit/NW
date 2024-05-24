class powerSports {
   
 
      clickAgent(propertyValue)
      { 
            return cy.xpath(`(//*[contains(text(), "${propertyValue}")])[5]`).click();
      } 
}
  

      module.exports = new powerSports();