/*
* Iliass Bourabaa - boui225
* Pedro Maria Scoccimarro - scop2401
*/
import './App.css';
import BeaconList from './BeaconList';

//Méthode pour GET l'api de Control
function ledSwitch() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3007/ledSwitch", false);
  xhttp.send();
}

//List de test
const beacons = [
  {id:1 , deviceUuid:"Cell Iliass"},
  {id:2 , deviceUuid:"Cell Pedro"},
  {id:3 , deviceUuid:"Cell Amaury"},
  {id:4 , deviceUuid:"Cell Paul"},
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <BeaconList beacons={beacons}></BeaconList>
          <button className="ledButton" onClick={ledSwitch}>Allumer/Eteindre LED</button>
      </header>
    </div>
  );
}

export default App;
