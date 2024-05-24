Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
  describe('Validate Broken Links', () => {
  
    beforeEach(() => {
  
      cy.viewport(1280, 1000)
      cy.visit('https://www.nationwide.com/')
  
    })
  
    it('Find Vehicle product broken links and validate', () => {
  
      cy.xpath('//button[text()="Vehicle"]').click();
  
      cy.xpath('//ul[@class="bolt-text-columns-3"]/li/a').each(link => {
  
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })
    it('Find Business partners broken links and validate', () => {
      cy.xpath('//span[@class="business-partners-links"]/a').each(link => {
  
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })
      it('Find external broken links and validate', () => {
      cy.xpath('//ul[@slot="external-links"]/li/a').each(link => {
  
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })
      it('Find footer header broken links and validate', () => {
      cy.xpath('//div[@class="nw-outer-bottom"]/a').each(link => {
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })
    

    it('Find insurance broken links and validate', () => {
      cy.xpath('//*[@class="column small-12 large-4"]/a').each(link => {
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })
  
  })
  