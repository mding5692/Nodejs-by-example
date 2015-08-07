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
  
  
