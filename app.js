var express = require('express');
var port = 54145;
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('\n__dirname = ' + __dirname + '\nprocess.cwd = ' + process.cwd());
});

module.exports = app;
