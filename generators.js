/* Generators are something thats new and coming in ES6, to get it, you're going to have to use an unstable build of node.js and run node.js executable with --harmony flag

Generators are basically iterators, that generate a lot of values that can be paused, a value can be returned/inserted and you can also throw an exception */
// You have to use function* instead of function
// a generator that goes on forever:
function* infiniteSequence(){
  var i = 0;
  while(true){
    yield i++;
  }
}
var iterator = infiniteSequence();
while (true){
  console.log(iterator.next()); // { value: xxxx, done: false }
}

// injecting a value in a generator, you have to use 
function* generator(){
  var bar = yield 'foo';
  console.log(bar); // bar!
}
var iterator = generator();
// Start execution till we get first yield value
var foo = iterator.next();
console.log(foo.value); // foo
// Resume execution injecting bar
var nextThing = iterator.next('bar');

// one that throws an exception, using the throw function
function* generator(){
  try{
    yield 'foo';
  }
  catch(err){
    console.log(err.message); // bar!
  }
}
var iterator = generator();
// Start execution till we get first yield value
var foo = iterator.next();
console.log(foo.value); // foo
// Resume execution throwing an exception 'bar'
var nextThing = iterator.throw(new Error('bar'));

// you can also combine promises and generators to achieve async programming with sync programming:
// it is wrapped in a spawn call, and the generator functions (function*) yield on promises
var Q = require('q');
Q.spawn(function* (){
  // fulfilled
  var foo = yield Q.when('foo');
  console.log(foo); // foo
  // rejected
  try{
    yield Q.reject(new Error('bar'));
  }
  catch(err){
    console.log(err.message); // bar
  }
  
  // there is also the .async function which takes a generator function and returns a function which when called
  // is either resolved to final return value of generator or rejected if there is an uncaught error
  // an example below:
  var Q = require('q');
  // an async function to load an item
  var loadItem = Q.nbind(function (id, cb) {
    setTimeout(function () {
      cb(null, { id: id });
    }, 500); // simulate delay
  });
  // An async function to load items
  var loadItems = Q.async(function* (ids){
    var items = [];
    for (var i = 0; i < ids.length; i++) {
      items.push(yield loadItem(ids[i]));
    }
    return items;
  });
    Q.spawn(function* (){
      console.log(yield loadItems([1,2,3]));
    });
  });
