const http = require('http')
const express = require('express');
const app = express();

// Socket connection

/* Creates new HTTP server for socket */
const socketServer = http.createServer(app);
const io = require('socket.io')(socketServer, {
  cors: {
    origin: "*",
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

  // クライアントからメッセージを受信
  socket.on('exec', function(data){
    console.log('メッセージ受信:', data)
    socket.emit('iam', data)
  });
});



/* Create HTTP server for node application */
const server = http.createServer(app);

/* Node application will be running on 3000 port */
server.listen(6000);

