// const path = require('path');
// const config = require('../../testConfig.json');
// //const pageControllers = require('../../pages/pageControllers.js');

// const pageControllers = require('../pages/pageControllers.js');

// function runTestForPage(pageName, pageUrl) {
//   Object.entries(config.viewPorts).forEach(([viewportName, viewportSetting]) => {
//     describe(`Validate ${pageName} Page - ${viewportName}`, () => {
//       beforeEach(() => {
//         cy.visit(config.environments.baseURL + pageUrl);
//         if (viewportSetting.includes(':')) {
//           const [width, height] = viewportSetting.split(',').map(value => parseInt(value.split(':')[1].trim()));
//           cy.viewport(width, height);
//         } else {
//           cy.viewport(viewportSetting);
//         }
//       });

//       it(`Validate links on ${pageName} Page`, () => {
//         let currentPageUrl;
//         cy.url().then(url => {
//           currentPageUrl = url;
//         });

//         const csvFileName = `${pageName}.csv`;
//         const csvFilePath = path.join('fixtures', csvFileName);

//         // Check if the CSV file exists in the fixtures folder
//         cy.readFile(csvFilePath).then(() => {
//           cy.fixture(csvFileName).then((rowsWithExecutionYes) => {
//             rowsWithExecutionYes.forEach(row => {
//               const { execution, links, condition, expectedtext, elementText } = row;

//               const linksArray = links.split(':');
//               linksArray.forEach((link) => {
//                 cy.log(`Execution: ${execution}, Link: ${link}, expectedtext: ${expectedtext}, elementText: ${elementText}`);

//                 const xpath = pageControllers.getXPath(condition, elementText);
//                 if (xpath) {
//                   pageControllers.clickLink(xpath);
//                   cy.wait(2000);
//                   cy.contains(expectedtext).should('be.visible');
//                   cy.visit(currentPageUrl);
//                 } else {
//                   cy.log(`No matching XPath for condition: ${condition}`);
//                 }
//               });
//             });
//           });
//         }).catch(() => {
//           cy.log(`CSV file ${csvFileName} does not exist in fixtures folder`);
//         });
//       });
//     });
//   });
// }

// module.exports = { runTestForPage };
