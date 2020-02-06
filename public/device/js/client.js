'use strict'

var audioSource = document.querySelector("select#audioSource");
var audioOutput = document.querySelector("select#audioInput");
var videoSource = document.querySelector("select#videoInput");

var constraints = {
    video:true,
    audio:true
}

if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log('enumerateDevices is not supported!');
} else {
    navigator.mediaDevices.getUserMedia(constraints);
    navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
}

function gotDevices(deviceInfos) {
    deviceInfos.forEach(function (deviceInfo) {
        console.log("-----kind = " + deviceInfo.kind + "\n-----label = " + deviceInfo.label + "\n------id = " + deviceInfo.deviceId + "\n-----groupId = " + deviceInfo.groupId);

        var option = document.createElement('option');
        option.text = deviceInfo.label;
        option.value = deviceInfo.deviceId;

        if (deviceInfo.kind === 'audioinput') {
            audioSource.appendChild(option);
        }else if (deviceInfo.kind === 'videoinput') {
            videoinput.appendChild(option);
        }else if (deviceInfo.kind === 'audiooutput') {
            audioOutput.appendChild(option);
        } else {

        }
    })
}

function handleError(err) {
    console.log(err.name + " : " + err.message);
}