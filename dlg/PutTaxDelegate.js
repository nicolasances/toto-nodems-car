var mongo = require('mongodb');
var config = require('../config');
var converter = require('../conv/TaxConverter');

var MongoClient = mongo.MongoClient;

exports.putTax = function(taxId, update) {

  return new Promise(function(success, failure) {

    return MongoClient.connect(config.mongoUrl, function(err, db) {

      db.db(config.dbName).collection(config.collections.taxes).updateOne({_id: new mongo.ObjectId(taxId)}, converter.update(update), function(err, res) {

        db.close();

        success();

      });
    });
  });

}
