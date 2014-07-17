var jsforce = require('jsforce');

/**
 * Salesforce login for async waterfall - assigns connection to $scope.conn
 * @param  {Object}   configuration
 * @param  {Function} next callback
 */
module.exports = function ($scope, config, next) {
  var username = config.salesforce.username;
  var password = config.salesforce.getTokenizedPassword();

  $scope.conn.login(username, password, function (err, info) {
    if (err) return next(err);
    next();
  });
};
