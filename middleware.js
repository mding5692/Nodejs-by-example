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


// an example of connect displaying client request back to client
function echo(req, res, next) {
  req.pipe(res);
}
var connect = require('connect');
connect()
.use(echo)
.listen(3000);

// an example of a logger
var util = require('util');
// a simple logging middleware
function logit(req, res, next) {
  util.log(util.format('Request recieved: %s, %s', req.method, req.url));
  next();
}
var connect = require('connect');
connect()
.use(logit)
.listen(3000);

// mounting middleware = using optional first argument of use() to specify endpoint for which the specified middleware will be triggered
// for example we want to echo only when requests come for "/echo"

function echo(req, res, next) {
  req.pipe(res);
}
var connect = require('connect');
connect()
.use('/echo', echo)
.use(function (req, res) { res.end('Responded to /echo!'); })
.listen(3000);

// can also use the above as an object, have to use HANDLE method
// creates echo object
var echo = {
  handle: function (req, res, next) { // the handle method for object
    req.pipe(res);
  }
};
// calls function when echo is requested
var connect = require('connect');
connect()
.use(echo)
.listen(3000);

// an example of configurable middleware

// Configurable middleware creator
function greeter(message) {
  return function (req, res, next) {
    res.end(message);
  };
}
var helloWorldGreeter = greeter('Hello world!');
var heyThereGreeter = greeter('Hey there!');
var connect = require('connect');
connect()
.use('/hello', helloWorldGreeter)
.use('/hey', heyThereGreeter)
.listen(3000);
