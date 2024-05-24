class personalAuto {
   
       

      zipCode(property,value) {   
           

            return cy.xpath(`//div[@id="${property}"]/div/div/div/div/input`).type(value), { force: true };
          }


      clickOnQuote(property)
      {    
            return cy.xpath(`//div[@id="${property}"]/div/div/input`).click(); 
      }

      clickAgent(propertyValue)
      { 
            return cy.xpath(`(//*[contains(text(), "${propertyValue}")])[6]`).click();
      } 
}
  

      module.exports = new personalAuto();