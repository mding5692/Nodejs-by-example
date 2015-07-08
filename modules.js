// creating an example of a nodejs module

  var helloWorld = function() {
    console.log("hello World");
    };
  
  var sayWhat = 1;

/* module.exports starts as a js object */
module.exports = {
  func1 : helloWorld,
  func2 : sayWhat
  };

// this works too  
exports.a = function() { console.log(1); };

/* how u call these modules:

  require(./modules);  
  
  don't need .js extension 
  
  NOTE: relative paths are required for file-base modules, aka yours or hardcoded as non-relative paths are reserved for core and node_modules
  */
