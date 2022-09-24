import { SystemUpdate } from '@material-ui/icons';
import React, { useState } from 'react';

// Look at https://www.rcc-acis.org/docs_webservices.html
const axios = require('axios');

//--------------------------------------------------------------------------------------------------------
// 3. Use React state instead of passing in URLs.
//--------------------------------------------------------------------------------------------------------

export default function HandleClimatePost(props) {

    let urlParams = new URLSearchParams(window.location.search);

    const URLClimateVariable = urlParams.get('climatevariable');
    const URLLocation = urlParams.get('location');

    let reduce;
    let units;
    
    if (URLClimateVariable === "cddc" || URLClimateVariable === "hddc" || URLClimateVariable === "pcpn") {
        reduce = "sum";
        units = "inch";
    } else if (URLClimateVariable === "tmax" || URLClimateVariable === "tmin" || URLClimateVariable === "tmpc") {
        reduce = "mean";
        units = "degreeF";
    } else {
        console.log("An error has occurred.");
        return;
    }

    let locationKey = (URLLocation === "" ? "bbox" : "state");
    let locationValue = (URLLocation === "" ? "-124.848974,24.396308,-66.885444,49.384358" : URLLocation);

    axios.post('https://grid2.rcc-acis.org/GridData', {
        "grid": "loca:allMax:rcp85",
        "sdate": "2006-01-01",
        "edate": "2099-12-31",
        "elems": [
            {
                "name": formatClimateVariable(URLClimateVariable),
                "interval": "yly",
                "duration": "yly",
                "reduce": reduce,
                "units": units, 
                "area_reduce": "state_mean"
            }
        ],
        [locationKey] : locationValue
    })    
    .then(function (response) {
        if (URLLocation === "") {
            let data = response.data.data;

            for (let i = 0; i < data.length; i++) {
                const dataArray = Object.values(data[i][1]);
                data[i][1] = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            }
        }
        console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });
}

function formatClimateVariable(URLClimateVariable) {

    // Format climate variable
    switch (URLClimateVariable) {
        case 'cddc':
            return 'cdd';

        case 'hddc':
            return 'hdd';

        case 'pcpn':
            return 'pcpn';

        case 'tmax':
            return 'maxt';

        case 'tmin':
            return 'mint';

        case 'tmpc':
            return 'avgt';

        default:
            console.log("Something went wrong!");
            break;
    }
} 