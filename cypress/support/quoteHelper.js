// cypress/support/quoteHelper.js
const pageControllers = require('../../cypress/pages/pageControllers.js');

export function handleQuote(childRows, currentPageUrl) {
    childRows.forEach((childRow) => {
        cy.log(childRow['productType'], childRow['zipCode']);

        const zip = pageControllers.getZipCode(childRow['pageName'], childRow['zipElement']);
        const quote = pageControllers.getQuote(childRow['getQuoteButtonReference'], childRow['quoteButton']);
        const dropdownMenu = childRow['dropdownMenu'];

        pageControllers.selectDropdownOption(dropdownMenu, childRow['insuranceType']);

        if (childRow['zipCode'] !== '' && childRow['zipCode'] !== undefined) {
            pageControllers.enterZip(zip, childRow['zipCode']);
            pageControllers.clickQuote(quote);
            pageControllers.validatePageText(childRow['expectedText']);
            cy.visit(currentPageUrl);
        } else {
            pageControllers.clickQuote(quote);
            pageControllers.validatePageText(childRow['expectedText']);
            cy.visit(currentPageUrl);
        }
    });
}
