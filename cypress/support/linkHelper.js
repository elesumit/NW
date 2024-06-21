// cypress/support/linkHelper.js

const pageControllers = require('../../cypress/pages/pageControllers.js');

 function handleLinkValidation(childRows, currentPageUrl) {
   // childRows.forEach((childRows) => {
       // cy.log(childRows['expectedURL'], childRows['condition']);

        // Get the XPath for the given condition and link
        const xpath = pageControllers.getXPath(childRows['condition'], childRows['linkText']);

        // Click the link using the generic click function
        if (xpath) {
            pageControllers.clickLink(xpath);
            cy.wait(2000);
            //cy.contains(childRows['expectedText']).should('be.visible');

            cy.url().then((url) => {
                cy.title().then((title) => {
                 if (url==childRows['expectedURL'])
                  cy.title().should('eq', childRows['expectedTitle']);

                
                 
                });
              });

            cy.visit(currentPageUrl);
        } else {
            cy.log(`No matching XPath for condition: ${childRows['condition']}`);
        }
   // });
}
module.exports = handleLinkValidation;