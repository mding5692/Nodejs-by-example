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
