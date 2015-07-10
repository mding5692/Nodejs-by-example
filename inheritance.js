/* Like good old object oriented js, you can use prototype or proto for inheritance and create large proto chains
  or use the util package which has inherits functionality */
  
  var inherits = require('util').inherits;
  
  // below is an example
  // Base
function Base() { this.message = "message"; };
Base.prototype.foo = function () { return this.message + " base foo" };
// Child
function Child() { Base.call(this); };
inherits(Child, Base);
// Overide parent behaviour in child
Child.prototype.foo = function () {
// Call base implementation + customize
return Base.prototype.foo.call(this) + " child foo";
}

var base = new Base();
var child = new Child();

// to check if it inherits
console.log(child instanceof base); // returns boolean true

// or you can use this:
function Animal() = {};
function Bird() = {};
Bird.prototype = Object.create(Animal.prototype); // Bird inherits from Animal

// prototype has a constructor property
Bird.prototype.constructor;
