
import './App.css';
import BeaconList from './BeaconList';

function flashLed() {

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
          <button className="ledButton" onClick={flashLed}>Allumer/Eteindre LED</button>
      </header>
    </div>
  );
}

export default App;
