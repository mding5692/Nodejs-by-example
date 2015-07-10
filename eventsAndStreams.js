// nodejs has a built-in events module for handling events
// and a class called EventEmitter
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter

// eventemitter either emits or subscribes to events
emitter.emit('foo', { a: 123 }, { b: 456 });

// when you want to subscribe to an event, 
emitter.on('foo', function () {
  console.log('subscriber 1');
});

emitter.on('foo2', function (arg1, arg2) {
console.log('Foo raised, Args:', arg1, arg2);
});

// can have multiple subscribers
emitter.on('foo', function () {
  console.log('subscriber 2');
});
emitter.on('foo', function () {
  console.log('subscriber 1');
});

// essentially you are listening for an event 

// to unsubscribe: use removeListener
emitter.removeListener('foo');

// for listener management, it has a function .listeners which takes an event name and returns all listeners subscribed
console.log(emitter.listeners('foo'));

// eventemitter also raise a 'newListener' or 'removeListener' event if you add or remove a listener

// in case of memory leaks, eventemitter allows 10 listeners for each event before printing a warning to console
// this is in case you forget to unsubscribe
// what you see ==> warning: possible EventEmitter memory leak detected. 11 listeners added.

// you can use setMaxListeners to use more than 10 and remove this warning
emitter.setMaxListeners(30);

// for errors, unless you listen for errors, nodejs prints a stack trace and exits program

// process inherits from EventEmitter
// and is used to handle exception handlers
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
  console.log('Stack:', err.stack);
  // exit program
  process.exit(1);
});

/** SIGNALS **/
/* nodejs supports UNIX idea of signals so when you press ctrl c, you can have a listener listening to SIGINT and can 
 choose to exit or continue execution of program */
 
 setTimeout(function () {
  console.log('5 seconds passed. Exiting');
  }, 5000);
console.log('Started. Will exit in 5 seconds');

process.on('SIGINT', function () {
  console.log('Got SIGINT. Ignoring.');
});

/** STREAMS **/
/* Streams are much more effective than simple buffering where you request a file and keeps loading until the whole file is loaded and then returns the contents to you

Streaming is instead where you call for the data, and chunks of it is sent to you incrementally until the whole thing is loaded */

// Readable stream = stream where you can read data from but not write
// an example
  var readable = process.stdin;
  
// Writable stream = stream where you can write but not read
var writable = process.stdout;

// Duplex stream = can do both of the above such as network socket
// Transform stream = a Duplex stream where the output is computed from input

// there is a stream module in nodejs
var stream = require('stream');
// which has base classes of Readable, Writable, Duplex and Transform
// Stream inherits from EventEmitter and are based on events

// all streams support pipe function which is like the UNIX pipe operator for command line
// an example is below
var fs = require('fs');
// Create readable stream
var readableStream = fs.createReadStream('./cool.txt');
// Pipe it to stdout
readableStream.pipe(process.stdout);
// All that the pipe operation does is subscribe to the relevant events on the source and call the relevant functions on the destination.

// consuming a readable stream which is raised for an event where data is ready to be read from a stream
process.stdin.on('readable', function () {
  var buf = process.stdin.read();
  if (buf != null) {
    console.log('Got:');
    process.stdout.write(buf.toString());
  }
  else {
    console.log('Read complete!');
  }
});

// writing to a writable stream
var fs = require('fs');
var ws = fs.createWriteStream('message.txt');
ws.write('foo bar ');
// to end writing, call end()
ws.end('bas');
