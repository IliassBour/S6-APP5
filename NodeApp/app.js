const EventSource = require("eventsource");
const mqtt = require('mqtt')

const evtSource = new EventSource("https://api.particle.io/v1/events/compt8?access_token=5c6c83430e75154ac343fde5a570c0ab9096856b");

const host = 'broker.hivemq.com'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'hivemq',
    password: 'public',
    reconnectPeriod: 1000
  })

const topic = 'compt8'
evtSource.addEventListener("compt8", function (e) {
  console.log("connect", e.data);
    client.publish(topic, e.data, { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
    console.log("sent")
});

/*var counter;

const https =  require("https")


counter = https.get("https://api.particle.io/v1/devices/E00FCE686573A642729AFA9C/compteur?access_token=5c6c83430e75154ac343fde5a570c0ab9096856b", res => {

    let rawData = ''

    res.on('data', chunk => {
        rawData += chunk
    })
    
    res.on('end', () => {
    const parsedData = JSON.parse(rawData)
    console.log(parsedData)
    })
})*/
