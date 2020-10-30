import React, { useEffect, useState } from 'react';
import './App.css';
import SandboxPlotRegion from './SandboxPlotRegion.js';
import SandboxGeneratePlotData from './SandboxGeneratePlotData.js';
import SandboxClimateVariable from './SandboxClimateVariable.js';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import blueGrey from '@material-ui/core/colors/blueGrey';

import SandboxSlider from './SandboxSlider.js';
import SandboxSelector from './SandboxSelector.js';
import SandboxDataCheck from './SandboxDataCheck.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
library.add(faChartLine);

const axios = require('axios');

const bgChart = blueGrey[50];
const bgSelect = blueGrey[50];
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    color: "#5C5C5C",
    height: '100vh',
    [theme.breakpoints.down('xs')]: {
      overflow: 'scroll',
    },
  },
  header: {
    height: '60px',
    maxHeight: '60px',
    color: "#5C5C5C",
  },
  headerIcon: {
    display: 'inline-flex',
  },
  varriableSelectors: {
    height: '90px',
    maxHeight: '90px',
  },
  checkBox: {
    height: '90px',
    maxHeight: '90px',
  },
  divider: {
    height: '15px',
    maxHeight: '15px',
  },
  yearSlider: {
    height: '100px',
    maxHeight: '100px',
  },
  selectionArea: {
    height: '250px',
    maxHeight: '250px',
    backgroundColor: "#FBFCFE",
    border: "1px solid #E6E6E6",
    borderRadius: "4px",
    [theme.breakpoints.down('xs')]: {
      height: '500px',
    },

  },
  selectionAreaHolder: {
    margin: "6px",
    [theme.breakpoints.down('xs')]: {
      height: '100vh',
      maxHeight: '500px',
    },
  },
  chartRegion: {
    height: 'calc(100% - 250px)',
    [theme.breakpoints.down('xs')]: {
      height: '500px',
    },
  },
  chartBg: {
    backgroundColor: bgChart,
  }
}));

const RegionItems = [
  'National',
  'Regional',
  'State',
];

const locatioNationalItems = [
  'National',
];

const locationRegionalItems = [
  'Northeast',
  'Southeast',
  'Midwest',
  'Northern Great Plains',
  'Northwest',
  'Southwest',
  'Southern Great Plains',
  'Alaska','Hawaii',
  'Puerto Rico',
];

const locationStateItems = [
  'AK',
  'AL',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'VI',
  'WA',
  'WV',
  'WI',
  'WY',
];

const loadNCAdata = async () => {
  await axios.get('./TSU_Sandbox_Datafiles/index.json')
    .then( (response) => {
      // handle success
      return response.data;
    })
    .catch((error) => {
      // handle error
      console.error(`SanboxControls.loadNCADdata() error: ${error}`);
      return [''];
  })
};

export default function SandboxControls() {
  const classes = useStyles();
  const [sliderValues, setsliderValues] = useState([1900, 2018]);
  const [sliderMinxMaxValues, setSliderMinxMaxValues] = useState([1900, 2018]);

  const [useRobust, setUseRobust] = useState(false);
  const [useRobustClicked, setUseRobustClicked] = useState(false);

  const [region, setRegion] = useState('');
  const [location, setLocation] = useState('');
  const [climatevariable, setClimatevariable] = useState('');
  const [chartData, setChartData] = useState([{}]);
  const [chartDataFiltered, setchartDataFiltered] = useState([0,0]);
  const [chartLayout, setChartLayout] = useState({});

  const [climateDataFilesJSON, setClimateDataFilesJSON] = useState(['']);
  const [climateDataFile, setClimateDataFile] = useState(['']);

  const [locationItems, setLocationItems] = useState(['']);
  const [regionItems, setRegionItems] = useState(['']);
  const [climatevariableItems, setClimatevariableItems] = useState(['']);

  const [locationDisabled, setlocationDisabled] = useState(true);
  const [climatevariableDisabled, setClimatevariableDisabled] = useState(true);

  const loadNCAdata = async (region, isRobust) => {
    await axios.get('./TSU_Sandbox_Datafiles/index.json')
      .then( (response) => {
        // handle success
        let data = {}
        switch (region) {
          case "National":
            setClimateDataFilesJSON(response.data.national);
            data = response.data.national.filter(type => type.robust === isRobust);
            setClimatevariableItems(data.map((json) => json.type));
            break;
          case 'Regional':
            setClimateDataFilesJSON(response.data.regional);
            data = response.data.regional.filter(type => type.robust === isRobust);
            setClimatevariableItems(data.map((json) => json.type));
            break;
          case 'State':
            setClimateDataFilesJSON(response.data.state);
            data = response.data.state.filter(type => type.robust === isRobust);
            setClimatevariableItems(data.map((json) => json.type));
            break;
          default:
            setClimateDataFilesJSON(response.data.national);
            data = response.data.national.filter(type => type.robust === isRobust);
            setClimatevariableItems(data.map((json) => json.type));
            break;
        }

        return response.data;
      })
      .catch((error) => {
        // handle error
        console.error(`SanboxControls.loadNCADdata() error: ${error}`);
        return [''];
    })
  };

  // use the react effect to control when location and regions change to repupulalte the climate variable pulldown
  useEffect( () => {
    loadNCAdata(region, useRobust);
  }, [region, useRobust]);


  // handle the robust change
  const handleRobustChange = (newValue) => {
    newValue ? setSliderMinxMaxValues([1950, 2018]) : setSliderMinxMaxValues([1900, 2018]);
    setUseRobust(newValue);
    setUseRobustClicked(true);
    getChartData(region.toLowerCase(), location, climatevariable, newValue);
  };

  // handle seting robust data clicked to false, this allows slider
  //  to reset values to min max after robust data checkbox is clicked.
  const setUseRobustClickedFalse = (newValue) => {
    setUseRobustClicked(false);
  }
  // handle the slider change
  const handleSliderChange = (newValue) => {
    setsliderValues(newValue);
    getChartData(region.toLowerCase(), location, climatevariable, useRobust);
    // filterChartData({chartData, useRobust, sliderValues});
  };

  // handle state change for region
  const handleRegionChange = (newValue) => {
    setRegion(newValue);
    switch (newValue) {
      case 'National':
        // National data set the location items to none since there are none
        setLocationItems(['']);
        setLocation('');

        // National data set the location pulldown to disabled since there are no locations
        setlocationDisabled(true);

        // National data set the climatevariable pulldown to NOT disabled by changing the state
        setClimatevariableDisabled(false);
        break;
      case 'Regional':
        // Regional data set the location items to the regional items
        setLocationItems(locationRegionalItems);
        setLocation('');

        // Regional data set the location pulldown to disabled since there are no locations by changing the state
        setlocationDisabled(false);

        // Regional data set the climatevariable pulldown to NOT disabled by changing the state
        setClimatevariableDisabled(false);
        break;
      case 'State':
        // Regional data set the location items to the state items
        setLocationItems(locationStateItems);
        setLocation('');

        // Regional data set the location pulldown to disabled since there are no locations by changing the state
        setlocationDisabled(false);

        // Regional data set the climatevariable pulldown to NOT disabled by changing the state
        setClimatevariableDisabled(false);
        break;
      default:
        setLocationItems(['']);
        setLocation('');
        setlocationDisabled(true);
        setClimatevariableDisabled(true);
        break;
    }
    getChartData(newValue, location, climatevariable, useRobust);
  };

  // handle state change for location within the region
  const handleLocationChange = (newValue) => {
    setLocation(newValue);
    getChartData(region.toLowerCase(), newValue, climatevariable, useRobust);
  };

  // handle state change for climate variable
  const handleClimatevariableChange = (newValue) => {
    setClimatevariable(newValue);
    getChartData(region.toLowerCase(), location, newValue, useRobust);
  };

  const getClimatevariableType = (climatevariable) => {
    return climatevariable.includes('inch') ? 'Precipitation' : 'Temperature';
  }

  const getClimatevariableTempType = (climatevariable) => {
    return climatevariable.includes('tmax') ? 'Maximum' : 'Minimum';
  }

  const replaceClimatevariableType = (climatevariable) => {
    const sandboxClimateVariable = new SandboxClimateVariable(climatevariable);
    return sandboxClimateVariable.getPullDownText(climatevariable);
  }

  // get chart data from current state = which should include
  const getChartData = (region, location, climatevariable, useRobust) => {
    const data = climateDataFilesJSON.filter(json => json.robust === useRobust && json.type === climatevariable);
    const dataFile = data.map((json) => json.name);

    axios.get(`./TSU_Sandbox_Datafiles/${dataFile}`)
      .then( (response) =>{
          const chartDataFromFile = parseNCAFile(response.data, region, location);
          const chartType = getClimatevariableType(climatevariable);
          const sandboxClimateVariable = new SandboxClimateVariable(climatevariable);
          const chartTile = sandboxClimateVariable.getChartTitle(climatevariable);

          const plotInfo = {
            xvals: chartDataFromFile[0],
            yvals: chartDataFromFile[1],
            xmin: sliderMinxMaxValues[0],
            xmax: sliderMinxMaxValues[1],
            chartTile: chartTile,
            legnedText: chartType,
            chartType: chartType
          };

          const plotData = new SandboxGeneratePlotData(plotInfo);
          const xRange = {
            xmin: sliderValues[0],
            xmax: sliderValues[1]
          }
          plotData.setXRange(xRange);
          setChartData(plotData.getData());
          setChartLayout(plotData.getLayout());
      })
      .catch( (error) => {
        console.error(`SanboxControls.updatePlotData() error=${error}`);
      })
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} justify="flex-start" direction={"row"} className={classes.root}>
        <Grid item xs={12} width="100%" className={classes.selectionAreaHolder} >
          <Grid container spacing={0} justify="flex-start" direction={"row"} className={classes.selectionArea}>
            <Grid item xs={12} className={classes.header} width="100%" >
              <Box fontWeight="fontWeightBold" m={1} p={1} display="flex" flexWrap="nowrap" justifyContent="flex-start">
                <Box px={1} fontSize="h4.fontSize" className={classes.headerIcon}>
                  <FontAwesomeIcon icon={["fas", "chart-line"]} />
                </Box>
                <Box px={1} fontSize="h5.fontSize">NCA Sandbox - Climate Charts</Box>
              </Box>
            </Grid>


            <Grid item xs={12} sm={3} className={classes.varriableSelectors}>
              <Box fontWeight="fontWeightBold" m={1} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start">
                <SandboxSelector
                  items={RegionItems}
                  name={"Select a Region"}
                  onChange={handleRegionChange}
                  value={region}
                  disabled={false}
                  replaceClimatevariableType={replaceClimatevariableType}
                  />
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} className={classes.varriableSelectors}>
              <Box fontWeight="fontWeightBold" m={1} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start">
                <SandboxSelector
                  items={locationItems}
                  name={"Select a Location"}
                  onChange={handleLocationChange}
                  value={location}
                  disabled={locationDisabled}
                  replaceClimatevariableType={replaceClimatevariableType}
                  />
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} className={classes.varriableSelectors} >
              <Box fontWeight="fontWeightBold" m={1} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start">
                <SandboxSelector
                  items={climatevariableItems}
                  name={"Climate Variable"}
                  onChange={handleClimatevariableChange}
                  value={climatevariable}
                  disabled={climatevariableDisabled}
                  replaceClimatevariableType={replaceClimatevariableType}
                  />
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} className={classes.varriableSelectors}>
              <Box fontWeight="fontWeightBold" ml={2}  display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start" className={classes.checkBox}>
                <SandboxDataCheck
                  useRobust={useRobust}
                  onChange={handleRobustChange}
                  />
              </Box>
            </Grid>

            <Grid item xs={12}  className={classes.yearSlider} >
              <Box fontWeight="fontWeightBold" m={1} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="center" >
                <SandboxSlider
                  useRobust={useRobust}
                  useRobustClicked={useRobustClicked}
                  setUseRobustClicked={setUseRobustClickedFalse}
                  sliderMinxMaxValues={sliderMinxMaxValues}
                  values={sliderValues}
                  onChange={handleSliderChange}
                  />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} display="flex"  flex={1} className={classes.chartRegion}>
          <Box display="flex" mt={3} flexDirection="row" justifyContent="center" flex={1} flexGrow={3} height="90%" >
            <SandboxPlotRegion
              plotlyData={chartData}
              plotlyLayout={chartLayout}
              />
          </Box>
        </Grid>

      </Grid>
    </div>
  );
}

const parseNCAFile = (data, type, region) => {
  let xvals = [];
  let yvals = [];
  let lines = data.split(/\r?\n/);
  let headers = lines[0].split(',');
  for(let h=0;h<headers.length;h++){
    headers[h] = headers[h].trim();
  }
  let col_index = undefined;

  if(type === "national"){
    col_index = 1;
  }else if(type === "regional" || type === "state"){
    for(let h=1;h<headers.length;h+=2){
      if(headers[h] === region){
        col_index = h;
        break;
      }
    }
  }

  for(let i=1;i<lines.length;i++){
    let elements = lines[i].split(',');
    if(elements.length <= 1){
      break;
    }
    let xval = parseInt(elements[0]);
    let yval = parseFloat(elements[col_index]);
    xvals.push(xval);
    yvals.push(yval);
  }

  return [xvals, yvals];
}
