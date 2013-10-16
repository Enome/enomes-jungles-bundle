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

// Stylus

app.use(stylus.middleware({
  src: __dirname + '/static/src',
  dest: __dirname + '/static/public',
  compile: function (str, path) {
    return stylus(str).set('filename', path).use(nib());
  }
}));

// Favicon

app.use(express.favicon(__dirname + '/static/public/favicon.ico'));

// Static

app.use(express.static(__dirname + '/static/public'));

// Cookies

app.use(express.cookieParser());
app.use(express.cookieSession({ secret: "IFohCiec4XeelaengobiCaichae2iedohR1ahHai6oagheifee" }));


// Auth & Auth

app.use('/administrator', jungles.auth.simple('/login', ['geert.pasteels@gmail.com']));
app.use('/login', jungles.auth.persona());


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

var rest = jungles.rest({ data: data, types: require('./types'), });
app.use('/administrator/api', rest);


// Panel

var panel = jungles.panel('/administrator/api');
app.use('/administrator', panel);


// Files

var files = jungles.files;
app.use('/files', files(__dirname + '/media'));


// Helpers

jungles.helpers.frontend(app);
require('./helpers')(app);


// Front-end

app.get(':path(*)', jungles.middleware.frontend(rest));


// Errors

jungles.errors(app);

// Create & start server

http.createServer(app).listen(3000, function () {
  console.log('http://0.0.0.0:3000');
});
