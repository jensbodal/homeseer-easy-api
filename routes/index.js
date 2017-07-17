var express = require('express');
var router = express.Router();
var http = require('request-promise-native');
var config = require('../config.json');

var auth = buildAuth(config.username, config.password);

router.get('/', function(req, res, next) {
  res.send('WORKING');
});

router.get('/speak', function(req, res, next) {
  var command = req.query.command;

  var options = {
    uri: config.homeseerUrl + '/JSON',
    qs: {
      request: 'voicecommand',
      phrase: ''
    },
    headers: {
      Authorization: 'Basic ' + auth
    },
    json: true
  };

  options.qs.phrase += command;

  http.get(options)
    .then(function(response) {
      console.log(response);

      res.send(response.Response);
    })
    .catch(function(err) {
      console.log(err.options);
      console.log(err.message);


      res.send('error');
    });

});

function buildAuth(username, password) {
  return new Buffer(username + ':' + password).toString('base64');
}

module.exports = router;
