var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/TaxConverter');

var MongoClient = mongo.MongoClient;

exports.postTax = function(tax) {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      db.db(config.dbName).collection(config.collections.taxes).insertOne(converter.persistentTax(tax), function(err, res) {

        db.close();

        success({id: res.insertedId});

      });
    });
  });

}
