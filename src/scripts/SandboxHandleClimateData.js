const axios = require('axios');

// This function only works for state-level posts.
export default function HandleClimatePost() {

    // check url parameters frist for values
    const urlParams = new URLSearchParams(window.location.search);

    // check url parameters for the region if none make it blank
    const URLRegion = urlParams.get('region') ? urlParams.get('region') : '';

    // check url parameters for a location if none make it blank
    const URLLocation = urlParams.get('location') ? urlParams.get('location') : '';

    // check url parameters for a climatevariable if none make it blank
    const URLClimatevariable = urlParams.get('climatevariable') ? urlParams.get('climatevariable') : '';

    // check url parameters for a period variable if none make it blank
    const URLPeriod = urlParams.get('period') ? urlParams.get('period') : '1900-current';

    // check url parameters for season data it blank make yearly
    const URLSeason = urlParams.get('season') ? urlParams.get('season') : 'yearly';
    
    console.log('Hello there! Getting your post data!');
    axios.post('https://grid2.rcc-acis.org/GridData' , {
        "grid": "loca:allMax:rcp85",
        "sdate": "2006-01-01",
        "edate": "2099-12-31",
        "elems": [
            {
                "name": "avgt",
                "interval": "yly",
                "duration": "yly",
                "reduce": "mean",
                "units": "degreeF",
                "area_reduce": "state_mean"
            }
        ],
        "state": URLLocation
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });
}