/* Going to use AngularJS to handle the frontend and how it interacts with node */
// Basically Angular uses AJAX, the contents are placed/cached by angular, and when a link is called, the contents are 
// grabbed by Angular from the cache so that you would not have to query the server

/* Angular is known for Data-binding/templating, URL handling/routing and Dependency Injection */

// Now going to setup an express server to handle delivering the html pages:

var express = require('express');
var app = express()
  .use(express.static(__dirname + '/public')) // this serves HTML from the public folder.
  .listen(3000);

// hooking up a rest api with the angular and doing more than the above code
  var express = require('express');
  var bodyParser = require('body-parser');
  // The express app
  var app = express();
  // Create a mongodb connection
  // and only start express listening once the connection is okay
  var MongoClient = require('mongodb').MongoClient;
  var db, itemsCollection;
  MongoClient.connect('mongodb://127.0.0.1:27017/demo', function (err, database) {
    if (err) throw err;
    // Connected!
    db = database;
    itemsCollection = db.collection('items');
    app.listen(3000);
    console.log('Listening on port 3000');
  });
  // Create a router that can accept JSON
  var router = express.Router();
  router.use(bodyParser.json());
  // Setup the collection routes
  router.route('/')
    .get(function (req, res, next) {
      itemsCollection.find().toArray(function (err, docs) {
        res.send({
          status: 'Items found',
          items: docs
        });
      });
    })
    .post(function (req, res, next) {
      var item = req.body;
      itemsCollection.insert(item, function (err, docs) {
        res.send({
          status: 'Item added',
          itemId: item._id
        });
      });
    })
// Setup the item routes
  router.route('/:id')
    .delete(function (req, res, next) {
      var id = req.params['id'];
      var lookup = { _id: new mongodb.ObjectID(id) };
itemsCollection.remove(lookup, function (err, results) {
  res.send({ status: 'Item cleared' });
  });
});
app.use(express.static(__dirname + '/public'))
  .use('/todo', router);
  
  // What the angular code would look like:
  
  var demoApp = angular.module('demo', []);
  demoApp.controller('MainController', ['$scope', 'todoWebService', function ($scope, todoWebService)
    {
    // Setup a view model
      var vm = {};
      vm.list = [];
      // Start the initial load of lists
      todoWebService.getItems().then(function (response) {
        vm.list = response.data.items;
      });
      vm.addItem = function () {
        var item = {
          details: vm.newItemDetails
        };
      // Clear it from the UI
      vm.newItemDetails = '';
      // Send the request to the server and add the item once done
      todoWebService.addItem(item).then(function (response) {
        vm.list.push({
          _id: response.data.itemId,
          details: item.details
          });
        });
      };
      vm.removeItem = function (itemToRemove) {
        // Remove it from the list and send the server request
        vm.list = vm.list.filter(function (item) { return item._id !== itemToRemove._id; });
        todoWebService.removeItem(itemToRemove);
      };
      // For new items:
      vm.newItemDetails = '';
      // expose the vm using the $scope
      $scope.vm = vm;
  }]);
  demoApp.service('todoWebService', ['$http', function ($http) {
    var root = '/todo';
    return {
      getItems: function () {
      return $http.get(root);
    },
    addItem: function (item) {
      return $http.post(root, item);
    },
    removeItem: function (item) {
      return $http.delete(root + '/' + item._id);
    }
  }
}]);
