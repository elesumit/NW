

function getSecondColumnValue(valueToSearch, secondColumnName) {
    return new Promise((resolve, reject) => {
      // Load Papa Parse script
      cy.readFile('cypress/support/papaparse.min.js', { log: false }).then((script) => {
        cy.window({ log: false }).then((win) => {
          // Evaluate Papa Parse in the browser context
          win.eval(script);
        });
      });
  
      // Read the CSV file using Papa Parse
      cy.fixture('Test.csv').then((data) => {
        cy.window({ log: false }).then((win) => {
          win.Papa.parse(data, {
            header: true,
            complete: (result) => {
              const csvData = result.data;
              const row = csvData.find((row) => row['firstName'] === valueToSearch);
  
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
  
  // Export the function for external use
  module.exports = { getSecondColumnValue };
  
  