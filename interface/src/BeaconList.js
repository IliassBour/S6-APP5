import React, { useEffect } from "react";
import './BeaconList.css';



function Beacon(props) {
    var beaconData= props.deviceUuid.split("|");

    return (
        <div className="beaconComponent">
            <span className="component">Device Uuid : {beaconData[0]}</span>
            <span className="component">Event : {beaconData[1]}</span>
            <span className="component">Published at : {beaconData[2]}</span>
        </div>
    )
}

function BeaconList(props) {
    const [beacons, setBeacons] = React.useState(props.beacons);

    useEffect(() => {
        const timer = setInterval(refreshList, 5000);
        return () => clearInterval(timer);
    }, []);

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
            {beacons.map(b => <Beacon key={b.id} deviceUuid={b.deviceUuid}/>)}
        </div>
    )
}

export default BeaconList;