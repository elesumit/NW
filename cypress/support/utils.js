


class utils {

  // 4/2/24- method for reading data from CSV based on query
  static getSecondColumnValue(valueToSearch, secondColumnName) {
    return new Cypress.Promise((resolve, reject) => {
      // Load Papa Parse script
      cy.readFile('cypress/support/papaparse.min.js', { log: false }).then((script) => {
        cy.window({ log: false }).then((win) => {
          // Evaluate Papa Parse in the browser context
          win.eval(script);
        });
      });

      // Read the CSV file using Papa Parse
      cy.fixture('allProducts.csv').then((data) => {
        cy.window({ log: false }).then((win) => {
          win.Papa.parse(data, {
            header: true,
            complete: (result) => {
              const csvData = result.data;
              const row = csvData.find((row) => row['URL'] === valueToSearch);

              if (row) {
                // Resolve with the value in the second column
                resolve(row[secondColumnName]);
              } else {
                // Reject with an error if no row is found
                reject(new Error(`No row found with the value ${valueToSearch} in the first column`));
              }
            },
            error: (err) => {
              // Reject with an error message if there's an error parsing the CSV
              reject(new Error(`Error parsing CSV: ${err.message}`));
            },
          });
        });
      });
    });
  }


  launchURL() {
    cy.visit("https://www.nationwide.com/");
  }

  //4/2/24 -  Function to validate link and title of the displayed page 
  validateLinkAndTitle() {
    cy.url().then((url) => {
      cy.title().then((title) => {
        // Get the second column value from getSecondColumnValue

        utils.getSecondColumnValue(url, 'title').then((secondColumnValue) => {
          // Assert the title with the second column value
          cy.log(secondColumnValue);
          cy.title().should('eq', secondColumnValue);
        });
      });
    });
    cy.go('back');
  }


   readCsvrows(fileName) {
    return new Cypress.Promise((resolve, reject) => {
      // Load Papa Parse script
      cy.readFile('cypress/support/papaparse.min.js', { log: false }).then((script) => {
        cy.window({ log: false }).then((win) => {
          // Evaluate Papa Parse in the browser context
          win.eval(script);
        });
      });  
      
      // Read the CSV file using Papa Parse
      cy.fixture(fileName).then((data) => {
        cy.window({ log: false }).then((win) => {
          win.Papa.parse(data, {
            header: true,
            complete: (result) => {
              const csvData = result.data;
              const rowsWithExecutionYes = csvData.filter(row => row['execution'] === 'yes');
              resolve(rowsWithExecutionYes);
            },
            error: (err) => {
              reject(err); // Reject with error if there's an error parsing the CSV
            }
          });
        });
      });
    });
  
  



    function runAxeScan() {
      try {
        cy.injectAxe();
        cy.checkA11y().then((results) => {
          //cy.checkA11y(null, {
          //includedImpacts: ['critical', 'serious']
          // }).then((results) => {
          // Log the Axe scan results
          cy.log('Axe scan results:', results);
        });
      } catch (error) {
        // Log the Axe scan error but continue test execution
        cy.log(`Axe scan error occurred: ${error}`);
      }
    }



  }
}

module.exports = new utils();
