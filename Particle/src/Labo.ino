#include <BeaconScanner.h>

// argon-id Iliass : E00FCE686573A642729AFA9C
// argon-id Pedro : e00fce6863cefdf77cfb77c9
// UUID Pedro : BD449A80-9122-438A-BD74-08035098BC01
// curl "https://api.particle.io/v1/devices/E00FCE686573A642729AFA9C/compteur?access_token=5c6c83430e75154ac343fde5a570c0ab9096856b"
// curl "https://api.particle.io/v1/events/compt8?access_token=5c6c83430e75154ac343fde5a570c0ab9096856b"

SYSTEM_THREAD(ENABLED);

void onCallback(iBeaconScan& beacon, callback_type type) {
  //Serial.printlnf("Address: %s. Type: %s", beacon.getAddress().toString().c_str(), (type == NEW) ? "Entered" : "Left");   OLD
  Serial.printlnf("UUID: %s. Type: %s", beacon.getUuid(), (type == NEW) ? "Entered" : "Left");
}

int compteur = 0;
void setup() {
  //Particle.variable("compteur", &compteur, INT);

  BLE.on();
  Scanner.setScanPeriod(3);
  Scanner.setCallback(onCallback);
  Scanner.startContinuous();

  //Start iBeacon scan thread
  new Thread("iBeaconThread", iBeaconScanThread);
}

void loop() {
  delay(1000);
  /*compteur++;
  if (compteur%8==0) {
    Particle.publish("compt8", String(compteur));
  }*/

  //Scanner.loop();

  Serial.println("Test 1sec");
}

void iBeaconScanThread(void) {
  while(true){
    Scanner.loop();
  }
}