import React from "react";
import './BeaconList.css'

function Beacon(props) {
    return (
        <div className="beaconComponent">
            <span>{props.deviceUid}</span>
        </div>
    )
}

function BeaconList(props) {
    return(
        <div className="beaconList">
            {props.beacons.map(b => <Beacon key={b.id} deviceUid={b.deviceUid}/>)}
        </div>
    )
}

export default BeaconList;