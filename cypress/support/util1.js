// cypress/support/csvUtils.js
const fs = require('fs');
const Papa = require('papaparse');

function readCsv1(filePath) {
    return new Cypress.Promise((resolve, reject) => {
      cy.readFile('cypress/support/papaparse.min.js', { log: false }).then((script) => {
        cy.window({ log: false }).then((win) => {
          win.eval(script);
          cy.readFile(filePath).then((data) => {
            win.Papa.parse(data, {
              header: true,
              complete: (result) => {
                resolve(result.data);
              },
              error: (err) => {
                reject(new Error(`Error parsing CSV: ${err.message}`));
              }
            });
          });
        });
      });
    });
  }
  
  function readCsvrows() {
    return new Cypress.Promise((resolve, reject) => {
      cy.readFile('cypress/support/papaparse.min.js', { log: false }).then((script) => {
        cy.window({ log: false }).then((win) => {
          win.eval(script);
          cy.fixture('master.csv').then((data) => {
            win.Papa.parse(data, {
              header: true,
              complete: (result) => {
                resolve(result.data);
              },
              error: (err) => {
                reject(new Error(`Error parsing CSV: ${err.message}`));
              }
            });
          });
        });
      });
    });
  }


 

function readCsv(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(new Error(`Error reading CSV file: ${err.message}`));
            }
            Papa.parse(data, {
                header: true,
                complete: (result) => {
                    resolve(result.data);
                },
                error: (err) => {
                    reject(new Error(`Error parsing CSV: ${err.message}`));
                }
            });
        });
    });
}
  
  module.exports = { readCsv, readCsvrows };
  