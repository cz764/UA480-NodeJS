var http = require('http');
var port = 3000;

http.createServer(handleRequest).listen(port);
console.log('starting server on ' + port);

function handleRequest(req, res) {
	var responseStatusCode = 200;
	res.writeHead(responseStatusCode, {'Content-Type':'text/plain'});
//	res.send("hello this is jane");
	res.end('hello');
}

url = "localhost:3000/"

