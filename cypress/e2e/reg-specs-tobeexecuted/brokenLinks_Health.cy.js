import landingPage from '../../pages/landingPage.js'
import productsPage from '../../pages/productsPage.js';
import utils from '../../support/utils.js';
const config = require('../../../config.json');

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
  // Iterate over each viewport configuration
  Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
    // Run Cypress tests with the current viewport settings
    describe(`Validate the personal & business login for various account types - ${viewportName}`, () => {
      beforeEach(() => {
        cy.visit(config.environments.baseURL + "/" + config.environments.landingPage);
        if (viewportSetting.includes(':')) {
          // Custom viewport size specified
          const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
          cy.viewport(width, height);
        } else {
          // Predefined device name
          cy.viewport(viewportSetting);
        }
      });
  
   // external link validation
   
    it('Find external broken links and validate', () => {  
      
      landingPage.externalLinks().each(link => {

        if (link.prop('href'))
          cy.request({
            url: link.prop('href'),
            failOnStatusCode: false
          })
  
        cy.log( link.prop('href'))
  
      })

  
     //agent link validation
     
    it('Find agent broken link and validate', () => {
     
    landingPage.agentLinks().each(link => {

        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })
  })
    // Insruance  link
    it('Find Insurance button broken links and validate', () => {
   //   cy.xpath('//*[@class="column small-12 large-4"]/a').each(link => {
  
      landingPage.insuranceLinks().each(link => {
        if (link.prop('href'))
          cy.request({
            url: link.prop('href'),
            failOnStatusCode: false
          })
        cy.log( link.prop('href'))
      })
    })

    // business offer links
    it('Find business offer broken link and validate', () => {
      //cy.xpath('//*[@class="nw-inline-on-medium cta-text"]/a').each(link => {
  
      landingPage.businessOfferLinks().each(link => {
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })

    //footer header links
    it('Find footer header broken links and validate', () => {
//      cy.xpath('//div[@class="nw-outer-bottom"]/a').each(link => {

      landingPage.footerHeaderLinks().each(link => {
        if (link.prop('href'))
          cy.request({
            url: link.prop('href'),
            failOnStatusCode: false
          })
        cy.log( link.prop('href'))
      })
    })

   // footer business partner link
    it('Find Business partners broken links and validate', () => {
      //cy.xpath('//span[@class="business-partners-links"]/a').each(link => {
  
      landingPage.footerBusinessPartnersLinks().each(link => {
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })
     
    //footer social media links
    it('Find footer social broken links and validate', () => {
      //cy.xpath('//ul[@class="nw-footer__social"]/li/a').each(link => {
   landingPage.footerSocialMediaLinks().each(link => {
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })
      
    //footer security links
    it('Find footer security broken links and validate', () => {
      //cy.xpath('//*[@class="nw-footer-secondary-links column small-12 medium-6 large-6 small-order-2"]/p/a').each(link => {
  
      landingPage.footerSecurityLinks().each(link => {
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })
    
    //footer third party links
    it('Find footer third party broken links and validate', () => {
     // cy.xpath('//*[@class="column small-12 medium-6 large-6 small-order-1 medium-order-2"]/p/a').each(link => {
  
      landingPage.footerThirdPartyLinks().each(link => {
        if (link.prop('href'))
  
          cy.request({
  
            url: link.prop('href'),
  
            failOnStatusCode: false
  
          })
  
        cy.log( link.prop('href'))
  
      })
    })

     

     //Axe Scan on Landing Page
    //  it('Axe scan on landing page', () => {

    //                 utils.runAxeScan();
    //        });
      
  });
})
  