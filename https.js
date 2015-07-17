// https is made possible by public-key encryption where there are two keys
// a public key accessible to everyone which is used for encryption (everyone can talk to you)
// and a private key known to only you can use which is for decryption 

// how does one make communication secure both ways then?
// user/browser generates something called a pre-master secret and sends it to the server encrypted by a public key
// the secret generates a session key valid for this session
// This is basically a SSL/TLS handshake

// you can use nodejs 's https module
var https = require('https');
var fs = require('fs');

// it has a similar createServer method except that it has an options first argument which provides the public/private keys
var options = {
/* the keys are stored in these below files */
key: fs.readFileSync('./key.pem'),
cert: fs.readFileSync('./cert.pem')

};

https.createServer(options, function (req, res) {
  res.end('hello client!');
}).listen(3000);

// CAN STILL USE WITH CONNECT MODULE

var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

var connect = require('connect');
// Create a connect dispatcher

var app = connect();
// Register with https
https.createServer(options, app)
.listen(3000);

// to redirect from a http to https server

var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

https.createServer(options, function (req, res) {
  res.end('secure!');
}).listen(443);
// Redirect from http port 80 to https
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);
