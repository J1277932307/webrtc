'use strict'

var http = require('http');
var https = require('https');
var fs = require('fs');
var socketIo = require('socket.io');
var log4js = require('log4js');

var express = require('express');
var serveIndex = require('serve-index');

var app = express();

log4js.configure({
    appenders: {
        file: {
            type: 'file',
            filename: 'app.log',
            layout: {
                type: 'pattern',
                pattern: '%r %p - %m',
            }
        }
    },
    categories: {
        default: {
            appenders: ['file'],
            level: 'debug'
        }
    }
});

var logger = log4js.getLogger();




app.use(serveIndex('./public'));
app.use(express.static('./public'));
//http server
var http_server = http.createServer(app);
http_server.listen(8080, '0.0.0.0');

//http server
var options = {
    key  : fs.readFileSync('./cert/3339884_jiangkan.xyz.key'),
    cert : fs.readFileSync('./cert/3339884_jiangkan.xyz.pem')
}
var https_server = https.createServer(options, app);
var io = socketIo.listen(https_server);

io.sockets.on('connection',(socket)=>{
    socket.on('join',(room)=>{
        socket.join(room);
        var myRoom = io.sockets.addpter.rooms[room];
        var users = Object.keys(myRoom.sockets).length;
        logger.log('the nuber of user in room is:' + users);
        //socket.emit('joined',room,socket.id);
        //socket.to(room).emit('joined',rootm,socket.id); //除自己外，房间内所有人
        //io.in(room).emit('joined',room,socket.id);  //房间内所有人
        socket.broadcast.emit('joined',room,socket.id); //除自己，节点上全部
    });

    socket.on('leave',(room)=>{

        var myRoom = io.sockets.addpter.rooms[room];
        var users = Object.keys(myRoom.sockets).length;

        socket.leave(room);
        logger.log('the nuber of user in room is:' + users - 1);
        //socket.emit('joined',room,socket.id);
        //socket.to(room).emit('joined',rootm,socket.id); //除自己外，房间内所有人
        //io.in(room).emit('joined',room,socket.id);  //房间内所有人
        socket.broadcast.emit('joined',room,socket.id); //除自己，节点上全部
    });
})
https_server.listen(4433, '0.0.0.0');

