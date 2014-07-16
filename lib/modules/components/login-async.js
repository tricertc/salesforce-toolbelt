var jsforce = require('jsforce');

/**
 * Salesforce login for async waterfall - assigns connection to $scope.conn
 * @param  {Object}   configuration
 * @param  {Function} next callback
 */
module.exports = function ($scope, config, next) {
  var conn = new jsforce.Connection(config.salesforce);
  var username = config.salesforce.username;
  var password = config.salesforce.getTokenizedPassword();

  conn.login(username, password, function (err, info) {
    if (err) return next(err);
    $scope.conn = conn;
    next();
  });
};
