var express = require('express');
var Promise = require('promise');
var bodyParser = require("body-parser");
var logger = require('toto-apimon-events')

var getTaxesDlg = require('./dlg/GetTaxesDelegate');
var getTaxesSumDlg = require('./dlg/GetTaxesSumDelegate');
var postTaxDlg = require('./dlg/PostTaxDelegate');
var putTaxDlg = require('./dlg/PutTaxDelegate');

var apiName = 'car';

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  next();
});
app.use(bodyParser.json());

app.get('/', function(req, res) {res.send({api: apiName, status: 'running'});});
app.get('/taxes', function(req, res) {logger.apiCalled('car', '/taxes', 'GET', req.query, req.params, req.body); getTaxesDlg.getTaxes({unpaied: req.query.unpaied}).then(function(result) {res.send(result);});});
app.get('/taxes/sum', function(req, res) {logger.apiCalled('car', '/taxes/sum', 'GET', req.query, req.params, req.body); getTaxesSumDlg.getTaxesSum({unpaied: req.query.unpaied}).then(function(result) {res.send(result);});});
app.post('/taxes', function(req, res) {logger.apiCalled('car', '/taxes', 'POST', req.query, req.params, req.body); postTaxDlg.postTax(req.body).then(function(result) {res.send(result);});});
app.put('/taxes/:id', function(req, res) {logger.apiCalled('car', '/taxes7{id}', 'PUT', req.query, req.params, req.body); putTaxDlg.putTax(req.params.id, req.body).then(function(result) {res.send(result);});});

app.listen(8080, function() {
  console.log('Car Microservice up and running');
});
