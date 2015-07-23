// Express is a popular web application framework which simplifies creating your own server
// in a way, Express is a more powerful version of the connect module

// calls the dependencies
var express = require('express'),
http = require('http');
// Create an express application
var app = express()
// register a middleware
.use(function (req, res, next) {
  res.end('hello express!');
});
// Register with http, and can also use https
http.createServer(app)
.listen(3000);

/* Another way of doing it */
var express = require('express');
express()
.use(function (req, res, next) {
res.end('hello express!');
})
.listen(3000);

/* Serving up static pages from your ./public directory */

var express = require('express');
var serveStatic = require('serve-static');
var app = express()
.use(serveStatic(__dirname + '/public'))// __dirname = current directory name
.listen(3000);
// this specifies which file is the index.html ==> app.use(serveStatic(__dirname + '/public', {'index': ['default.html', 'default.htm']}))
// however can also do the below way as express has static middleware as part of its module
var express = require('express');
var app = express()
.use(express.static(__dirname + '/public'))
.listen(3000);

// serve-index module shows the contents of the directory

/* The body-parser module is very useful for parsing your input into JSON */

var express = require('express');
var bodyParser = require('body-parser');
var app = express()
.use(bodyParser())
.use(function (req, res) {
  if (req.body.foo) {
    res.end('Body parsed! Value of foo: ' + req.body.foo);
  }
  else {
    res.end('Body does not have foo!');
    }
})
.use(function (err, req, res, next) {
  res.end('Invalid body!');
})
.listen(3000);


// You can use express to set cookies
// the below code will set a cookie with a name called foo
var express = require('express');
var app = express()
.use(function (req, res) {
  res.cookie('name', 'foo');
  res.end('Hello!');
})
.listen(3000);

// theres also the cookie-parser module
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express()
.use(cookieParser())
.use(function (req, res) {
  if (req.cookies.name) {
    console.log('User name:', req.cookies.name);
  }
  else {
  res.cookie('name', 'foo');
  }
res.end('Hello!');
})
.listen(3000);
// above saves the username to the cookies name or else it is just foo


var express = require('express');
var cookieParser = require('cookie-parser');
var app = express()
.use(cookieParser())
.use('/toggle', function (req, res) {
  if (req.cookies.name) {
    res.clearCookie('name');
    res.end('name cookie cleared! Was:' + req.cookies.name);
  }
  else {
  res.cookie('name', 'foo');
  res.end('name cookie set!');
  }
})
.listen(3000);
// when you visit localhost/toggle, it will either set or clear the cookie

