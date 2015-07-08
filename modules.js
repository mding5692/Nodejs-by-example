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
