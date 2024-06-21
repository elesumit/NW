// cypress/support/quoteHelper.js
const pageControllers = require('../../cypress/pages/pageControllers.js');

 function handleQuote(childRows, currentPageUrl) {
   // childRows.forEach((childRows) => {
        cy.log(childRows['productType'], childRows['zipCode']);

        const zip = pageControllers.getZipCode(childRows['pageName'], childRows['zipElement']);
        const quote = pageControllers.getQuote(childRows['getQuoteButtonReference'], childRows['quoteButton']);
        const dropdownMenu = childRows['dropdownMenu'];

        pageControllers.selectDropdownOption(dropdownMenu, childRows['insuranceType']);

        if (childRows['zipCode'] !== '' && childRows['zipCode'] !== undefined) {
            pageControllers.enterZip(zip, childRows['zipCode']);
            pageControllers.clickQuote(quote);
            pageControllers.validatePageText(childRows['expectedText']);
            cy.visit(currentPageUrl);
        } else {
            pageControllers.clickQuote(quote);
            pageControllers.validatePageText(childRows['expectedText']);
            cy.visit(currentPageUrl);
        }
   // });
}
module.exports = handleQuote;