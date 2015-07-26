/** Everything one would need to know for cookies and security reasons **/

// to prevent cookie forgery, one can put on a digital signature to ensure authenticity of the cookie
// cookie is signed using HMAC, Key-hash message authentication code
// so a secret key known only to the server is combined with a hashing algorithm and is only known and verified by server
// express is good for this: cookie-parser has a optional argument to create signed cookies

// an example of a signed cookie

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express()
.use(cookieParser('my super secret sign key'))
.use('/toggle', function (req, res) {
  if (req.signedCookies.name) {
    res.clearCookie('name');
    res.end('name cookie cleared! Was:' + req.signedCookies.name);
  }
  else {
    res.cookie('name', 'foo', { signed: true });
    res.end('name cookie set!');
  }
})
.listen(3000);

// browser javascript can read cookie set for current webpage using document.cookie
// to prevent XSS
(res.cookie(name,value,{httpOnly:true})) // tell browser to disallow javascript access to cookie except from server
res.cookie(name,value,{secure:true}) // only can send through https

// a browser-session cookie, where there is an expiry date for the cookie
res.cookie('foo', 'bar', { maxAge: 900000, httpOnly: true }) // passing maxAge option to setCookie also works, the amount is in milliseconds

// for cookie-based sessions
// use the cookie-session middleware, requires a secret key by default
// clear value by deleting a key from req.session

var express = require('express');
var cookieSession = require('cookie-session');
var app = express()
.use(cookieSession({
  keys: ['my super secret sign key']
}))
150
.use('/home', function (req, res) {
  if (req.session.views) {
  req.session.views++;
  }
  else{
  req.session.views = 1;
  }
  res.end('Total views for you: ' + req.session.views);
})
.use('/reset',function(req,res){
  delete req.session.views;
  res.end('Cleared all your views');
})
.listen(3000);
// use cookie-session sparingly as it affects performance


