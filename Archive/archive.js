const fs = require('fs');
const mqtt = require('mqtt')
const express = require('express');
const cors = require('cors');

const fileName = "Arrive et depart pour site 1.txt";

//Expose to the react server the method to get the list of deviceUuid
const app = express();
const port_api = 3006;
app.use(cors());

app.get('/deviceUuid', (req, res) => {
  var i = 1;
  var jsonObj = [];

  const allFileContents = fs.readFileSync(fileName, 'utf-8');
  allFileContents.split(/\r?\n/).forEach(line =>  {
    beacon = {
      id: i,
      deviceUuid: line
    };
    jsonObj.push(beacon);
    i++;
    /*console.log(`Line from file: ${line}\n`);
    console.log(beacon)*/
  });

  res.send(JSON.stringify(jsonObj));
})
app.listen(port_api, () => {
  console.log('listening on port 3006');
});

const host = 'broker.hivemq.com'
const port_mqtt = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${port_mqtt}`

//Save device uid send by the argon in a file
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'hivemq',
  password: 'public',
  reconnectPeriod: 1000
});

const topic = 'beaconEvent';
client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
      console.log(`Subscribe to topic '${topic}'`)
    })
  });

client.on('message', (topic, payload) => {
  fs.appendFile(fileName, payload.toString(),  function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  
    console.log('Received Message:', topic, payload.toString())
});

