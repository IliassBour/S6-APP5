
import './App.css';
import BeaconList from './BeaconList';

function ledSwitch() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3006/ledSwitch", false);
  xhttp.send();
}

//List de test à remplacer par la list provenant du cloud
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
