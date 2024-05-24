class landingPage {
   
  externalLinks() {     
      
      return cy.xpath('//ul[@slot="external-links"]/li/a');
    }
    agentLinks() {
      return cy.xpath(`//*[@class="nw-text-sm find-an-agent-link"]`);
    }
    
    insuranceLinks() {
      return cy.xpath(`//*[@class="column small-12 large-4"]/a`);
    }
      

    businessOfferLinks() {
      return cy.xpath(`//*[@class="nw-inline-on-medium cta-text"]/a`);
    }
    
    footerHeaderLinks() {
      return cy.xpath(`//div[@class="nw-outer-bottom"]/a`);
    }

    footerBusinessPartnersLinks() {
      return cy.xpath(`//span[@class="business-partners-links"]/a`);
    }
    
    footerSocialMediaLinks() {
      return cy.xpath(`//ul[@class="nw-footer__social"]/li/a`);
    }
    

    footerSecurityLinks() {
      return cy.xpath(`//*[@class="nw-footer-secondary-links column small-12 medium-6 large-6 small-order-2"]/p/a`);
    }
    

    footerThirdPartyLinks() {
      return cy.xpath(`//*[@class="column small-12 medium-6 large-6 small-order-1 medium-order-2"]/p/a`);
    }

    selectQuoteType(QuoteType) {             
      return cy.get('[id="customSelectQuote"]').select(QuoteType);
    }

    enterQuoteZip(zip) {     
      return cy.get('[id="detail-banner__zip-input"]').type(zip);
    }
    getQuoteZip() {     
      return cy.get('[id="detail-banner__zip-input"]');
    }

  clickStartYourQuote() {             
      return cy.get('[id="detail-banner__quote-btn"]').click();
    }
      enterSearch1(input) {             
        return cy.get('[id="yxt-SearchBar-input--search-bar-1"]').type(input);
      }
    clickSearch() {             
      return cy.get('button.js-yext-submit.yxt-SearchBar-button').click();
    }

    clickLogin() {             

      return cy.xpath("//*[@id='header']/div[3]/bolt-button") 
      .shadow() 
      .find('a') 
      .invoke('attr', 'target', '_self').click({force: true});

    }


    enterSearch(button)
    {
      return cy.get(`[id="yxt-SearchBar-input--search-bar-1"]`).type(button);
      
    }
    
  }

 module.exports = new landingPage();

 