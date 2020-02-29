'use strict'

var localVideo = document.querySelector('video#localvideo');
var remoteVide = document.querySelector('video#remotevideo');
var btnStart = document.querySelector('button#start');
var btnCall = document.querySelector('button#call')
var btnHangup = document.querySelector('button#hangup');

var localStream;

function getMediaStream(stream) {
    localVideo.srcObject = stream;
    localStream = stream;
}

function handleError(err) {
    console.error('Failed to get Medai Stream!', err);
}

function start(){
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('the getUserMedia is not supported!');
        return;
    } else {
        var constraints = {
            video:true,
            audio:false
        }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(getMediaStream)
            .catch(handleError);
    }
}


btnStart.onclick = start;
btnCall.onclick = call;
btnHangup.onclick = hangup;



