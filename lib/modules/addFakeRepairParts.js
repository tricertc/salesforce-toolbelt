var async = require('async');
var jsforce = require('jsforce');
var login = require('./components/login-async');

module.exports = function (config, start, done) {

  var $scope = this;
  var conn = $scope.conn = new jsforce.Connection(config.salesforce);
  var Case = conn.sobject('Case');
  var Part = conn.sobject('Repair_Parts__c');

  start();

  if (config.name !== 'development')
    throw new Error('This module is only available in the development environment');

  // ------------------------------------
  // - async waterfall control flow
  // ------------------------------------
  async.waterfall([
    async.apply(login, $scope, config),
    function getRepairedCases(next) {
      Case.find({ Status: {$eq: 'Repaired' }}, { Id: 1, RA__c: 1 })
        .then(function (cases) {
          next(null, cases);
        });
    },
    function addRepairParts(cases, next) {
      async.eachSeries(cases, function (c, done) {
        console.log('Adding parts to RA#', c.RA__c);
        Part.create([
          { Case__c: c.Id, Part__c: '120186', Minutes__c: 45 },
          { Case__c: c.Id, Part__c: '111111', Minutes__c:  0 },
          { Case__c: c.Id, Part__c: '222222', Minutes__c:  0 }
        ], function (err, res) {
          if (err) throw new Error(err);
          res.forEach(function (log) {
            console.log('  - added', log.id);
          });
          console.log('');
          done();
        });
      }, function (err) {
        if (err) return next(err);
        next();
      });
    }
  ], function (err, res) {
    $scope.conn.logout();
    if (err) return console.error(err);
    done();
  });
  // ====================================


};
