const { exec } = require('child_process');
const path = require('path');
const { parseCypressOutput, exportToExcel } = require('./cypressReportUtil');
const { generateHtmlReport } = require('./reportUtils');

const reportType = process.argv[2] || 'html';
const cypressCommand = 'npx cypress run --headed --spec "cypress/e2e/POC/*.js" --browser chrome';

exec(cypressCommand, async (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Cypress: ${error.message}`);
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log('Cypress output:', stdout);

  const results = parseCypressOutput(stdout);

  if (results.length === 0) {
    console.error('No results found. Ensure your tests are running and outputting correctly.');
    return;
  }

  if (reportType === 'excel') {
    const excelFilePath = path.join(__dirname, 'cypress/results/cypress_results.xlsx');
    await exportToExcel(results, excelFilePath);
    console.log(`Excel report generated at ${excelFilePath}`);
  } else {
    const htmlFilePath = path.join(__dirname, 'cypress/results/cypress_results.html');
    await generateHtmlReport(results, htmlFilePath);
    console.log(`HTML report generated at ${htmlFilePath}`);
  }
});
