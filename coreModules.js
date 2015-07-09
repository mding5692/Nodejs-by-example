// for core modules, you don't need to specify a path
// for e.g:
var path = require('path');

// the path modules lets you manipulate file system paths and can handle string transformations with file paths

path.normalize("/foo/bar"); // normalize fixes up slashes to be OS specific as UNIX and windows have different rules for slashes

var str1 = "foo";
var str2 = "/bar";
path.join(str1, str2); // similar to string join(), joins two file pathes to create one

// so if path was "/foo/bar/lol.html
path.dirname; // gives /foo/bar
path.basename; // gives lol.html
path.extname; // gives the extension like .html

// fs module provides access to file system and enables naming files, read/write and deleting files

var fs = require('fs');

// easy way of writing/reading
// write
fs.writeFileSync('test.txt', 'Hello fs!');
// read
console.log(fs.readFileSync('test.txt').toString());

// deleting files
fs.unlinkSync("./test.txt"); // synchronous way of doing things
fs.unlink("./test.txt"); // async, means it can take a callback

// the os module for handling operating system and memory issues
var os = require('os');

// quick way to gauge how much space you got
var gigaByte = 1 / (Math.pow(1024, 3));
console.log('Total Memory', os.totalmem() * gigaByte, 'GBs');
console.log('Available Memory', os.freemem() * gigaByte, 'GBs');
console.log('Percent consumed', 100 * (1 - os.freemem() / os.totalmem()));

// also number of cpus available
console.log('This machine has', os.cpus().length, 'CPUs');

// theres also the util module for more general functionality
var util = require('util');
util.log("hello"); // prints something out with a timestamp
// so like output = hello - timestamp

// like c/c++ printf functions is util.format
console.log(util.format('%s has %d dollars', "henry", 5));

// also checks to see its something and returns boolean value
util.isArray([]);
util.isDate();
util.isError();
