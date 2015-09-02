// asserts are the basic blocks of testing and test if something we presume is true or false
// node provides its own built-in core module called assert which can be used to test assumptions

var assert = require('assert');

// you test if two things are equal
assert.equal(0,0); // if they are, then nothing happens
// else it gives out an AssertionError
assert.equal(0,1); // prints out error
// you can also provide an error message to be printed out as third argument
assert.equal(0,1,"this is an error");

// assert module can also be used with other testing frameworks like mocha
// also there are other functions like strictEqual, notEqual, deepEqual for stricter assert functions

// theres also the assert.throws function which tests a function and validates its error to make sure error
// is correct and returned
// so something like this assert.throws(block,[errorValidator],[message]) where the third argument is an optional message 
// that can be printed out
