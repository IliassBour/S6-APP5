import React from "react";
import './BeaconList.css';



function Beacon(props) {
    return (
        <div className="beaconComponent">
            <span>{props.deviceUuid}</span>
        </div>
    )
}

function BeaconList(props) {
    const [beacons, setBeacons] = React.useState(props.beacons);

    function refreshList() {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:3006/deviceUuid", false);
        xhttp.send();

        var deviceUuid = JSON.parse(xhttp.responseText);
        console.log(deviceUuid);

        setBeacons(deviceUuid);
    }

    return(
        <div className="beaconList">
            <button onClick={refreshList}>Refresh</button>
            {beacons.map(b => <Beacon key={b.id} deviceUuid={b.deviceUuid}/>)}
        </div>
    )
}

export default BeaconList;