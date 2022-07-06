#include "BeaconScanner.h";

// id Iliass : E00FCE686573A642729AFA9C 
// curl "https://api.particle.io/v1/devices/E00FCE686573A642729AFA9C/compteur?access_token=5c6c83430e75154ac343fde5a570c0ab9096856b"
// curl "https://api.particle.io/v1/events/compt8?access_token=5c6c83430e75154ac343fde5a570c0ab9096856b"


void onCallback(Beacon& beacon, callback_type type) {
  Log.trace("Address: %s. Type: %s", beacon.getAddress().toString().c_str(), (type == NEW) ? "Entered" : "Left");
}


int compteur = 0;
void setup() {
  //Particle.variable("compteur", &compteur, INT);

  BLE.on();
  Scanner.setCallback(onCallback);
  Scanner.startContinuous();
}

void loop() {
  delay(1000);
  /*compteur++;
  if (compteur%8==0) {
    Particle.publish("compt8", String(compteur));
  }*/

  Scanner.loop();
}