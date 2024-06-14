const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const config = require('../NWIE CAutomation/config.json')
//const config = require('../../../config.json');
const { parseCypressOutput, exportToExcel } = require('./cypressReportUtil');
const { generateHtmlReport } = require('./reportUtils');

const csvFilePath = 'cypress/fixtures/master.csv';

// Function to read CSV file and get specs with execution status "yes"
const getSpecFilesFromCSV = (filePath, callback) => {
    const specs = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row.execution.toLowerCase() === 'yes') {
                const { baseURL, URLextension, specname, objType, childCsvPath } = row;
                specs.push({
                    spec: `cypress/e2e/POC/${specname}.cy.js`,
                    childCsvPath: childCsvPath,
                    objType: objType,
                    URLextension: URLextension,
                    baseURL: baseURL
                });
            }
        })
        .on('end', () => {
            callback(specs);
        });
};

// Function to run a single spec file in headed mode on Chrome
const runSpec = (specDetails, callback) => {
    const { spec, childCsvPath, objType, baseURL, URLextension } = specDetails;
    const specFileName = path.basename(spec, '.cy.js');
    const command = `npx cypress run --spec ${spec} --env childCsvPath=${childCsvPath},objType=${objType},baseURL=${baseURL},URLextension=${URLextension} --browser chrome --headed`;
    console.log(`Running command: ${command}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            console.error(`Error code: ${error.code}`);
            console.error(`Error signal: ${error.signal}`);
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        callback(stdout, specFileName);
    });
};

// Function to run all spec files sequentially and collect results
const runAllSpecs = (specs, callback, allResults = []) => {
    if (specs.length === 0) {
        console.log('All specs have been run.');
        callback(allResults);
        return;
    }

    const currentSpec = specs.shift();
    runSpec(currentSpec, (output, specFileName) => {
        allResults.push({ output, specFileName });
        runAllSpecs(specs, callback, allResults);
    });
};

// Start the process
getSpecFilesFromCSV(csvFilePath, (specFiles) => {
    if (specFiles.length === 0) {
        console.log('No specs to run.');
        return;
    }
    runAllSpecs(specFiles, async (allResults) => {
        const combinedResults = allResults.map(result => ({
            output: result.output,
            specFileName: result.specFileName,
            parsedResults: parseCypressOutput(result.output)
        }));

        for (const result of combinedResults) {
            const { specFileName, parsedResults } = result;

            if (parsedResults.length === 0) {
                console.error(`No results found for ${specFileName}. Ensure your tests are running and outputting correctly.`);
                continue;
            }

            const excelFilePath = path.join(__dirname, `cypress/results/${specFileName}_results.xlsx`);
            await exportToExcel(parsedResults, excelFilePath);
            console.log(`Excel report generated at ${excelFilePath}`);

            const htmlFilePath = path.join(__dirname, `cypress/results/${specFileName}_results.html`);
            await generateHtmlReport(parsedResults, htmlFilePath);
            console.log(`HTML report generated at ${htmlFilePath}`);
        }
    });
});
