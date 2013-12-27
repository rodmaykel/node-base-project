/*
 * Module dependencies.
 */

var express = require('express')
	, sample = require('./routes/sample')
	, http = require('http')
	, path = require('path')
	, logger = require('./lib/logger')
	, config = require('./config/_config')
	, api = require('./routes/apis/load_api.js')
	;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
// app.use(express.logger('dev'));
if ('development' === app.get('env')) {
	app.use(express.logger('dev'));
}
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

// all API endpoints are automatically routes
app.all('/api/:version/:method', api.execute);

app.get('/sample', sample.index);


http.createServer(app).listen(config.get('app:port'), function () {
	logger.i('APP', 'Express server listening on port ' + 
		config.get('app:port'));
});

module.exports = app; // This is for testing