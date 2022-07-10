#include <BeaconScanner.h>

// argon-id Iliass : E00FCE686573A642729AFA9C
// argon-id Pedro : e00fce6863cefdf77cfb77c9
// UUID Pedro : BD449A80-9122-438A-BD74-08035098BC01
// Pedro access token: 5d1b42115b3ea1893d4e3bf85cad925ee5564a6c
// VARIABLE curl "https://api.particle.io/v1/devices/e00fce6863cefdf77cfb77c9/compteur?access_token=5d1b42115b3ea1893d4e3bf85cad925ee5564a6c"
// FUNCTION curl "https://api.particle.io/v1/devices/e00fce6863cefdf77cfb77c9/ledSwitch -d access_token=5d1b42115b3ea1893d4e3bf85cad925ee5564a6c"
// EVENT curl "https://api.particle.io/v1/events/compt8?access_token=5d1b42115b3ea1893d4e3bf85cad925ee5564a6c"

SYSTEM_THREAD(ENABLED);

int led = D7;
int ledSwitch(String command);

void onCallback(iBeaconScan& beacon, callback_type type) {
  String event = String(beacon.getUuid()) + String((type == NEW) ? "|Entered" : "|Left");
  WITH_LOCK(Serial){
    Serial.printlnf("UUID: %s. Type: %s", beacon.getUuid(), (type == NEW) ? "Entered" : "Left");
  }

  //Particle.publish("deviceUUID", event);
}

void setup() {
  pinMode(led, OUTPUT);
  Particle.function("ledSwitch", ledSwitch);

  BLE.on();
  Scanner.setScanPeriod(3);
  Scanner.setCallback(onCallback);
  Scanner.startContinuous();
}

void loop() {
  Scanner.loop();
}

int ledSwitch(String command){
  int ledState = digitalRead(led);

  switch(ledState){
    case HIGH:
      digitalWrite(led, LOW);
      break;

    case LOW:
      digitalWrite(led, HIGH);
      break;

    default:
      digitalWrite(led, LOW);
      return 0;
  }

  return 1;
}