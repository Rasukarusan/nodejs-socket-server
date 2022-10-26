const chokidar = require('chokidar');
const http = require('http')
const express = require('express');
const app = express();
const port = 6002
let globalSocket;

/* Creates new HTTP server for socket */
const socketServer = http.createServer(app);
const io = require('socket.io')(socketServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ソケットサーバー立ち上げ
socketServer.listen(port, function(){
  console.log('Socket server listening on : 6002');
});

// ソケット接続確立
io.on('connection', function(socket){
  console.log('Socket connection established');
  globalSocket = socket
  // @MEMO: ファイル変更検知の用途のみならクライアントからメッセージ受信はないのでコメントアウト
  // クライアントからメッセージを受信
  // socket.on('message', function(data){
  //   socket.send(data)
  // });
});

if (process.argv.length < 3) {
  console.log('\u001b[31m' + '\nError: 監視対象のディレクトリを指定してください' + '\u001b[0m')
  console.log('\u001b[33m' + 'Usage: yarn dev ~/Desktop/hoge\n' + '\u001b[0m')
  process.exit(0)
}

const targetDir = process.argv[2]
console.log('\u001b[35m' + `target = ${targetDir}\n` + '\u001b[0m')

// ファイル変更検知
const opt = {
  ignored: [
    /(^|[\/\\])\../, // ignore dotfiles
    '*.sql'
  ],
  ignoreInitial: true,
}
chokidar.watch(targetDir, opt).on('all', (event, path) => {
  console.log(event, path)
  // クライアントにファイル変更を通知
  if (globalSocket) {
    globalSocket.send('file changed')
  }
});
