var async = require('async');
var jsforce = require('jsforce');
var login = require('./components/login-async');

module.exports = function (config, start, done) {
  var $scope = this;
  var conn = $scope.conn = new jsforce.Connection(config.salesforce);
  var Repair_Parts__c = conn.sobject('Repair_Parts__c');

  start();

  // ------------------------------------
  // - async waterfall control flow
  // ------------------------------------
  async.waterfall([
    async.apply(login, $scope, config),
    getRepairedParts,
    deleteRepairedParts
  ], function (err, res) {
    $scope.conn.logout();
    if (err) return console.error(err);
    done();
  });
  // ====================================

  /**
   * Get all parts for cases in 'Repaired' status
   * @param {Function} next [description]
   */
  function getRepairedParts(next) {
    Repair_Parts__c
      .find({ 'Case__r.Status': { $eq: 'Repaired' }}, {
        Id: 1,
        Part__c: 1,
        Case__c: 1,
        'Case__r.RA__c': 1
      })
      .then(function (parts) {
        var map = parts.reduce(function (map, part) {
          if (!map.hasOwnProperty(part.Case__c))
            map[part.Case__c] = {
              RA__c: part.Case__r.RA__c,
              parts: []
            };

          map[part.Case__c].parts.push({ Id: part.Id, Part__c: part.Part__c });

          return map;
        }, {});

        next(null, map);
      })
      .catch(function (err) {
        next(err);
      });
  }

  /**
   * Bulk delete repair parts
   * @param {Function} next [description]
   */
  function deleteRepairedParts(cases, next) {
    var partIds = [];

    // Check to see if any repair cases were returned
    if (Object.keys(cases).length === 0) {
      console.log('No repair parts to delete');
      return next();
    }

    // log and queue ids for deletion
    console.log('Preparing to delete the following part Ids\n');
    for (var id in cases) {
      var c = cases[id];
      console.log('  Case:', c.RA__c, '[' + id + ']');
      for (var i=0; i < c.parts.length; i += 1) {
        var part = c.parts[i];
        partIds.push(part.Id);
        console.log('    -', part.Part__c, '[' + part.Id + ']');
      }
      console.log('\n');
    }

    // delete parts
    console.log('Deleting repair parts');
    Repair_Parts__c
      .destroy(partIds, config.salesforce, function (err, res) {
        if (err) return next(err);
        res.forEach(function (log) {
          console.log('  - deleted', log.id);
        });
        next(null, res);
      });
  }

};
