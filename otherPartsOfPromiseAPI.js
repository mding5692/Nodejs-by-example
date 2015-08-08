// You can actually pass in another promise into promises as their value and next onFulfilled/onRejected handler will be called with final settled value.

var Q = require('Q');
Q.when(Q.when('foo')).then(function (val) { // takes a promise as a value
  console.log(val); // foo
});
var def = Q.defer();
def.resolve(Q.when('foo'));
def.promise.then(function (val) {
  console.log(val); // foo
});
Q.when(null).then(function () {
  return Q.when('foo');
})
.then(function (val) {
  console.log(val); // foo
});

// There are steps to intentionally terminating a promise chain using the promise.done() method

var Q = require('q');
function iAsync() {
  return Q.when(null).then(function () {
    var foo; foo.bar; // Programming error. Will get caught since we return the chain
  });
}
iAsync()
  .catch(function (err) {
    var foo; foo.bar; // Uncaught exception, rejects the next promise
  });
// this is an example where because nothing is subscribed, it doesn't get passed to event loop
// so this how you deal with it:
iAsync()
  .catch(function (err) {
    var foo; foo.bar; // Uncaught exception, rejects the next promise
  })
  .done(); // Since previous promise is rejected throws the rejected value as an error
  
  // Promise libraries are all compatible so if u used Q or bluebird library they would still work, note names are placeholder
  var Q = require('q');
  var BlueBird = require('bluebird');
  new BlueBird(function (resolve) { // A bluebird promise
    resolve('foo');
  })
  .then(function (val) {
    console.log(val); // foo
    return Q.when('bar'); // A q promise
  })
  .then(function (val) {
    console.log(val); // bar
  });
  
  // there is methods to check the current state of promises:
  // there is boolean functions: isPending(), isFulfilled(), isRejected
  // and promise.inspect() which returns the state of the promise as an object
  var Q = require('q');
var p1 = Q.defer().promise; // pending
var p2 = Q.when('fulfill'); // fulfilled
var p3 = var p3 = Q.reject(new Error('reject')); // rejected
process.nextTick(function () {
console.log(p1.isPending()); // true
console.log(p2.isFulfilled()); // true
console.log(p3.isRejected()); // true
console.log(p1.inspect()); // { state: 'pending' }
console.log(p2.inspect()); // { state: 'fulfilled', value: 'fulfill' }
console.log(p3.inspect()); // { state: 'rejected', reason: [Error: reject] }

// For Parallel Flow control with Promises:
// most promise libraries will provide a "all" method that you can use to wait for n number of promises to complete
var Q = require('q');
// an async function to load an item
var loadItem = Q.nbind(function (id, cb) {
  setTimeout(function () {
    cb(null, { id: id });
  }, 500);
});
Q.all([loadItem(1), loadItem(2)])
  .then(function (items) {
    console.log('Items:', items); // Items: [ { id: 1 }, { id: 2 } ]
  })
  .catch(function (reason) { console.log(reason) });
  // noted that if any individual promise is rejected, complete promise is rejected with same reasons, use promise.inspect() to find which one 
  
});
