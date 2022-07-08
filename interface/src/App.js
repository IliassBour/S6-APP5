
import './App.css';
import BeaconList from './BeaconList';

function flashLed() {
  console.log("Led flash");
}

//List de test à remplacer par la list provenant du cloud
const beacons = [
  {id:1 , name:"Cell Iliass"},
  {id:2 , name:"Cell Pedro"},
  {id:3 , name:"Cell Amaury"},
  {id:4 , name:"Cell Paul"},
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <button className="ledButton" onClick={flashLed}>Cligner la led</button>
          <BeaconList beacons={beacons}></BeaconList>
      </header>
    </div>
  );
}

export default App;
