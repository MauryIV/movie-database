const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (location, data) =>
  fs.writeFile(location, JSON.stringify(data, null, 2), (err) =>
    err ? console.error(err) : console.info(`\nUpdated ${location}.`)
  );

const readAndAppend = (data, file) => {
  fs.readFile(file, 'utf8', (err, storedData) => {
    if (err) {
      console.error(err)
    } else {
      const parsedData = JSON.parse(storedData);
      parsedData.push(data);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };