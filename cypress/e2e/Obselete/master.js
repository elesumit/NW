const { exec } = require('child_process');
const { readCsvrows, readCsv } = require('../../support/util1.js');
const config = require('../../../config.json');


    readCsvrows('cypress/fixtures/master.csv').then((csvData) => {
      csvData.forEach(row => {
        //const { Scenario, specname, execution, objType, childCsvPath } = row;

        const { Scenario, baseURL, URLextension, specname, execution, objType, childCsvPath } = row;

        if (execution === 'yes') {


          const specFile = `cypress/e2e/POC/${specname}.cy.js`;

          const environmentURL = config.environments[baseURL];
          const extensionURL = config.environments[URLextension];

          // Log the environmentURL, extensionURL to debug
          cy.log(`Environment URL: ${environmentURL}`);
          cy.log(`Extension URL: ${extensionURL}`);

          const fullURL = `${environmentURL}/${extensionURL}`;
          cy.log(`Visiting URL: ${fullURL}`);

          // Visit the dynamically constructed URL
          cy.visit(fullURL);

          // Get the viewport setting from the config file
          const viewportSetting = config.viewPorts.default;

          // Set viewport if specified
          if (viewportSetting) {
            if (viewportSetting.includes(':')) {
              // Custom viewport size specified
              const [width, height] = viewportSetting.split(':').map(value => parseInt(value.trim()));
              cy.viewport(width, height);
            } else {
              // Predefined device name
              cy.viewport(viewportSetting);
            }
          }

          cy.log(`Executing: ${specFile} with child CSV: ${childCsvPath} and objType: ${objType}`);
          
          // Run the Cypress command with environment variables
          
          cy.exec(`npx cypress run --spec ${specFile} --env childCsvPath=${childCsvPath},objType=${objType}`).then((result) => {
            
            const command = `npx cypress run --spec ${spec} --browser chrome --headed`;

            if (result.code !== 0) {
              cy.log(`Error executing: ${specFile}`);
            }
          });
        }
      });
    }).catch((error) => {
      cy.log(`Error reading master CSV: ${error}`);
    });

