
/**
 * Module dependencies.
 */

var express = require('express')
  , sample = require('./routes/sample')
  , http = require('http')
  , path = require('path')
  , logger = require('./lib/logger');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
//app.use(express.logger('dev'));
if ('development' == app.get('env')) {
  app.use(express.logger('dev'));
}
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('dev' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/sample', sample.index);

http.createServer(app).listen(app.get('port'), function(){
  logger.i("APP", 'Express server listening on port ' + app.get('port'));
});

module.exports = app; // This is for testing
