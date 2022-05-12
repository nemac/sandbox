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
    const URLSeason = urlParams.get('season') ? urlParams.get('season') : 'yly';
    
    // Look at https://www.rcc-acis.org/docs_webservices.html
    console.log('Hello there! Getting your post data!');
    axios.post('https://grid2.rcc-acis.org/GridData' , {
        "grid": "loca:allMax:rcp85",
        "sdate": "2006-01-01",
        "edate": "2099-12-31",
        "elems": [
            {
                "name": "avgt", // This is URLClimateVariable. See Table 3 of StnMeta at https://www.rcc-acis.org/docs_webservices.html Modify to get average min and max.
                "interval": "yly", // Returns data for every day or year in the duration thereof. See table 2 of StnMeta // Think about changing this interval for daily for more accurate data.
                "duration": "yly", // How long the data goes for. This combined with interval returns a data point for every day in a month, for example. See table 2 of StnMeta
                "reduce": "mean", // Summarizes the data. 
                "units": "degreeF", 
                "area_reduce": "state_mean" // Returns the state_mean using the mean summarization from reduce. //
            }
        ],
        "state": URLLocation // Replace with urlParams.get('location') ? urlParams.get('location') : (region accessor ? region accessor : (national bound)) when it actually works.
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });
}