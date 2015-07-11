// using the connect node.js framework to illustrate how middleware works

var connect = require('connect')
, http = require('http');

// creates a connect dispatcher which takes req/res arguments and can be used as an argument for http.createServer
var app = connect();

// Register with http
http.createServer(app)
.listen(3000);
console.log('server running on port 3000');

// default behaviour is to return 404 is nothing is hooked up

// another way of doing the above:
// Create a connect dispatcher and register with http
var app = connect()
.listen(3000);
console.log('server running on port 3000');

// connect has a use method which takes three arguments: request, response and a next callback
// next allows you to optionally pass control onto the next middleware registered with connect or inform connect about an error

// Create a connect dispatcher and register with http
var app = connect()
// register a middleware
.use(function (req, res, next) { next(); })
.listen(3000);
console.log('server running on port 3000');

