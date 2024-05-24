/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Mobile Responsibility', () => {
  
 
    it('Run mobile Responsibility- Windows desktop', () => {

      cy.viewport(1280, 1000)
      cy.visit('https://www.nationwide.com/')
     })

     it('Run mobile Responsibility-ipad-mini', () => {
      
      cy.visit('https://www.nationwide.com/')
      cy.viewport('ipad-mini')
     })
      
     it('Run mobile Responsibility-iphone-xr', () => {
      
      cy.visit('https://www.nationwide.com/')
      cy.viewport('iphone-xr')
     })

})

