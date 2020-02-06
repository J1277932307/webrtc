'use strict'


var audioSource = document.querySelector('select#audioSource');
var videoSource = document.querySelector('select#videoSource');
var audioOutput = document.querySelector('select#audioOutput');

var videoplay = document.querySelector('video#player');
function gotMediaStream(stream) {
    videoplay.srcObject = stream;
    return navigator.mediaDevices.enumerateDevices();
}



function gotDevices(deviceInfos) {
    deviceInfos.forEach(function (deviceInfo) {

        var option = document.createElement('option');
        option.text = deviceInfo.label;
        option.value = deviceInfo.deviceId;

        if (deviceInfo.kind === 'audioinput') {
            audioSource.appendChild(option);
        } else if (deviceInfo.kind === 'videoinput') {
            videoSource.appendChild(option);
        } else if (deviceInfo.kind === 'audiooutput') {
            audioOutput.appendChild(option);
        }

    });
}

function handleError(err) {
    console.log('getUserMedia error:', err);
}

if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia is not supported!');
} else {
    var constraints  = {
        video : {
            width:320,
            height:240
        },
        audio : true
    }

    navigator.mediaDevices.getUserMedia(constraints)
        .then(gotMediaStream)
        .then(gotDevices)
        .catch(handleError)
}