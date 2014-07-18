/**
 * Salesforce login for async waterfall - assigns connection to $scope.conn
 * @param {Object}   $scope
 * @param {Object}   config
 * @param {Function} next callback
 */
module.exports = function ($scope, config, next) {
  var username = config.salesforce.username;
  var password = config.salesforce.getTokenizedPassword();

  $scope.conn.login(username, password, function (err) {
    if (err) return next(err);
    next();
  });
};
