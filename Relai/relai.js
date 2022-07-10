const EventSource = require("eventsource");
const mqtt = require('mqtt')

const evtSource = new EventSource("https://api.particle.io/v1/events/beaconEvent?access_token=5d1b42115b3ea1893d4e3bf85cad925ee5564a6c");

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

const topic = 'beaconEvent'
evtSource.addEventListener("beaconEvent", function (e) {
  console.log("connect", e.data);
    client.publish(topic, e.data, { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
    console.log("sent")
});
