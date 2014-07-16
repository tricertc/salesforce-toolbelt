require('../lib/helpers/string-helper');

var fs = require('fs');
var path = require('path');
var Module = require('./modules/Module');

if (!process.argv[2])
  throw new Error('No module defined');

exports.load = function () {
  var moduleDir = path.join(__dirname, 'modules');
  var moduleName = process.argv[2].toCamelCase();

  if (!fs.existsSync(path.join(moduleDir, moduleName + '.js')))
    throw new Error('Module \'' + process.argv[2] + '\' not found');

  return new Module({
    name: process.argv[2],
    args: process.argv.slice(3)
  });
};
