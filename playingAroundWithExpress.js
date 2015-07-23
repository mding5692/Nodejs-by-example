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
