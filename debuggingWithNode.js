// Theres always the simple logging or using console object to see if the app keeps running to that point

// the console object uses util.inspect to print it out values
// thus we can modify anything that is console.logged by adding an inspect property to it
var foo = {
  bar: 123,
  inspect: function () {
  return 'Bar is ' + this.bar;
  }
};
// Inspect
console.log(foo); // Logs: "Bar is 123"

// theres also the familiar format specifiers or placeholders that can be used with console
// %s = string, %d = Number (int and float) and %j = JSON
var name = 'jim';
var money = 45;
console.log('%s has %d dollars', name, money); // jim has 45 dollars
// note you can try %% to prevent it from looking at next character if its j or s or d, such as %%d

// to understand how much time, you can use console.time() and timeEnd()
// where it starts counting when you use console.time()
console.time();
// and outputs how much time its been at console.timeEnd()
console.timeEnd();

// you can also call on the stack trace with console.trace() which takes in an optional argument as its label
console.trace("optional label");

// can also place an error on the stack trace
function foo() {
  var stack = new Error('trace at foo').stack;
  console.log(stack);
  // Execution continues
  console.log('Stack trace printed');
}
function bar() {
  foo();
}
bar();

// You can also use console.error which prints out an stderr
console.error("someError");

/* Nodejs also has a debugger that you can start like this:

==> node debug script.js

debug starts your app and then stops before your first line

It uses these commands :

* c = continue execution
* n = next step/step over
* restart = restarts your script

// also these as well in observer mode

• watch(expression:string) adds a watch
• unwatch(expression:string) removes a watch
• repl open the Node.js REPL with current context. Press Ctrl+C to exit the REPL.
• bt backtrace, prints the call-stack

*/


// You can also start debugger programatically by using debugger statement
for (var index = 0; index < 10; index++) {
  var message = 'Loop ' + index;
  debugger; // starts up the debugger
  console.log(message);
}
