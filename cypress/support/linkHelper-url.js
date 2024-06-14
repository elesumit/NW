// cypress/support/linkHelper.js
const pageControllers = require('../../pages/pageControllers.js');

export function handleLinkValidation(childRows, currentPageUrl) {
    childRows.forEach((childRow) => {
        cy.log(childRow['expectedUrl'], childRow['condition']);

        // Get the XPath for the given condition and link
        const xpath = pageControllers.getXPath(childRow['condition'], childRow['linkText']);

        // Click the link using the generic click function
        if (xpath) {
            pageControllers.clickLink(xpath);
            cy.wait(2000);

            // Validate the URL of the screen after clicking the link
            cy.url().should('include', childRow['expectedUrl']);
            
            cy.visit(currentPageUrl);
        } else {
            cy.log(`No matching XPath for condition: ${childRow['condition']}`);
        }
    });
}

