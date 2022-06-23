// Look at https://www.rcc-acis.org/docs_webservices.html
const axios = require('axios');

// check url parameters frist for values
let urlParams = new URLSearchParams(window.location.search);

// This function only works for state-level posts.
export default function HandleClimatePost(props) {

    console.log(props);

    // Updates the URL in urlParams in order to account for changed variables.
    urlParams = new URLSearchParams(window.location.search);

    // check url parameters for a location if none make it blank
    const URLLocation = urlParams.get('location') ? urlParams.get('location') : '';

    axios.post('https://grid2.rcc-acis.org/GridData' , {
        "grid": "loca:allMax:rcp85",
        "sdate": "2006-01-01",
        "edate": "2099-12-31",
        "elems": [
            {
                "name": ClimateVariableSelector(), // This is URLClimateVariable. See Table 3 of StnMeta at https://www.rcc-acis.org/docs_webservices.html Modify to get average min and max.
                "interval": "yly", // Returns data for every day or year in the duration thereof. See table 2 of StnMeta // Think about changing this interval for daily for more accurate data.
                "duration": "yly", // How long the data goes for. This combined with interval returns a data point for every day in a month, for example. See table 2 of StnMeta
                "reduce": ClimateReduceSelector(), // Summarizes the data. 
                "units": ((
                            urlParams.get('climatevariable') == 'cddc' ||
                            urlParams.get('climatevariable') == 'hddc' ||
                            urlParams.get('climatevariable') == 'pcpn'
                          ) ? "" : "degreeF"), 
                "area_reduce": "state_mean" // Returns the state_mean using the mean summarization from reduce. //
            }
        ],
        "state": ((
                    urlParams.get('climatevariable') == 'cddc' ||
                    urlParams.get('climatevariable') == 'hddc' ||
                    urlParams.get('climatevariable') == 'pcpn'
                ) ? "" : URLLocation) // Replace with urlParams.get('location') ? urlParams.get('location') : (region accessor ? region accessor : (national bound)) when it actually works. // Look up bounding box
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });
}

const ClimateVariableSelector = () => {

    // check url parameters for a climatevariable if none make it blank
    const URLClimateVariable = urlParams.get('climatevariable') ? urlParams.get('climatevariable') : '';

    switch (URLClimateVariable) {
        // Cooling degree days, heating degree days, and precipitation is not applicable here.
        case 'cddc':
            return 'cdd';

        case 'hddc':
            return 'hdd'

        case 'pcpn':
            return 'pcpn'

        case 'tmax':
            return 'maxt';

        case 'tmin':
            return 'mint';

        case 'tmpc':
            return 'avgt';
    }
}

const ClimateReduceSelector = () => {

    const URLClimateVariable = urlParams.get('climatevariable') ? urlParams.get('climatevariable') : '';

    switch (URLClimateVariable) {
        case 'cdd':
        case 'hdd':
        case 'pcpn':
            return 'sum'; 
        
        case 'tmax':
        case 'tmin':
        case 'tmpc':
            return 'mean';
    }
}

// Redo function with cdd hdd and pcpn in mind.