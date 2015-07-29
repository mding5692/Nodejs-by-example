/** REST is a term coined by Roy Fielding which specifys constraints on how connected components in distributed Hypermedia system should behave **/
// There are two broad kinds of URLs in REST : Ones that point to a collection (group) and ones that point to an individual item in collection 

/*
RESTful API HTTP Method Behavior for collection URLs
HTTP method   Behavior
  GET           -Get the summarized details of the members of the collection, including their unique
                identifiers.
  PUT           -Replace the entire collection with a new collection.
  POST          -Add a new item in the collection. It is common to return a unique identifier for the created
                resource.
  DELETE        -Delete the entire collection
  
RESTful API HTTP Method Behavior for item URLs
HTTP method   Behavior
  GET           -Get the details of the item.
  PUT           -Replace the item.
  POST          -Would treat the item as a collection and add a new sub-item in the collection. It is not generally used as you tend to simply replace properties on the item as a whole (in other words, use PUT).
  DELETE        -Delete the item.
*/

/* Express provides first-class verb and URL based routing support:
  app.VERB(path, [callback...], callback) */

// simple demo of this w/o chaining  
var express = require('express');
var app = express();
app.all('/', function (req, res, next) {
res.write('all\n');  //you can call app.all to register a middleware that is called whenever the path matches
next();
});
app.get('/', function (req, res, next) {
res.end('get');
});
app.put('/', function (req, res, next) {
res.end('put');
});
app.post('/', function (req, res, next) {
res.end('post');
});
app.delete('/', function (req, res, next) {
res.end('delete');

// or you can specify a route object using app.route and chain
var express = require('express');
var app = express();
app.route('/') // app.route specifies the route object
.all(function (req, res, next) {
  res.write('all\n');
  next();
})
.get(function (req, res, next) {
  res.end('get');
})
.put(function (req, res, next) {
  res.end('put');
})
.post(function (req, res, next) {
  res.end('post');
})
.delete(function (req, res, next) {
  res.end('delete');
});
app.listen(3000);

// returning something based on input 

var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('nothing passed in!'); // doesn't have input
});
app.get(/^\/[0-9]+$/, function (req, res) {
  res.send('number!'); // regex which determines if its a number
});
app.get('/*', function (req, res) {
  res.send('not a number!'); 
});
app.listen(3000);

// you can also use path parameters which can simplify thing, say if ur path was  /user/123 and u said that u wanted /user/:userid
// then by calling req.params['userid'], you will get 123
// example below
var express = require('express');
var app = express();
app.get('/user/:userId', function (req, res) {
  res.send('userId is: ' + req.params['userId']);
});
app.listen(3000);


/** Express Router Object is created  with express.Router() which can do all of the above and simplifies things further
 it can use all the functions mentioned above */
 
var express = require('express');
var bodyParser = require('body-parser');
// An in memory collection of items
var items = [];
// Create a router
var router = express.Router();
router.use(bodyParser());
// Setup the collection routes
router.route('/')
.get(function (req, res, next) {
res.send({
status: 'Items found',
items: items
});
})
.post(function (req, res, next) {
items.push(req.body);
res.send({
status: 'Item added',
itemId: items.length - 1
});
})
.put(function (req, res, next) {
items = req.body;
res.send({ status: 'Items replaced' });
})
.delete(function (req, res, next) {
items = [];
res.send({ status: 'Items cleared' });
});
// Setup the item routes
router.route('/:id')
.get(function (req, res, next) {
var id = req.params['id'];
if (id && items[Number(id)]) {
res.send({
status: 'Item found',
item: items[Number(id)]
});
}
else {
res.send(404, { status: 'Not found' });
}
})
.all(function (req, res, next) {
res.send(501, { status: 'Not implemented' });
});
// Use the router
var app = express()
.use('/todo', router)
.listen(3000);
