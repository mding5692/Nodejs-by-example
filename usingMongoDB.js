
/** MONGODB CONCEPTS **/

/* Mongodb deployment/server consists of multiple databases (or db as we call it)
    Each database has multiple collections which has multiple documents 
    
    Documents are basically JSON documents 
    Collections don't have schemas.
    
    Every document in MongoDB must have a "_id" field, you can use any value for this as long as its unique. By default 
    MongoDB will create an ObjectId for you.
    
    You wouldn't use a Natural Primary Key as it could change and a surrogate primary key like objectId can be 
    used instead.
    
    MongoDB documents are stored in BSON/Binary JSON format.
    
    Below is how to use MongoDB with node.js
    
    MongoDB has its own node module */
    
  var MongoClient = require('mongodb').MongoClient;
  var demoPerson = { name: 'John', lastName: 'Smith' };
  var findKey = { name: 'John' };
  // connect to the client and tries to find the demoPerson and then deletes it
  MongoClient.connect('mongodb://127.0.0.1:27017/demo', function (err, db) {
    if (err) throw err;
    console.log('Successfully connected');
    var collection = db.collection('people'); // connects to people collection
    collection.insert(demoPerson, function (err, docs) { // insert it to people
      console.log('Inserted', docs[0]);
      console.log('ID:', demoPerson._id);
      collection.find(findKey).toArray(function (err, results) {
      console.log('Found results:', results);
      collection.remove(findKey, function (err, results) { // delete person
      console.log('Deleted person'); 
      db.close(); // disconnect
    });
  });
});

  /* How to update a document in mongodb using node */
  var MongoClient = require('mongodb').MongoClient;
  var demoPerson = { name: 'John', lastName: 'Smith' };
  var findKey = { name: 'John' };
  
  MongoClient.connect('mongodb://127.0.0.1:27017/demo', function (err, db) {
    if (err) throw err;
    var collection = db.collection('people');
    collection.insert(demoPerson, function (err, docs) {
      demoPerson.lastName = 'Martin';
      collection.save(demoPerson, function (err) {
        console.log('Updated');
        collection.find(findKey).toArray(function (err, results) {
          console.log(results);
      // cleanup
          collection.drop(function () { db.close() });
        });
      });
    });
  });
  // the above actually takes the whole document and then updates a field, which is data-intensive
  
    /* Below is a better implementation using the update operator */
    
  /*The collection’s update function takes three arguments, an object to match/find the item you want to modify, a
second argument that specifies the update operator + property we want to modify in the document, and a final
argument which is the callback called once the update has completed. */

  var MongoClient = require('mongodb').MongoClient;
  var website = {
    url: 'http://www.google.com',
    visits: 0
  };
  var findKey = {
    url: 'http://www.google.com'
  };
  MongoClient.connect('mongodb://127.0.0.1:27017/demo', function (err, db) {
    if (err) throw err;
    var collection = db.collection('websites');
    collection.insert(website, function (err, docs) {
      var done = 0;
      function onDone(err) {
        done++;
        if (done < 4) return;
        collection.find(findKey).toArray(function (err, results) {
          console.log('Visits:', results[0].visits); // 4
          // cleanup
          collection.drop(function () { db.close() });
        });
      }
    var incrementVisits = { '$inc': { 'visits': 1 } };
    collection.update(findKey, incrementVisits, onDone);
    collection.update(findKey, incrementVisits, onDone);
    collection.update(findKey, incrementVisits, onDone);
    collection.update(findKey, incrementVisits, onDone);
    });
  });
  
  /* In this example, we demonstrate sending four update requests to the server without waiting for a response. Each
request is asking the server to increment the visits count by 1. As you can see, when we fetch the results, after all four
requests are complete, the visits count is indeed 4—none of the update requests conflicted with one another. */
