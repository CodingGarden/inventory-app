const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csvData = fs.readFileSync(
  path.join(__dirname, '..', '..', 'db', 'sources', 'countries.csv'),
  'utf8'
);

const countries = Papa.parse(csvData, {
  header: true,
});

module.exports = countries.data.map(({ name, 'alpha-2': code }) => ({
  name,
  code,
}));
