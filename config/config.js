var fs = require('fs');
var path = require('path');

// throw exception if NODE_ENV is not defined
if (!process.env.NODE_ENV)
  throw Error('NODE_ENV is not defined');

module.exports = function () {
  var environment = process.env.NODE_ENV.toLowerCase();
  var configDir = path.join(__dirname, 'env');

  if (!fs.existsSync(path.join(configDir, environment + '.js')))
    throw new Error('No configuration found for \'' + environment + '\'');

  return require('./env/' + environment);
};
