'use strict'


var audioSource = document.querySelector('select#audioSource');
var audioOutput = document.querySelector('select#audioOutput');
var videoSource = document.querySelector('select#videoSource')
var videoplay = document.querySelector('video#player');
function gotDevices(deviceInfos) {
    deviceInfos.forEach(function (deviceInfo) {

        var option = document.createElement('option')
        option.text = deviceInfo.label;
        option.value = deviceInfo.deviceId;

        if (deviceInfo.kind === 'audioiput') {
            audioSource.appendChild(option);
        }else if (deviceInfo.kind === 'audiooutput') {
            audioOutput.appendChild(option);
        }else if (deviceInfo.kid === 'videoinput') {
            videoSource.appendChild(option);
        }

    });
}

function gotMediaStream(stream) {
    videoplay.srcObject = stream;
    return navigator.mediaDevices.enumerateDevices();
}
function handleError(err) {
    console.log('getUserMedia error:', err);
}



if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    console.log('getUserMedia is not supported!');
}else{

    var constraints = {
        video : true,
        audio : true
    }
    navigator.mediaDevices.getUserMedia(constraints)
        .then(gotMediaStream)
        .then(gotDevices)
        .catch(handleError);
}
