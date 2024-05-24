class personalInsurancePage {
   
       

      zipCode(property,value) {   
            return cy.xpath(`//input[@aria-describedby="${property}"]`).type(value), { force: true };
          }


      clickOnQuote(property)
      {    
            return cy.xpath(`//div[@id="${property}"]/div/div/button`).click();
      }
}
  

      module.exports = new personalInsurancePage();