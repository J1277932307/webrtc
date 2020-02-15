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

/*io.sockets.on('connection',(socket)=>{

    socket.on('message',(room,data)=>{
        socket.to(room).emit('message',root,socket.id,data);
    });
    socket.on('join',(room)=>{

        socket.join(room);
        var myRoom = io.sockets.adapter.rooms[room];
        var users = Object.keys(myRoom.sockets).length;
        logger.log('the nuber of user in room is:' + users);

        if(users < 3){
            socket.emit('joined', room, socket.id);
            if(users >1){
                socket.to(room).emit('otherjoin',room);
            }
        }else{
            socket.leave(room);
            socket.emit('full', room, socket.id);
        }
        //socket.emit('joined',room,socket.id);
        //socket.to(room).emit('joined',rootm,socket.id); //除自己外，房间内所有人
        //io.in(room).emit('joined',room,socket.id);  //房间内所有人
        //socket.broadcast.emit('joined',room,socket.id); //除自己，节点上全部
    });

    socket.on('leave',(room)=>{

        var myRoom = io.sockets.adapter.rooms[room];
        var users = Object.keys(myRoom.sockets).length;


        logger.log('the nuber of user in room is:' + (users ? users -1 : users));
        socket.leave(room);
        socket.to(room).emit('bye',room,socket.id);
        socket.emit('leaved',room,socket.id);
        //socket.emit('joined',room,socket.id);
        //socket.to(room).emit('joined',rootm,socket.id); //除自己外，房间内所有人
        //io.in(room).emit('joined',room,socket.id);  //房间内所有人
        //socket.broadcast.emit('joined',room,socket.id); //除自己，节点上全部
    });
})*/
sockio.sockets.on('connection', (socket)=>{

    socket.on('message', (room, data)=>{
        socket.to(room).emit('message', room, socket.id, data)//房间内所有人
    });

    socket.on('join', (room)=> {
        socket.join(room);
        var myRoom = sockio.sockets.adapter.rooms[room];
        var users = Object.keys(myRoom.sockets).length;
        logger.log('the number of user in room is: ' + users);
        socket.emit('joined', room, socket.id);
        //socket.to(room).emit('joined', room, socket.id);//除自己之外
        //io.in(room).emit('joined', room, socket.id)//房间内所有人
        //socket.broadcast.emit('joined', room, socket.id);//除自己，全部站点
    });

    socket.on('leave', (room)=> {
        var myRoom = sockio.sockets.adapter.rooms[room];
        var users = Object.keys(myRoom.sockets).length;
        //users - 1;

        logger.log('the number of user in room is: ' + (users-1));

        socket.leave(room);
        socket.emit('leaved', room, socket.id);
        //socket.to(room).emit('joined', room, socket.id);//除自己之外
        //io.in(room).emit('joined', room, socket.id)//房间内所有人
        //socket.broadcast.emit('joined', room, socket.id);//除自己，全部站点
    });
});




https_server.listen(4433, '0.0.0.0');

