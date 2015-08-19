/* Node-inspector is a tool built upon Chrome Devtools and can be installed using npm

AND to call it after installed you just use node-debug script.js instead of node script.js

What it will do:
1) Run your app
2) Pause at first line
3) Open up web browser and node-inspector

YOU CAN STILL USE THE DEBUGGER STATEMENT TO CALL IT

Also note that:

You can start a node process in debug mode using the --debug flag:
$ node --debug yourfile.js

Additionally, if you use the --debug-brk flag, the node process starts in debug mode with a break on the first line
waiting for a debugger to connect before it executes any JavaScript:
$ node --debug-brk yourfile.js

Once you start a node process in debug mode, by default it listens on port 5858 to accept incoming connections
for debugging (using the V8 TCP based debugging protocol). You can change the port node listens on by passing an
optional value to –debug. For example, the following node process will listen on port 3333 for a debugger to connect.
$ node --debug=3333 yourfile.js
