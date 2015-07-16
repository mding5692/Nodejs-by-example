// Shares functionality of processing requests and responses ==> other words, moves in a chain
// Do this ==> Then that = CHAIN

// sample program: detects if program headers contains json, then process the body as javascript object
function parseJSON(req, res, next) {
  if (req.headers['content-type'] == 'application/json') {
    // Load all the data
    var readData = '';
    req.on('readable', function () {
      readData += req.read();
    });
    // Try to parse
    req.on('end', function () {
      try {
        req.body = JSON.parse(readData);
      }
    catch (e) { }
    next();
    })
  }
  else {
  next();
  }
}
// first checks if of json format, if not moves control to next middleware
// else it waits for stream to finish, then parses it to JSON
// if successful then body of request = JSON then passes it to next middleware

// sample program of a piece of middleware that takes the control from above program
var connect = require('connect');
connect()
.use(parseJSON)
.use(function (req, res) {
  if (req.body) {
    res.end('JSON parsed!, value of foo: '+ req.body.foo);
  }
  else {
    res.end('no JSON detected!');
  }
})
.listen(3000);
// if its parsed into JSON then takes a value from the JSON object

// Below is an example of authentication
// for authentication, client requests require the Authorization header
// for this example username and password is combined as a string = "username:password"
// its encoded in Base64
function send401(){
  res.writeHead(401 , {'WWW-Authenticate': 'Basic'});
  res.end();
}
// sends 401 if client request doesn't have correct credentials
// the whole thing is below
function auth(req, res, next) {
  // function for sending 401 not authorized error
  function send401(){
    res.writeHead(401 , {'WWW-Authenticate': 'Basic'});
    res.end();
  }
  // if doesn't have right authentication header then send 401
  var authHeader = req.headers.authorization;
  if (!authHeader) {
    send401();
    return;
  }
  // splits up the username and password and assigns them to the user and pass variables
  var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];
  // if the username and password is correct, pass control to next middleware
  if (user == 'foo' && pass == 'bar') {
    next(); // all good
  }
  // else say not authorized
  else {
   send401();
  }
}

// Now from the whole perspective
connect()
// first checks authentication
.use('/admin', auth)
// if passes, writes authorized to page
.use('/admin', function (req, res) { res.end('Authorized!'); })
// then moves to a page
.use(function (req, res) { res.end('Public') })
.listen(3000);
