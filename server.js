var http = require('http');
var clientHtml = require('fs').readFileSync('client.html');

var plainHttpServer = http.createServer(function (request, response) { 
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(clientHtml);
}).listen(8080);

var io = require('socket.io').listen(plainHttpServer);
console.log(io);

//io.set('origins', ['localhost:8080', '127.0.0.1:8080']);
io.sockets.on('connection', function (socket) {
    console.log("socket : connect");
    socket.on('message', function (msg) {
        console.log("socket : receive msg!");
        if (msg === 'Hello') {
            socket.send('Socket IO !!');
        }
    });
});

console.log("sockets");
