var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/TaxConverter');

var MongoClient = mongo.MongoClient;

exports.getTaxes = function(taxesFilter) {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      db.db(config.dbName).collection(config.collections.taxes).find(converter.findTaxes(taxesFilter)).sort(converter.sortTaxesYearDesc()).toArray(function(err, array) {

        db.close();

        var taxes = [];

        for (var i = 0; i < array.length; i++) {

          taxes.push(converter.tax(array[i]));
        }

        success({taxes : taxes});

      });
    });
  });

}
