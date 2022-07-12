//Librairie BeaconScanner modifié pour renvoyer un iBeaconScan plutôt qu'un Beacon dans la fonction "onCallback"
#include <BeaconScanner.h>

SYSTEM_THREAD(ENABLED);

int led = D7;
int ledSwitch(String command);

//Envoi l'évènement d'arrivé ou de départ au Particle Cloud
void onCallback(iBeaconScan& beacon, callback_type type) {
  String event = String(beacon.getUuid()) + String((type == NEW) ? "|Entered" : "|Left");
  WITH_LOCK(Serial){
    Serial.printlnf("UUID: %s. Type: %s", beacon.getUuid(), (type == NEW) ? "Entered" : "Left");
  }

  Particle.publish("beaconEvent", event);
}

void setup() {
  //Setup LED
  pinMode(led, OUTPUT);
  Particle.function("ledSwitch", ledSwitch);

  //Setup scan iBeacon
  BLE.on();
  Scanner.setScanPeriod(3);
  Scanner.setCallback(onCallback);
  Scanner.startContinuous();
}

void loop() {
  Scanner.loop();
}

//Modifie l'état de la LED, si erreur, l'éteint
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