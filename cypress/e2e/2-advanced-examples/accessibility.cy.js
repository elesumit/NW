/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Accessibility', () => {
  
 
    it('Run accessibility', () => {

      cy.viewport(1280, 1000)
      cy.visit('https://www.nationwide.com/')
      
      cy.xpath('//*[text()="Accept"]').click();
        
      
      cy.injectAxe()
      cy.checkA11y()

      cy.injectAxe()
      // cy.checkA11y()

      cy.checkA11y(null, {
       includedImpacts: ['critical', 'serious']
     })


//     cy.checkA11y('#column small-12 large-4');

})

})
