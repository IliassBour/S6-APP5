/*
* Iliass Bourabaa - boui225
* Pedro Maria Scoccimarro - scop2401
*/
const fs = require('fs');
const mqtt = require('mqtt')
const express = require('express');
const cors = require('cors');

const fileName = "Arrive et depart pour site 1.txt";

//-----------------
//Expose au serveur React la methode pour avoir toutes les arrivés et sorties
const app = express();
const port_api = 3006;
app.use(cors());

app.get('/deviceUuid', (req, res) => {
  var i = 1;
  var jsonObj = [];

  const allFileContents = fs.readFileSync(fileName, 'utf-8');
  //Copie le contenu du fichier texte dans un tableau
  allFileContents.split(/\r?\n/).forEach(line =>  {
    beacon = {
      id: i,
      deviceUuid: line
    };
    jsonObj.push(beacon);
    i++;
  });

  res.send(JSON.stringify(jsonObj));
})
app.listen(port_api, () => {
  console.log('listening on port 3006');
});
//-----------------

//-----------------
//Enregistre les arrivés et départs envoyé par Relai dans un fichier
const host = 'broker.hivemq.com'
const port_mqtt = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${port_mqtt}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'hivemq',
  password: 'public',
  reconnectPeriod: 1000
});

const topic = 'beaconEvent';
//Subscribe au topic beaconEvent
client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`)
    })
  });

client.on('message', (topic, payload) => {
  var data = JSON.parse(payload);
  fs.appendFile(fileName, "\n" + data.data + "|" + data.published_at,  function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  
    console.log('Received Message:', topic, payload.toString())
});
//-----------------
