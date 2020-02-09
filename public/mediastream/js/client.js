'use strict'


var audioSource = document.querySelector('select#audioSource');
var audioOutput = document.querySelector('select#audioOutput');
var videoSource = document.querySelector('select#videoSource')
//var videoplay = document.querySelector('video#player');

var audioplayer = document.querySelector('audio#audioplayer');

var snapshot = document.querySelector('button#snapshot');
var picture = document.querySelector('canvas#picture');

var divConstraints = document.querySelector('div#constraints');

picture.width = 320;
picture.height = 240;



var filtersSelect = document.querySelector('select#filter');

function gotDevices(deviceInfos) {
    deviceInfos.forEach(function (deviceInfo) {

        var option = document.createElement('option')
        option.text = deviceInfo.label;
        option.value = deviceInfo.deviceId;

        if (deviceInfo.kind === 'audioinput') {
            audioSource.appendChild(option);
        } else if (deviceInfo.kind === 'audiooutput') {
            audioOutput.appendChild(option);
        } else if (deviceInfo.kind === 'videoinput') {
            videoSource.appendChild(option);
        }

    });
}

function gotMediaStream(stream) {
    videoplay.srcObject = stream;
    var videoTrack = stream.getVideoTracks();
    var videoConstraints = videoTrack.getSettings();
    divConstraints.textContent = JSON.stringify(videoConstraints, null, 2);

    //audioplayer.srcObject = stream;
    return navigator.mediaDevices.enumerateDevices();
}

function handleError(err) {
    console.log('getUserMedia error:', err);
}

function start() {


    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia is not supported!');
    } else {

        var deviceId = videoSource.value;
        var constraints = {
            video: {
                width: 640,
                height: 480,
                frameRate: 30,
                facingMode:'enviroment',
                deviceId: deviceId ? deviceId : undefined
            },

            audio: {
                noiseSuppression: true,
                echoCancellation: true
            },


        }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(gotMediaStream)
            .then(gotDevices)
            .catch(handleError);
    }
}

start();
videoSource.onchange = start;
filtersSelect.onchange=function () {
    videoplay.className = filtersSelect.value;
}

snapshot.onclick = function () {
    picture.getContext('2d').drawImage(videoplay, 0, 0, picture.width, picture.height);
}