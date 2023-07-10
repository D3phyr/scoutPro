const fs = require('fs');

const file = './node_modules/next/dist/build/webpack/config/blocks/css/loaders/modules.js';
fs.readFile(file, 'utf8', (err, data) => {
  const formatted = data.replace('exportLocalsConvention: "asIs"', 'exportLocalsConvention: "camelCaseOnly"');
  fs.writeFile(file, formatted, 'utf8', (error) => {
    if (error) { return console.log(error); }
  });
});
