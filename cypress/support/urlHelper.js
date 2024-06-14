// cypress/support/urlHelper.js
export function getURL(viewportSetting, environmentURL, extensionURL) {
    cy.log(`Environment URL: ${environmentURL}`);
    cy.log(`Extension URL: ${extensionURL}`);

    const fullURL = `${environmentURL}/${extensionURL}`;
    cy.log(`Visiting URL: ${fullURL}`);

    // Visit the dynamically constructed URL
    cy.visit(fullURL);

    // Set viewport if specified
    if (viewportSetting.includes(':')) {
        // Custom viewport size specified
        const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
        cy.viewport(width, height);
    } else {
        // Predefined device name
        cy.viewport(viewportSetting);
    }

    return cy.url();
}
