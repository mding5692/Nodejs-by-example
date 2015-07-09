// instead of doing this to import large folders of dependencies
var foo = require(../someDir/foo);
var bar = require(../someDir/bar);
var something = require(../someDir/something);
var lol = require(../someDir/lol);

// do this:
exports.foo = require('./foo');
exports.bar = require('./bar');
exports.bas = require('./bas');
exports.qux = require('./qux');

// and then just call 
var savingTime = require('../importBlocks');
// makes it more maintainable
