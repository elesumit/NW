class pageControllers {
   
  clickOnText(propertyValue)
  {    
    return cy.xpath(`//*[text()="${propertyValue}"]`).click();  
  }

  clickOnText1(propertyValue)
  {    
    return cy.xpath(`(//*[text()='${propertyValue}'])[1]`).click({ force: true });
  }

  clickOnText2(propertyValue)
  {    
    return cy.xpath(`(//*[text()='${propertyValue}'])[2]`).click({ force: true });

  }

  clickOnText3(propertyValue)
  {    

    return cy.xpath(`(//*[text()='${propertyValue}'])[3]`).click();

  }

  clickContainsText(propertyValue)
  { 
    return cy.xpath(`//*[contains(text(), "${propertyValue}")]`).click();    
  }  

  clickOnTitle(propertyValue)
  {    
    return cy.xpath(`//*[@title="${propertyValue}"]`).click();  
  }

  clickOnId(propertyValue)
  {    

    return cy.xpath(`//*[@id="${propertyValue}"]`) 
    .shadow() 
    .find('button') 
    .click({ force: true }); // Click the button

  }

  clickOnQuoteButton(propertyValue)
  {       
    return cy.xpath(`(//*[@id="${propertyValue}"]/div/div/input)[1]`).click();


  }

  type(property, value) {   
    return cy.xpath(`//*[contains(text(), "${property}")]`).type(value);
  }
    

  type1(property, value) {   
    return cy.xpath(`//*[@name="${property}"]`)
    .shadow()
    .find('input') 
    .type(value); 
  }


  selectShadowElement(property, value) {   
    return cy.xpath(`//*[@id="${property}"]`)
    .shadow()
    .find('select') 
    .select(value);
  }


  clickLink1(linkURL) {     
    cy.window().then(win => {
      cy.on('window:confirm', () => true); // Always confirm opening a new tab
  
      cy.xpath(`(//a[@href="${linkURL}"])[1]`)
      .should('exist')
      .wait(5000) // Adjust timeout as needed
      .should('be.visible')
     // .should('be.enabled')
     //.invoke('attr', 'target', '_self').click({force: true});
      .invoke('removeAttr', 'target') // Remove any target attribute to prevent opening in a new tab
      .click({ force: true }); // Use { force: true } to forcefully click even if covered by other elements
    });
  }

  clickLink2(linkURL) {     
      
    cy.xpath(`(//a[text()="${linkURL}"])[1]`)
  .should('exist')
  .wait(5000) // Adjust timeout as needed
  .should('be.visible')
 //.invoke('attr', 'target', '_self').click({force: true});
  .invoke('removeAttr', 'target').click({force: true});;
  }


  clickLink3(linkURL) {     
      
        cy.xpath(`(//*[text()="${linkURL}"])[1]//parent::a`)
      .should('exist')
      .wait(5000) // Adjust timeout as needed
      .should('be.visible')
     // .invoke('attr', 'target', '_self').click({force: true});
      .invoke('removeAttr', 'target').click({force: true});;
    
      
      }


      clickLink4(linkURL) {     

       // cy.xpath(`(//*[text()="${linkURL}"])[1]//parent::a`)

        cy.xpath(`//a[h5[contains(text(), "${linkURL}")]]`)
        .should('exist')
        .wait(5000) // Adjust timeout as needed
        .should('be.visible')
       // .invoke('attr', 'target', '_self').click({force: true});
        .invoke('removeAttr', 'target').click({force: true});;
    
      }

  clickLink5(linkURL) {     
    cy.window().then(win => {
      cy.on('window:confirm', () => true); // Always confirm opening a new tab
  
      cy.xpath(`(//a[@href="${linkURL}"])[5]`)
      .should('exist')
      .wait(5000) 
      .should('be.visible')
     
      .invoke('removeAttr', 'target') // Remove any target attribute to prevent opening in a new tab
      .click({ force: true }); // Use { force: true } to forcefully click even if covered by other elements
    });
  }
  
  clickShadowElement() {             

    return cy.xpath("//*[@id='header']/div[3]/bolt-button") 
    .shadow() 
    .find('a') 
    .invoke('attr', 'target', '_self').click({force: true});

  }
        validatePageText(expectedText)
      {
        cy.contains(expectedText).should('be.visible');
      }
      
      selectDropdownOption(menu, option) {     
        return cy.get(`[id="${menu}"]`).select(option);
    }
    

    //**** New 5/21 */
    // Generic click function
clickLink(xpath) {
  cy.xpath(xpath)
      .should('exist')
      .wait(5000) // Adjust timeout as needed
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .click({ force: true });
};

// Mapping conditions to XPath expressions
getXPath(condition, linkURL) {
  const xpathMap = {
      'ParentLink': `(//*[text()="${linkURL}"])[1]//parent::a`,
      'DirectLink': `(//a[text()="${linkURL}"])[1]`,
      'ContainsTextLink': `//a[h5[contains(text(), "${linkURL}")]]`,
      'NormalizeTextLink' : `//a[.//h2[text()="${linkURL}"]]`,
      'DirectLink2': `(//a[text()="${linkURL}"])[2]`,
      'DirectLink3': `(//a[text()="${linkURL}"])[3]`,
      
  };
  return xpathMap[condition];
}


    }

    module.exports = new pageControllers();