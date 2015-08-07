// note callbacks in node is called nodeback
// a nodebacks takes n number of arguments, the last which is a callback
// and the callback is called with (error) or (null, value) or (null, value1, value2...)
// you can convert nodeback to promises using the Q.nbind which takes a nodeback function, wraps it 
// and then :
/* Takes the same first n-1 arguments as the nodeback function (that is, all the arguments
excluding the callback argument) and silently passes them to the nodeback function along
with an internal callback function */

/* Which in the end would return a promise that is either:

• rejected if the internal callback is called by the nodeback function with a non-null error
argument (in other words, the (error) case),
• resolved to a value if the callback is called by the nodeback function like (null, value),
and
• resolved to an array [value1, value2,...] if the callback is called by the nodeback
function like (null, value1,value2,...). 
*/

// example nodeback:
function data(delay, cb) {
setTimeout(function () {
cb(null, 'data');
}, delay);
}
function error(delay, cb) {
setTimeout(function () {
  cb(new Error('error'));
  }, delay);
}
// Callback style
data(1000, function (err, data) { console.log(data); });
error(1000, function (err, data) { console.log(err.message); });

// Convert to promises
var Q = require('q');
var dataAsync = Q.nbind(data);
var errorAsync = Q.nbind(error);
// Usage
dataAsync(1000)
  .then(function (data) { console.log(data); });
errorAsync(1000)
  .then(function (data) { })
  .catch(function (err) { console.log(err.message); });
  
// a complex example:
var Q = require('q');
var fs = require('fs');
var readFileAsync = Q.nbind(fs.readFile);
function loadJSONAsync(filename) {
  return readFileAsync(filename)
    .then(function (res) {
      return JSON.parse(res);
    });
}
// good json file
loadJSONAsync('good.json')
  .then(function (val) { console.log(val); })
  .catch(function (err) {
    console.log('good.json error', err.message); // never called
  })
// non-existent json file
  .then(function () {
    return loadJSONAsync('absent.json');
  })
  .then(function (val) { console.log(val); }) // never called
  .catch(function (err) {
    console.log('absent.json error', err.message);
  })
// invalid json file
  .then(function () {
    return loadJSONAsync('bad.json');
  })
  .then(function (val) { console.log(val); }) // never called
  .catch(function (err) {
    console.log('bad.json error', err.message);
  });
  
// Thus promises save you from callbacks that keep calling

// for browser callbacks, you should use the deferred API
// Example below:
var Q = require('q');
function sleepAsync(ms) {
  var deferred = Q.defer();
  setTimeout(function () {
    deferred.resolve();
  }, ms);
  return deferred.promise;
}
console.time('sleep');
sleepAsync(1000).then(function () {
  console.timeEnd('sleep'); // around 1000ms
});
