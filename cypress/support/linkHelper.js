// cypress/support/linkHelper.js
//const pageControllers = require('../../pages/pageControllers.js');

const pageControllers = require('../../cypress/pages/pageControllers.js');

export function handleLinkValidation(childRows, currentPageUrl) {
    childRows.forEach((childRow) => {
        cy.log(childRow['expectedText'], childRow['condition']);

        // Get the XPath for the given condition and link
        const xpath = pageControllers.getXPath(childRow['condition'], childRow['linkText']);

        // Click the link using the generic click function
        if (xpath) {
            pageControllers.clickLink(xpath);
            cy.wait(2000);
            cy.contains(childRow['expectedText']).should('be.visible');
            cy.visit(currentPageUrl);
        } else {
            cy.log(`No matching XPath for condition: ${childRow['condition']}`);
        }
    });
}
