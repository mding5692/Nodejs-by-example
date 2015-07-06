var http = require("http");
// program written as client-server program where Hello World is displayed on port 3000
http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("Hello World!");
	res.end();

}).listen(3000);
