'use strict';


var AWS = require('aws-sdk');
var fs = require('fs');

// Create an Polly client
var Polly = new AWS.Polly({ signatureVersion: 'v4', region: 'us-east-2' });



exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    var params = {
        'Text': event.orderstatusText,
        'OutputFormat': 'mp3',
        'VoiceId': 'Kimberly'
    };


    Polly.synthesizeSpeech(params, function (err, data) {
        if (err) {
            console.log(err.code);
            callback(err, null);
        } else {
            if (data.AudioStream instanceof Buffer) {

                //upload file to S3
                var s3 = new AWS.S3();
                var uploadParams = { Bucket: "gopizza-web-hosting", Key: 'orderstatus.mp3', Body: data.AudioStream, ACL: "public-read" };
                s3.upload(uploadParams, function (err, data) {
                    if (err) {
                        console.log("Error", err);
                    } if (data) {
                        console.log("Upload Success", data.Location);
                    }
                });

            }
            //callback(null, true);
            callback(null, { "orderstatusText": event.orderstatusText });
        }
    });
};

