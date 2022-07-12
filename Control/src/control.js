/*
* Iliass Bourabaa - boui225
* Pedro Maria Scoccimarro - scop2401
*/

//DEPENDENCIES
const express = require('express');
var https = require('https');

//MAIN
const app = express();

//API pour allumer ou éteindre la LED
app.get('/ledSwitch', function (req, res) {
    var params = new URLSearchParams({access_token: "5d1b42115b3ea1893d4e3bf85cad925ee5564a6c"})
    var postData = params.toString();
    var options = {
        host: 'api.particle.io',
        path: '/v1/devices/e00fce6863cefdf77cfb77c9/ledSwitch',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    var httpreq = https.request(options, function(response) {
        response.setEncoding('utf8');
        
        response.on('data', function (chunk) {
            console.log("body: " + chunk);
        });
        
        response.on('end', function() {
            res.send('ok');
        })
    });

    httpreq.write(postData);
    httpreq.end();
})

console.log('Control started');
app.listen(3007);