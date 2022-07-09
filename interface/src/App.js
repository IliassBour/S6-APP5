
import './App.css';
import BeaconList from './BeaconList';

function flashLed() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3006/deviceUid", false);
  xhttp.send();

  const deviceUid = JSON.parse(xhttp.responseText);
  /*fetch('http://localhost:3006/deviceUid')
        .then(response => {console.log(response);response.json();})
        .then(data => console.log(data));*/
  console.log(deviceUid);
}

//List de test à remplacer par la list provenant du cloud
const beacons = [
  {id:1 , deviceUid:"Cell Iliass"},
  {id:2 , deviceUid:"Cell Pedro"},
  {id:3 , deviceUid:"Cell Amaury"},
  {id:4 , deviceUid:"Cell Paul"},
  {id:5 , deviceUid:"Cell Paul"},
  {id:6 , deviceUid:"Cell Paul"},
  {id:7 , deviceUid:"Cell Paul"},
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <BeaconList beacons={beacons}></BeaconList>
          <button className="ledButton" onClick={flashLed}>Allumer/Eteindre LED</button>
      </header>
    </div>
  );
}

export default App;
