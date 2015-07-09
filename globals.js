/* globals are globally available utility variables
They tend to vary between true globals like console or local globals that are set by the current module */

// true globals include
console.log("this is a global"); // such as console.log

/* the timers for setTimeout */

setTimeout(function () {
console.log('timeout completed');
}, 1000); // setTimeout executes only once

setInterval(function () {
console.log('second passed');
}, 1000); // setInterval keeps going

// current modules' directory and file name, they're full pathes
__filename;
__dirname;

// process can handle command line arguments 
var commandLineArgs = process.argv; 
// can also treat the above as an array to grab certain values

// a process function: nextTick takes callback function and executes it right after the next instruction
process.nextTick(function () {
  console.log('next tick');
});
console.log('immediate');

// output would be: immediate, next tick

Buffer; // a global class available for interacting with strings.

// a string
var str = "Hello Buffer World!";
// From string to buffer
var buffer = new Buffer(str, 'utf-8');
// From buffer to string
var roundTrip = buffer.toString('utf-8');
console.log(roundTrip); // Hello

// theres also the variable global which is similar to window for the frontend
global;
