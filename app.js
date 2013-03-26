var express = require('express');
var http = require('http');
var stylus = require('stylus');
var nib = require('nib');
var jungles = require('jungles');

// Express

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.locals.pretty = true;

app.use(stylus.middleware({
  src: __dirname + '/static/src',
  dest: __dirname + '/static/public',
  compile: function (str, path) {
    return stylus(str).set('filename', path).use(nib());
  }
}));

app.use(express.favicon(__dirname + '/static/public/favicon.ico'));
app.use(express.static(__dirname + '/static/public'));


// Data

var data = jungles.data.postgres({
  database: 'jungles',
  user: 'jungles',
  password: '1234',
  host: 'localhost',
  port: '5432',
});

data.setup();


// Rest

var rest = jungles.rest.init({ data: data, types: require('./types'), });
app.use('/administrator/api', rest);


// Panel

var panel = jungles.panel.init({
  url: '/administrator/api',
  customize: [ jungles.components.upload ],
});

app.use('/administrator', panel);


// Files

var files = jungles.files;
app.use('/files', files(__dirname + '/media'));


// Helpers

jungles.helpers.frontend.init(app);
require('./helpers')(app);


// Front-end

app.get(':path(*)', jungles.middleware.frontend(rest));


// Errors

jungles.errors.init(app);


// Create & start server

http.createServer(app).listen(3000, function () {
  console.log('http://0.0.0.0:3000');
});
