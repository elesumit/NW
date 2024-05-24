

const neatCsv = require('neat-csv');
const fs = require('fs');

const readCsvFixture = (filePath) => {
    return cy.fixture(filePath).then((data) => neatCsv(data));
};

module.exports = { readCsvFixture };
