// node_modules are nodejs modules you can grab off the community and use npm
// first use npm to install them
npm install sampleNodeModule

// then use require
var someNodeModule = require('someNodeModule');

// nodejs first looks for core modules and then looks for node_modules when you don't refer to relative paths
// also if you moved one of your files to node_modules, you can call it without relative paths which can keep calling those files more simplifed

