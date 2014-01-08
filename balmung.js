#!/usr/bin/env node
'use strict';

var fs = require('fs');
var express = require('express');
var program = require('commander');
var _ = require('lodash');
var loggers = require('proteus-logger');
var pkginfo = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

program
.version(pkginfo.version)
.option('-p, --port', 'Port to listen web')
.option('-c, --config', 'Config file path')
.parse(process.argv)
;

var config = require('./balmung-config.js');
if (program.config) {
  _.each(require(program.config), function(value, name) {
    config[name] = value;
  });
}
// configure logger
loggers.configure(config.logger);

var port = program.port || 7700;
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('config', config);

app.use(express.cookieParser());
app.use(express.json());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index');
});
app.get('/template/:file.html', function(req, res) {
  res.contentType('text/html');
  res.render('template/' + req.param('file'));
});

require('./lib/init')(app, function(err) {
  if (err) {
    loggers.get().error(err.stack);
  } else {
    app.listen(port, function() {
      loggers.get().info('Balmung started at', { port: port });
    });
  }
});

module.exports = app;
