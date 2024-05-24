// baseUrlLauncher.js
function launchBaseUrl(config, personalInsurancePath) {
    Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
      // Run Cypress tests with the current viewport settings
      describe(`Validate the personal & business login for various account types - ${viewportName}`, () => {
        beforeEach(() => {
          cy.visit(config.environments.baseURL + "/" + personalInsurancePath);
          if (viewportSetting.includes(':')) {
            // Custom viewport size specified
            const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
            cy.viewport(width, height);
          } else {
            // Predefined device name
            cy.viewport(viewportSetting);
          }
        });
      });
    });
  };
  
  module.exports = { launchBaseUrl };