// https://stackoverflow.com/questions/16190028/node-js-listen-for-udp-and-forward-to-connected-http-web-clients
var static = require('node-static');
var http = require('http');
var fs = require('fs');

var file = new(static.Server)(__dirname);

const server = http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(8080);

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', function (socket) {
  socket.emit('message', 'connected');
  console.log("socket connected");
});

var dgram = require('dgram');

//Initialize a UDP server
var srv = dgram.createSocket("udp4");
srv.on("message", function (msg, rinfo) {
  //console.log("udp datagram from " + rinfo.address + ":" + rinfo.port);
  var buf = Buffer.from(msg);
  var message = {
    distance_cm: buf.readInt16LE(2),
    strength: buf.readInt16LE(4)
  }
  io.emit('message', message);
});

srv.on("connect", function (msg, rinfo) {
  console.log("connection");
});

srv.on("listening", function () {
  var address = srv.address();
  console.log("listening on udp:" + address.address + ":" + address.port);
});

srv.on('error', function (err) {
  console.error(err);
  process.exit(0);
});

srv.bind(8081);

