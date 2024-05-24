

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
  describe('Validate Broken Links on Landing Page', () => {
  
    beforeEach(() => {
  
      cy.viewport(1280, 1000)
      cy.visit('https://www.nationwide.com/')
     
      
  
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

    it('Find agent broken link and validate', () => {
      cy.xpath('//*[@class="nw-text-sm find-an-agent-link"]').each(link => {
  
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })

    it('Find Insurance button broken links and validate', () => {
      cy.xpath('//*[@class="column small-12 large-4"]/a').each(link => {
  
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })

    it('Find business offer broken link and validate', () => {
      cy.xpath('//*[@class="nw-inline-on-medium cta-text"]/a').each(link => {
  
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
     
    it('Find footer social broken links and validate', () => {
      cy.xpath('//ul[@class="nw-footer__social"]/li/a').each(link => {
  
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })
      

    it('Find footer security broken links and validate', () => {
      cy.xpath('//*[@class="nw-footer-secondary-links column small-12 medium-6 large-6 small-order-2"]/p/a').each(link => {
  
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })
    
    it('Find footer third party broken links and validate', () => {
      cy.xpath('//*[@class="column small-12 medium-6 large-6 small-order-1 medium-order-2"]/p/a').each(link => {
  
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })

  })
  