/* Mongoose is an ODM for MongoDB which simplifies manipulating your mongoDB database */

// Connecting to a database
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/demo');
var db = mongoose.connection;
db.on('error', function (err) { throw err });
db.once('open', function callback() {
  console.log('connected!');
  db.close();
});

/* Mongoose uses the Schema class to define the fields of your documents
you then define a schema which is taken by the model class that links it to a database and lets 
you perform your functions */

// example of a schema
var tankSchema = new mongoose.Schema({ name: 'string', size: 'string' });
// you can define your methods
tankSchema.methods.print = function () { console.log('I am', this.name, 'the', this.size); };
// Compile it into a model
var Tank = mongoose.model('Tank', tankSchema);
var tony = new Tank({ name: 'tony', size: 'small' });
tony.print(); // I am tony the small
// it can also save/remove/update
var tony = new Tank({ name: 'tony', size: 'small' });
tony.save(function (err) {
  if (err) throw err;
  // saved!
})

// Query functions are also chainable:
Person
.find({ city: 'LA' })
.where('name.last').equals('Ghost')
.where('age').gt(17).lt(66)
.limit(10)
.exec(callback);

/** You can also use MongoDB as a Distributed Session Store **/
// For where you need to store large bits of information about user sessions
// there is a module called express-session middleware

var express = require('express');
var expressSession = require('express-session');
var app = express()
  .use(expressSession({
    secret: 'my super secret sign key'
  }))
  .use('/home', function (req, res) {
    if (req.session.views) {
      req.session.views++;
    }
    else {
      req.session.views = 1;
    }
  res.end('Total views for you: ' + req.session.views);
})
.use('/reset', function (req, res) {
  delete req.session.views;
  res.end('Cleared all your views');
})
.listen(3000);
// above shows how many times u type in home and resets when u type reset, however when u reload the browser
// the data above will disappear

// So you need to record your sessions using connect-mongo middleware to handle storing information:
var express = require('express');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var sessionStore = new MongoStore({
  host: '127.0.0.1',
  port: '27017',
  db: 'session',
});
var app = express()
  .use(expressSession({
    secret: 'my super secret sign key',
    store: sessionStore
  }))
  .use('/home', function (req, res) {
    if (req.session.views) {
      req.session.views++;
    }
    else {
      req.session.views = 1;
    }
    res.end('Total views for you: ' + req.session.views);
})
  .use('/reset', function (req, res) {
    delete req.session.views;
    res.end('Cleared all your views');
  })
  .listen(3000);
