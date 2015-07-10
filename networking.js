/* there are many networking modules as seen below */
var net = require('net'); // for TCP
var dgram = require('dgram'); // for UDP sockets
var http = require('http'); // for http stack
var https = require('https'); // for TLS/SSL 

// creates a server that listens to port 3000
var server = http.createServer(function (request, response) {
  console.log('request starting...');
  /* grabs the headers */
  console.log(req.headers);
  
  response.write('hello client!');
  response.statusCode = 404;  // setting the status code
  response.setHeader("Content-Type", "text/html"); // setting the header
  response.end();
});
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

// nodejs streams response to client by default so you will get transfer-encoding = chunked where chunked = stream

// getting header, takes in what type you want
var contentType = response.getHeader('content-type');
// removing header
response.removeHeader('Content-Encoding');
// explicitly send in the headers
response.writeHead(200, { 'Content-Type': 'text/html' });
// checking individual header
console.log(request.headers['user-agent']); // 'curl/7.30.0' 

// getting url of request 
request.url;
// getting request method
request.method;


/** Creating your own web server **/

var http = require('http');
var fs = require('fs');
function send404(response) {
  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.write('Error 404: Resource not found.');
  response.end();
}
var server = http.createServer(function (req, res) {
  if (req.method == 'GET' && req.url == '/') {
  res.writeHead(200, { 'content-type': 'text/html' });
  fs.createReadStream('./public/index.html').pipe(res);
}
else {
  send404(res);
}
}).listen(3000);
console.log('server running on port 3000');


/** Or to load index.html **/
var http = require('http');
var fs = require('fs');
var path = require('path');
function send404(response) {
  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.write('Error 404: Resource not found.');
  response.end();
}
var mimeLookup = {
  '.js': 'application/javascript',
  '.html': 'text/html'
};
var server = http.createServer(function (req, res) {
  if (req.method == 'GET') {
    // resolve file path to filesystem path
    var fileurl;
    if (req.url == '/') fileurl = '/index.html';
    else fileurl = req.url;
    var filepath = path.resolve('./public' + fileurl);
    // lookup mime type
    var fileExt = path.extname(filepath);
    var mimeType = mimeLookup[fileExt];
    if (!mimeType) {
  send404(res);
  return;
}
// see if we have that file
fs.exists(filepath, function (exists) {
// if not
  if (!exists) {
    send404(res);
    return;
  };
  // finally stream the file
    res.writeHead(200, { 'content-type': mimeType });
    fs.createReadStream(filepath).pipe(res);
    });
  }
  else {
    send404(res);
  }
}).listen(3000);
console.log('server running on port 3000');
