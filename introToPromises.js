/* Promises are part of ES6 and will make development and async programming easier */

// A sample of promises being used, all promises within different js libraries are the same as they follow the same specs:
var Q = require('q');
function getPromise() {
  var deferred = Q.defer();
  // Resolve the promise after a second
  setTimeout(function () {
    deferred.resolve('final value');
  }, 1000);
  return deferred.promise;
}
var promise = getPromise();
// now unlike a callback, the inputs and outputs are clearly defined, thus there would not be another callback 
// or another function called if it fails.
promise.then(function (val) {
  console.log('done with:', val);
});
// In other words : Promise advantage: Instead of using a callback (which is an input) to provide the output, we return the promise,
// which can be used to subscribe for the output at your convenience.

/* Promises come in three states: resolved (success), rejected (failure) or pending */
// if resolved/fulfilled, it gives a value
// else it becomes rejected and gives a reason
// because promise's transition into resolved or fulfilled is immutable/unchanging, it isn't called again like a callback


// Promises uses the then and catch which either call the onFulfilled handler or the onRejected handler as seen below
var Q = require('q');
var willFulfillDeferred = Q.defer();
var willFulfill = willFulfillDeferred.promise;
willFulfillDeferred.resolve('final value');
willFulfill
  .then(function (val) {
    console.log('success with', val); // Only fulfill handler is called
  })
  .catch(function (reason) {
    console.log('failed with', reason);
  });

var willRejectDeferred = Q.defer();
var willReject = willRejectDeferred.promise;
willRejectDeferred.reject(new Error('rejection reason')); // Note the use of Error
willReject
  .then(function (val) {
    console.log('success with', val);
  })
  .catch(function (reason) {
    console.log('failed with', reason); // Only reject handler is called
  });
  // as you can see, if success then use "then", else uses "catch" handler
  // also, it is conventional to reject a promise with an Error object since it provides you with a stack-trace
  
  
  //You can create an already fulfilled promise using the *when* member function
var Q = require('q');
Q.when(null).then(function (val) {
  console.log(val == null); // true
});
Q.when('kung foo').then(function (val) {
  console.log(val); // kung foo
});
console.log('I will print first because *then* is always async!');
// callbacks and async code execute after sync code
//Promise advantage: Promises do not suffer from the maybe sync problem of callbacks. If you want to return an
//immediate promise, just return a resolved promise using Q.when and any then that the user registers is bound to be
// called asynchronously.

//there is a Q.reject function that creates an already rejected promise
var Q = require('q');
Q.reject(new Error('denied')).catch(function (err) {
  console.log(err.message); // denied
});

/* The chainability of promises is one of its biggest features */
// you can chain promises 
var Q = require('q');
Q.when(null)
  .then(function () {
    return 'kung foo';
  })
  .then(function (val) {
    console.log(val); // kung foo
    return Q.when('panda');
  })
  .then(function (val) {
    console.log(val); // panda
    // Nothing returned
  })
  .then(function (val) {
    console.log(val == undefined); // true
  });
  // the then handlers will wait for first to return the promise before taking it in


// if the promise is rejected, no further onFulfilled handlers are called
// instead it waits until you hit a onRejected handler and the chain continues on with the value from the onRejected handler
var Q = require('q');
Q.when(null)
  .then(function () {
    throw new Error('panda'); // uncaught exception
  })
  .then(function (val) {
    console.log('!!!!!', val); // I will never get called
  })
  .catch(function (reason) {
    console.log('Someone threw a', reason.message);
    return 'all good';
  })
  .then(function (val) {
    console.log(val); // all good
    return Q.reject(new Error('taco'));
  })
  .then(function (val) {
    console.log('!!!!!', val); // I will never get called
  })
  .catch(function (reason) {
    console.log('Someone threw a', reason.message);
  });
  
  // Promise advantage: Uncaught exceptions inside onFulfilled/onRejected handlers do not blow the  
  //application. Instead, they result in the promise in the chain to be rejected, which you can handle gracefully with a
  //final onRejected handler.
