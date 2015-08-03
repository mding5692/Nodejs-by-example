// due to the async nature of node.js and js's callback functionality
// you will face something called callback hell where there is a lot of increased indentation
// causing the callback pyramid of doom

// see example below:
function first(data, cb) {
  console.log('Executing first');
  setTimeout(cb, 1000, data);
}
function second(data, cb) {
  console.log('Executing second');
  setTimeout(cb, 1000, data);
}
function third(data, cb) {
  console.log('Executing third');
  setTimeout(cb, 1000, data);
}
first('data', function (text1) {
  second(text1, function (text2) {
    third(text2, function (text3) {
      console.log('done:', text3); // indented
    });
  });
});

// one way to simplify this is to create HANDLERS that means you don't have to call all those functions inline
function first(data, cb) {
  console.log('Executing first');
  setTimeout(cb, 1000, data);
}
function second(data, cb) {
  console.log('Executing second');
  setTimeout(cb, 1000, data);
}
function third(data, cb) {
  console.log('Executing third');
  setTimeout(cb, 1000, data);
}
// Named handlers
function handleThird(text3) {
  console.log('done:', text3); // no indent!
}
function handleSecond(text2) {
  third(text2, handleThird);
}
function handleFirst(text1) {
  second(text1, handleSecond);
}
// Start the chain
first('data', handleFirst); // the handlers call each other and when called, call on the other functions as well

/** Another issue with callbacks is that you're using the input (callback function) given and then returning it as output
 when it is still counted as the input.
 
 Also control flow primitives like if, else, for and while don't work well
 And error handling gets confusing **/
 
 // For example, the below, you cannot know which one runs first, is it foo() or bar()
 
// WARNING! DO NOT USE!
function maybeSync(arg, cb) {
  if (arg) { // We already have data
  // BAD! Do not call synchronously!
  cb('cached data');
  }
  else { // We need to load data
  // simulate a db load
  setTimeout(function () {
  cb('loaded data')}, 500);
  }
}
// Without the intimate details of maybeSync
// its difficult to determine if
// - foo is called first
// OR
// - bar is called first
maybeSync(true, function (data) {
  foo();
});
bar();
function foo() { console.log('foo') }
function bar() { console.log('bar') }

// the way to fix this is to use process.nextTick function which schedules the 
// callback for the next tick of the event loop

function alwaysAsync(arg, cb) {
if (arg) { // We already have data
// setup call for next tick
  process.nextTick(function () { // process.nextTick called here
    cb('cached data');
  });
}
else { // We need to load data
  // simulate a db load
  setTimeout(function () {
    cb('loaded data')
    }, 500);
  }
}
alwaysAsync(true, function (data) {
  foo();
});
bar();
function foo() { console.log('foo') }
function bar() { console.log('bar') }

// in other words:
/* Simple lesson: If a function takes a callback, it’s async and it should never call the callback directly:
process.nextTick is your friend.
Also worth mentioning, for browser-based code you can use setImmediate (if available) or setTimeout. */

/** another thing about async is that you can process loops in parallel, below is not how u do it **/
// an async function to load an item
function loadItem(id, cb) {
  setTimeout(function () {
  cb(null, { id: id });
  }, 500);
}
// functions to manage loading
var loadedItems = [];
function itemsLoaded() {
    console.log('Do something with:', loadedItems);
}
function itemLoaded(err, item) {
  loadedItems.push(item);
  if (loadedItems.length == 2) {
    itemsLoaded();
  }
}
// calls to load
loadItem(1, itemLoaded);
loadItem(2, itemLoaded);

// using a node module called async, you can process it in parallel 

// an async function to load an item
function loadItem(id, cb) {
  setTimeout(function () {
    cb(null, { id: id });
  }, 500);
}
// when all items loaded, this is in node style, error then arguments
function itemsLoaded(err, loadedItems) {
  console.log('Do something with:', loadedItems);
}
// load in parallel
var async = require('async');
async.parallel([
  function (cb) {
    loadItem(1, cb);
  },
  function (cb) {
    loadItem(2, cb);
  }
  ], itemsLoaded)

/* As you can see above, async.parallel takes an array of functions as the first parameter and then calls function in second
argument once first parameter has done their callbacks */

// Worst issue with using callbacks for async tasks is the complexity in error handling
// the below is an example of error handling for sync which causes performance issues:
var fs = require('fs');
function loadJSONSync(filename) {
  return JSON.parse(fs.readFileSync(filename));
}
// good json file
console.log(loadJSONSync('good.json'));
// non-existent json file
try {
  console.log(loadJSONSync('absent.json'));
}
catch (err) {
  console.log('absent.json error', err.message);
}
// invalid json file
try {
  console.log(loadJSONSync('bad.json'));
}
catch (err) {
  console.log('bad.json error', err.message);
}
// things to take in mind for async when handling callbacks is to :
// 1. Never call the callback twice.
// 2. Never throw an error.
// Simple lesson: Contain all your synchronous code in a try/catch, except when you call the callback.

// first bad example, JSON.parse creates an error when it cannot parse JSON, thus crashing app
// load invalid json
loadJSON('bad.json', function (err, data) {
// NEVER GETS CALLED!
if (err) console.log('bad.json error', err.message);
else console.log(data);
});

// second bad example, cb as an example catches it self and executes again, calling a callback twice.
var fs = require('fs');
function loadJSON(filename, cb) {
  fs.readFile(filename, function (err, data) {
    if (err) {
      cb(err);
    }
    else {
      try {
        cb(null, JSON.parse(data));
      }
      catch (err) {
        cb(err);
      }
    }
  });
}
// load invalid json
loadJSON('bad.json', function (err, data) {
  if (err) console.log('bad.json error', err.message);
  else console.log(data);
});
