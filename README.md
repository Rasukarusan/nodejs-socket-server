# Node.js Socket Server

## Description

[https://github.com/Rasukarusan/nodejs-socket-client](https://github.com/Rasukarusan/nodejs-socket-client) のサーバー。
[http://localhost:6002](http://localhost:6002) にソケットサーバーを立ち上げ、ファイル変更があるとクライアントにメッセージを送信。

```sh
.
└── src/
    ├── client.html // ソケット通信の検証用
    └── server.js // ソケットサーバー
```

## Usage

```sh
yarn install
yarn dev {target_dir}
```

