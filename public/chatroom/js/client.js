'use strict'

var userName = document.querySelector('input#username');
var inputRoom = document.querySelector('input#room');
var btnConnect = document.querySelector('button#connect');
var btnLeave = document.querySelector('button#leave');
var outputArea = document.querySelector('textarea#output');
var inputArea = document.querySelector('textarea#input');
var btnSend = document.querySelector('button#send');

var socket;
var room;


btnConnect.onclick = ()=>{
    //连接到服务器
    socket = io.connect();

    socket.on('joined',(room,id)=>{
        btnConnect.disabled = true;
        inputArea.disabled = false;
        btnSend.disabled = false;
        btnLeave.disabled = false;

    });

    socket.on('leaved',(room,id)=>{
        btnConnect.disabled = false;
        inputArea.disabled = true;
        btnSend.disabled = true;
        btnLeave.disabled = true;
    });

    socket.on('message',(room,id,data)=>{
        outputArea.scrollTop = outputArea.scrollHeight;
        outputArea.value = outputArea.value + data + '\r';
    });

    socket.on('disconnect', (socket)=>{
        btnConnect.disabled = false;
        btnLeave.disabled = true;
        inputArea.disabled = true;
        btnSend.disabled = true;
    });

    room = inputRoom.value;
    socket.emit('join',room);
}

btnSend.onclick = ()=>{
    var data = inputArea.value;
    data = userName.value+':'+data;
    socket.emit('message',room,data);
    inputArea.value = '';
}


btnLeave.onclick = ()=>{
    room = inputRoom.value;
    socket.emit('leave', room);
}


inputArea.onkeypress = (event)=> {
    //event = event || window.event;
    if (event.keyCode == 13) { //回车发送消息
        var data = inputArea.value;
        data = userName.value + ':' + data;
        socket.emit('message', room, data);
        inputArea.value = '';
        event.preventDefault();//阻止默认行为
    }
}
