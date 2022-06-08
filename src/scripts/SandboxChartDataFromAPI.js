const axios = require('axios');

fakeProps = {
    chartDataClimatevariable: "tmpc",
    chartDataLocation: "CA",
    chartDataPeriod: "2006-2099",
    chartDataRegion: "State",
    chartDataSeason: "ann",
    chartLineChart: "year",
    chartOnlyProp: "no"
}

const DataPeriodMismatchError = () => {
    // Handle data period mismatch if data period is not equal to 2006-2099.
    console.log("SandboxChartDataFromAPI --> SandboxPropsToJSON --> fakeProps error: Data period mismatch");
};

const SandboxPropsToJson = (props) => {
    request = {
        "grid": "loca:allMax:rcp85",
        "sdate": props.chartDataPeriod === "2006-2009" ? "2006-01-01" : DataPeriodMismatchError(),
        "edate": props.chartDataPeriod === "2006-2009" ? "2099-12-31" : DataPeriodMismatchError(),
        "elems": [
            {
                "name": props.chartDataClimatevariable,
                "interval": "yly",
                "duration": "yly",
                "reduce": "mean",
                "units": "degreeF", 
                "area_reduce": "state_mean"
            }
        ],
        "state": props.chartDataLocation
    }

    return request;
};

const SandboxChartDataFromAPI = (request) => {
    axios.post('https://grid2.rcc-acis.org/GridData', request)
    .then(function (response) {
        console.log(response);
    });
};

SandboxChartDataFromAPI(SandboxPropsToJson(fakeProps));
