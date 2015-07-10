/* Quick Intro to JSON */

// JSON builds off JS's object literals and is used to store things.

// however, to reference you got use a key between quotation marks

// can load JSON same way you load a module

{
"foo": "this is the value for foo"
}

// ^ lets store the above JSON in something called config.js

var config = require('./config');
console.log(config.foo); // this is the value for foo

// ^ how you would grab the JSON data

// can also use JSON global to do things like JSON.stringify();

/* USING NPM */

// NPM makes it easy to grab and install node modules
// you have to configure something called package.json that looks like the below
{
"name": "foo",
"version": "0.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"dependencies": {
"underscore": "^1.6.0"
},
"author": "",
"license": "ISC"
}

// use the dependencies bit to grab the npm packages/modules you need
// to refresh node_modules, use 
npm install
// to list dependencies
npm ls
// remove dependency
npm rm something
// installs underscore package and creates it in your package.json's dependencies section
npm install underscore --save
// find latest packages which you depend on
npm outdated
// to update dependencies and list them in package.json
npm update -save

// use the main section of the package.json to redirect to the js file you want your app to use
{
"main" : "./lib/main.js"
}

/* So if this was your architecture:
|-- app.js
|-- node_modules
  |-- foo
    |-- package.json
    |-- lib
      |-- main.js
      
      require('foo') would redirect to main.js
      
    */
