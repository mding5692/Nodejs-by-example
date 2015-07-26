// to compress down files greater than 1 kb
// you can use the compression module
var express = require('express');
var compression = require('compression');
var app = express()
.use(compression())
.use(express.static(__dirname + '/public'))
.listen(3000);

// sometimes your client times out and you don't want to waste server memory so you exit the client request
var express = require('express');
var timeout = require('connect-timeout');
var app = express()
.use('/api', timeout(5000),
function (req, res, next) {
  // simulate a hanging request by doing nothing
})
.listen(3000);
