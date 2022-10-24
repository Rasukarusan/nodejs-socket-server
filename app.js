const http = require('http')
var express = require('express');
var app = express();

// Socket connection

/* Creates new HTTP server for socket */
var socketServer = http.createServer(app);
var io = require('socket.io')(socketServer, {
  cors: {
    origin: "https://admin.local:3212",
    methods: ["GET", "POST"],
    credentials: true
  }
});

/* Listen for socket connection on port 6002 */
socketServer.listen(6002, function(){
console.log('Socket server listening on : 6002');
});

/* This event will emit when client connects to the socket server */
io.on('connection', function(socket){
  console.log('Socket connection established');
});

/* Create HTTP server for node application */
var server = http.createServer(app);

/* Node application will be running on 3000 port */
server.listen(6000);

