import productsPage from '../../pages/productsPage.js';
import utils from '../../support/utils.js';

const config = require('../../../config.json');

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});


// Iterate over each viewport configuration
Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
    // Run Cypress tests with the current viewport settings
    describe(`Validate the all products - ${viewportName}`, () => {
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

describe('Broken link and title validation', () => {
    //TC#1 - Vehicle Products page validation
    it('Vehicle products broken link and title of the displayed page validation', () => {

        //utils.launchURL();
        productsPage.elementVehiclebutton().click();
        productsPage.elementVehiclelink().then(($lis) => {
            const liCount = $lis.length;
            cy.log(`Number of li elements: ${liCount}`);
            $lis.each((liIndex) => {
                productsPage.vehicleProductPathIndex1(liIndex).click({ force: true });
                utils.validateLinkAndTitle();
                productsPage.elementVehiclebutton().click();
                if (liIndex < liCount - 1) {
                    productsPage.vehicleProductPathIndex2(liIndex).click();
                }
                // utils.runAxeScan();
            });
        });
    });

    //TC#2 - Property Products page validation
     it('Property products broken link and title of the displayed page validation', () => {

 //   utils.launchURL();
    productsPage.elementpropertybutton().click();
    productsPage.elementpropertylink().then(($lis) => {
        const liCount = $lis.length;
        cy.log(`Number of li elements: ${liCount}`);
        $lis.each((liIndex) => {
            productsPage.propertyProductPathIndex1(liIndex).click({force: true});
            utils.validateLinkAndTitle();
            productsPage.elementpropertybutton().click();
            if (liIndex < liCount - 1) {
                productsPage.propertyProductPathIndex2(liIndex).click();
            }
            // utils.runAxeScan();
        });
    });


});
});

});
});