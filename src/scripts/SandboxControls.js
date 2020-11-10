import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import Button from '@material-ui/core/Button';

import SandboxPlotRegion from './SandboxPlotRegion';
import SandboxGeneratePlotData from './SandboxGeneratePlotData';
import SandboxHumanReadable from './SandboxHumanReadable';
import SandboxSlider from './SandboxSlider';
import SandboxSelector from './SandboxSelector';
import SandboxDataCheck from './SandboxDataCheck';
import '../css/Sandbox.scss';

const axios = require('axios');

const white = '#FFFFFF';
const darkGreay = '#E6E6E6';
const pullDownBackground = '#FBFCFE';
const fontColor = '#5C5C5C';

const useStyles = makeStyles((theme) => ({
  sandboxRoot: {
    backgroundColor: white,
    color: fontColor,
    height: 'calc(100vh - 10px)',
    [theme.breakpoints.down('xs')]: {
      overflow: 'scroll'
    }
  },
  sandboxSelectionArea: {
    height: '200px',
    maxHeight: '200px',
    backgroundColor: pullDownBackground,
    border: `1px solid ${darkGreay}`,
    borderRadius: '4px',
    [theme.breakpoints.down('xs')]: {
      height: '550px',
      minHeight: '550px'
    }
  },
  sandboxSelectionAreaHolder: {
    margin: '6px',
    [theme.breakpoints.down('xs')]: {
      height: '100vh',
      maxHeight: '550px'
    }
  },
  sandboxChartRegion: {
    height: 'calc(100% - 225px)',
    maxHeight: 'calc(100% - 225px)',
    [theme.breakpoints.down('xs')]: {
      height: '550px'
    }
  },
  sandboxChartRegionBox: {
    height: 'calc(100% - 10px)',
    [theme.breakpoints.down('xs')]: {
      height: '550px'
    }
  }
}));

const RegionItems = [
  'National',
  'Regional',
  'State'
];

const locationRegionalItems = [
  'Northeast',
  'Southeast',
  'Midwest',
  'Northern Great Plains',
  'Northwest',
  'Southwest',
  'Southern Great Plains',
  'Alaska',
  'Hawaii',
  'Puerto Rico'
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
  'WY'
];

export default function SandboxControls() {
  // check url parameters frist for values
  const urlParams = new URLSearchParams(window.location.search);

  // check url parameters for the region if none make it blank
  const URLRegion = urlParams.get('region') ? urlParams.get('region') : '';

  // check url parameters for a location if none make it blank
  const URLLocation = urlParams.get('location') ? urlParams.get('location') : '';

  // check url parameters for a climatevariable if none make it blank
  const URLClimatevariable = urlParams.get('climatevariable') ? urlParams.get('climatevariable') : '';

  // check url parameters for a using robust if none assume its false,
  // but his is a string so we will need to convert it to a boolean
  const RawURLUseRobust = urlParams.get('useRobust') ? urlParams.get('useRobust') : false;
  const URLUseRobust = (RawURLUseRobust === 'true');

  // check url parameters for the slider values if none make the default [1900, 2020]
  // its possible the max will be re set by the data files.
  let URLSliderValues = urlParams.get('sliderValues') ?
    urlParams.get('sliderValues').split(',').map((value) => parseInt(value, 10)) : [1900, 2020];
  let URLSliderMinxMaxValues = [1900, 2020];

  // if usng robust the make the default min max are set, there can
  // be issues if when the min is lower than the actual Minimum in the data
  if (URLUseRobust) {
    URLSliderMinxMaxValues = [1950, 2020];
    if (URLSliderValues[0] < URLSliderMinxMaxValues[0]) {
      URLSliderValues = [1950, 2020];
    }
  }

  // set defaults for intial states of ui compnents
  let URLClimatevariableDisabled = true;
  let URLLocationDisabled = true;
  let URLLocationItems = [''];

  // the region determines some of the inital states, so if the URl contains a region
  // make sure we set those states, also there diferent location values for different regions
  switch (URLRegion) {
    case 'National':
      // National data set the climatevariable pulldown to NOT disabled by changing the state
      URLClimatevariableDisabled = false;
      break;
    case 'Regional':
      // National data set the climatevariable pulldown to NOT disabled by changing the state
      URLLocationItems = locationRegionalItems;
      URLLocationDisabled = false;
      URLClimatevariableDisabled = false;
      break;
    case 'State':
      // National data set the climatevariable pulldown to NOT disabled by changing the state
      URLLocationItems = locationStateItems;
      URLLocationDisabled = false;
      URLClimatevariableDisabled = false;
      break;
    default:
      // default state
      URLClimatevariableDisabled = true;
      URLLocationDisabled = true;
      break;
  }

  // set React state via React Hooks
  const classes = useStyles();
  const [atStart, setAtStart] = useState(true);
  const [sliderValues, setsliderValues] = useState(URLSliderValues);
  const [sliderMinxMaxValues, setSliderMinxMaxValues] = useState(URLSliderMinxMaxValues);

  const [useRobust, setUseRobust] = useState(URLUseRobust);
  const [useRobustClicked, setUseRobustClicked] = useState(false);

  const [region, setRegion] = useState(URLRegion);
  const [location, setLocation] = useState(URLLocation);
  const [climatevariable, setClimatevariable] = useState(URLClimatevariable);
  const [chartData, setChartData] = useState([{}]);
  const layoutDefaults = { yaxis: { rangemode: 'tozero', title: 'Days' }, xaxis: { rangemode: 'tozero' } };
  const [chartLayout, setChartLayout] = useState(layoutDefaults);

  const [climateDataFilesJSON, setClimateDataFilesJSON] = useState(['']);

  const [locationItems, setLocationItems] = useState(URLLocationItems);
  const [climatevariableItems, setClimatevariableItems] = useState(['']);

  const [locationDisabled, setlocationDisabled] = useState(URLLocationDisabled);
  const [climatevariableDisabled,
    setClimatevariableDisabled] = useState(URLClimatevariableDisabled);

  // sets climate variable type for precip or temp, this will likely change latter...
  const getClimatevariableType = (switchClimatevariable) => {
    const returnValue = switchClimatevariable.includes('inch') ? 'Precipitation' : 'Temperature';
    return returnValue;
  };

  // replace the state abbrevaiations from the data text files with a more
  // human readable full state name AK becomes Alaska
  const replaceLocationAbbreviation = (replaceAbbreviationLocation) => {
    const sandboxHumanReadable = new SandboxHumanReadable();
    return sandboxHumanReadable.getLocationDownText(replaceAbbreviationLocation);
  };

  // function to set URL parameters based on state and user seletions
  const sandBoxURL = (props) => {
    // get values from argument keys
    const { chartDataRegion } = props;
    const { chartDataLocation } = props;
    const { chartDataClimatevariable } = props;
    const { chartDataUseRobust } = props;
    const { chartDataSliderValues } = props;

    // create new URL parameter object
    const searchParams = new URLSearchParams();

    // get the url parameters
    searchParams.set('region', chartDataRegion);
    searchParams.set('location', chartDataLocation);
    searchParams.set('climatevariable', chartDataClimatevariable);
    searchParams.set('useRobust', chartDataUseRobust);
    searchParams.set('sliderValues', chartDataSliderValues);

    // convert url parameters to a string and add the leading ? so it we can add it
    // to browser history (back button works)
    const urlParameters = `?${searchParams.toString()}`;

    // adds url and url parameters to browser history
    window.history.replaceState({}, document.title, urlParameters);
    return urlParameters;
  };

  // parse data file which is in CSV format
  const parseNCAFile = (data, type, parseRegion) => {
    const xvals = [];
    const yvals = [];
    const lines = data.split(/\r?\n/);
    const headers = lines[0].split(',');
    for (let h = 0; h < headers.length; h += 1) {
      headers[h] = headers[h].trim();
    }
    let colIndex = undefined; // eslint-disable-line no-undef-init

    if (type === 'national') {
      colIndex = 1;
    } else if (type === 'regional' || type === 'state') {
      for (let h = 1; h < headers.length; h += 2) {
        if (headers[h] === parseRegion) {
          colIndex = h;
          break;
        }
      }
    }

    for (let i = 1; i < lines.length; i += 1) {
      const elements = lines[i].split(',');
      if (elements.length <= 1) {
        break;
      }
      const xval = parseInt(elements[0], 10);
      const yval = parseFloat(elements[colIndex]);
      xvals.push(xval);
      yvals.push(yval);
    }

    return [xvals, yvals];
  };

  // get chart data from current state = which should include
  const getChartData = (props) => {
    // get argument keys
    const { chartDataRegion } = props;
    const { chartDataLocation } = props;
    const { chartDataClimatevariable } = props;
    const { chartDataUseRobust } = props;
    const { climateDataFilesJSONFile } = props;
    const { chartDataSliderValues } = props;

    // update url history this is the point at which we will need to make sure
    // the graph looks the same when shared via url
    sandBoxURL({
      chartDataRegion,
      chartDataLocation,
      chartDataClimatevariable,
      chartDataUseRobust,
      chartDataSliderValues
    });

    //  limite the posbiel data file to if robust and the climate variable (should be one)
    const data = climateDataFilesJSONFile.filter((json) => {
      const returnValue = json.robust === chartDataUseRobust &&
        json.type === chartDataClimatevariable;
      return returnValue;
    });

    // get the data file name
    const dataFile = data.map((json) => json.name);
    // define the data file location should always be the current url and public folder
    const path = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    axios.get(`${path}/sandboxdata/TSU_Sandbox_Datafiles/${dataFile}`)
      .then((response) => {
        // parse the csv text file
        const chartDataFromFile =
          parseNCAFile(response.data, chartDataRegion.toLowerCase(), chartDataLocation);

        // get the chart type which is the climate variable
        const chartType = getClimatevariableType(chartDataClimatevariable);

        // create a new instance of the sandbox human readable class this transforms
        // the short text to something
        // humans can read tmax100F beceomes Days with Maximum Temperature Above 100°F and
        // AK becomes Alaska
        const sandboxHumanReadable = new SandboxHumanReadable(chartDataClimatevariable);

        // get the location from the ui
        const titleLocation = replaceLocationAbbreviation(chartDataLocation);

        // conver the all the parameters to human readable title
        const chartTitle = sandboxHumanReadable.getChartTitle({
          climatevariable: chartDataClimatevariable,
          region: chartDataRegion,
          titleLocation
        });

        // create the plotly input so the chart is created based on users seletion
        const plotInfo = {
          xvals: chartDataFromFile[0],
          yvals: chartDataFromFile[1],
          xmin: sliderMinxMaxValues[0],
          xmax: sliderMinxMaxValues[1],
          chartTitle,
          legnedText: chartType,
          chartType,
          useRobust: chartDataUseRobust
        };

        // get the charts data formated for plotly
        const plotData = new SandboxGeneratePlotData(plotInfo);
        const xRange = {
          xmin: sliderValues[0],
          xmax: sliderValues[1]
        };

        // set the charts min and max based on the data in the data file
        plotData.setXRange(xRange);

        // change reacts state so it refreshes
        setChartData(plotData.getData());
        setChartLayout(plotData.getLayout());
      })
      // handle errors
      .catch((error) => {
        console.error(`SanboxControls.updatePlotData() error=${error}`); // eslint-disable-line no-console
      });
  };

  // function loads the index.json file to find the correct data.txt file based on the varriables
  // the user chooses or from URL parameters
  const loadNCAdata = async (loadRegion, isRobust) => {
    const path = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    await axios.get(`${path}/sandboxdata/TSU_Sandbox_Datafiles/index.json`)
      .then((response) => {
        // handle success
        let responseData = {};
        let data = {};

        // Regions change the file and how the object is refrenced
        //  TODO might be better to fix this in the future
        switch (loadRegion) {
          case 'National':
            responseData = response.data.national;
            break;
          case 'Regional':
            responseData = response.data.regional;
            break;
          case 'State':
            responseData = response.data.state;
            break;
          default:
            responseData = response.data.national;
            break;
        }

        // set climate data json data file
        setClimateDataFilesJSON(responseData);

        // filter data if robust data checked
        data = responseData.filter((type) => type.robust === isRobust);

        // get climate variable items
        setClimatevariableItems(data.map((json) => json.type));

        // only send chart data if at the intializing of the app aka the first time
        // this is here for when URL parameters are passed
        if (atStart) {
          getChartData({
            chartDataRegion: region,
            chartDataLocation: location,
            chartDataClimatevariable: climatevariable,
            chartDataUseRobust: useRobust,
            climateDataFilesJSONFile: responseData,
            chartDataSliderValues: sliderValues
          });
        }

        return responseData;
      })
      .catch((error) => {
        // handle error
        console.error(`SanboxControls loadNCAdata error: ${error}`); // eslint-disable-line no-console
        return [''];
      });
  };

  // use the react effect to control when location and
  // regions change to repopulate the climate variable pulldown
  useEffect(() => {
    // call loadNCAdata when useRobust changes
    loadNCAdata(region, useRobust, atStart);

    // make sure user robust clicked is now false
    setUseRobustClicked(false);
  }, [region, useRobust]);

  // use the react effect to control when loading state from URL
  // this should only happen once during startup.
  useEffect(() => {
    // call loadNCAdata when at start changes, meaning only call this
    // when the site fist starts and intializes
    loadNCAdata(region, useRobust, atStart);

    // make suire the start state is no false and this will never run again
    // the loadNCAdata function will only update chartdata the first timei t runs
    setAtStart(false);
  }, [atStart]);

  // handle the robust change
  const handleRobustChange = (newValue) => {
    // when user clicks robust we need to make sure the min is not below the
    //  the lowest value, robust data tends to start at 1950 not robust 1900, if
    // the user was looking at 1900 - 1970 on the site then this would
    // cause errors because the frst data is well before 1950.  this makes sure
    // that cannot happen
    let defaultRanges = [1900, 2020];
    let changedSliderValues = sliderMinxMaxValues;
    if (newValue) {
      defaultRanges = [1950, 2020];
      setSliderMinxMaxValues(defaultRanges);
      changedSliderValues = defaultRanges;
    } else {
      setSliderMinxMaxValues(defaultRanges);
      changedSliderValues = defaultRanges;
    }
    // update the chart data to refelect change in robust
    // this will reset the slider values to avoid errors with ranges
    getChartData({
      chartDataRegion: region,
      chartDataLocation: location,
      chartDataClimatevariable: climatevariable,
      chartDataUseRobust: newValue,
      climateDataFilesJSONFile: climateDataFilesJSON,
      chartDataSliderValues: changedSliderValues
    });

    // udpdate react state so it all refreshes
    setUseRobust(newValue);
    setUseRobustClicked(true);
  };

  // handle seting robust data clicked to false, this allows slider
  //  to reset values to min max after robust data checkbox is clicked.
  const setUseRobustClickedFalse = (newValue) => {
    setUseRobustClicked(false);
    return null;
  };

  // handle the slider change
  const handleSliderChange = (newValue) => {
    setsliderValues(newValue);
    getChartData({
      chartDataRegion: region,
      chartDataLocation: location,
      chartDataClimatevariable: climatevariable,
      chartDataUseRobust: useRobust,
      climateDataFilesJSONFile: climateDataFilesJSON,
      chartDataSliderValues: newValue
    });
    return null;
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

        // Regional data set the location pulldown to disabled
        // since there are no locations by changing the state
        setlocationDisabled(false);

        // Regional data set the climatevariable pulldown to NOT disabled by changing the state
        setClimatevariableDisabled(false);
        break;
      case 'State':
        // Regional data set the location items to the state items
        setLocationItems(locationStateItems);
        setLocation('');

        // Regional data set the location pulldown to disabled
        // since there are no locations by changing the state
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
    getChartData({
      chartDataRegion: newValue,
      chartDataLocation: location,
      chartDataClimatevariable: climatevariable,
      chartDataUseRobust: useRobust,
      climateDataFilesJSONFile: climateDataFilesJSON,
      chartDataSliderValues: sliderValues
    });
  };

  // handle state change for location within the region
  const handleLocationChange = (newValue) => {
    setLocation(newValue);
    getChartData({
      chartDataRegion: region,
      chartDataLocation: newValue,
      chartDataClimatevariable: climatevariable,
      chartDataUseRobust: useRobust,
      climateDataFilesJSONFile: climateDataFilesJSON,
      chartDataSliderValues: sliderValues
    });
  };

  // handle state change for climate variable
  const handleClimatevariableChange = (newValue) => {
    setClimatevariable(newValue);
    getChartData({
      chartDataRegion: region,
      chartDataLocation: location,
      chartDataClimatevariable: newValue,
      chartDataUseRobust: useRobust,
      climateDataFilesJSONFile: climateDataFilesJSON,
      chartDataSliderValues: sliderValues
    });
    return null;
  };

  // repalce the climate variable with human readable climate variable
  // tmax100F beceomes Days with Maximum Temperature Above 100°F
  const replaceClimatevariableType = (replaceClimatevariable) => {
    const sandboxHumanReadable = new SandboxHumanReadable();
    return sandboxHumanReadable.getClimateVariablePullDownText(replaceClimatevariable);
  };


  // hack to export svg, not using plotly libray instead using JS
  const downloadSVGAsText = () => {
    const svgs = Array.prototype.slice.call(document.querySelectorAll('.js-plotly-plot .main-svg'));

    const mergedDiv = document.createElement('div');
    mergedDiv.setAttribute('id', 'merged-div');
    const mergedSVG = document.createElement('svg');

    mergedSVG.setAttribute('xmlns', svgs[0].getAttribute('xmlns'));
    mergedSVG.setAttribute('xmlns:xlink', svgs[0].getAttribute('xmlns:xlink'));
    mergedSVG.setAttribute('width', svgs[0].getAttribute('width'));
    mergedSVG.setAttribute('height', svgs[0].getAttribute('height'));
    mergedSVG.setAttribute('style',  svgs[0].getAttribute('style'));

    mergedDiv.appendChild(mergedSVG);

    const svgArray = svgs.forEach((svgnode) => {
      const content = Array.from(svgnode.childNodes);
      content.map((svgele) => {
        const node = svgele.cloneNode(true);
        mergedSVG.appendChild(node)
      });
    });

    const base64doc = btoa(unescape(encodeURIComponent(mergedSVG.outerHTML)));
    const a = document.createElement('a');
    const e = new MouseEvent('click');
    a.download = 'download.svg';
    a.href = 'data:image/svg+xml;base64,' + base64doc;
    a.dispatchEvent(e);
    a.remove();
    mergedSVG.remove();
    mergedDiv.remove();
  }

  return (
    <div className={classes.sandboxRoot}>
      <Grid container spacing={0} justify='flex-start' direction={'row'} className={classes.sandboxRoot}>
        <Grid item xs={12} width='100%' className={classes.sandboxSelectionAreaHolder} >
          <Grid container spacing={0} justify='flex-start' direction={'row'} className={classes.sandboxSelectionArea}>
            <Grid item xs={12} className={'sandbox-header'} width='100%' >
              <Box fontWeight='fontWeightBold' mt={1} p={0} display='flex' flexWrap='nowrap' justifyContent='flex-start'>
                <Box px={1} fontSize='h4.fontSize' >
                  <InsertChartOutlinedIcon fontSize='large' className={'sandbox-header-icon'} />
                </Box>
                <Box px={1} fontSize='h5.fontSize' >NCA Sandbox - Climate Charts</Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={3} className={'sandbox-varriable-selectors'}>
              <Box fontWeight='fontWeightBold' m={1} display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='flex-start'>
                <SandboxSelector
                  items={RegionItems}
                  controlName={'Select a Region'}
                  onChange={handleRegionChange}
                  value={region}
                  disabled={false}
                  replaceClimatevariableType={replaceClimatevariableType}
                  />
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} className={'sandbox-varriable-selectors'}>
              <Box fontWeight='fontWeightBold' m={1} display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='flex-start'>
                <SandboxSelector
                  items={locationItems}
                  controlName={'Select a Location'}
                  onChange={handleLocationChange}
                  value={location}
                  disabled={locationDisabled}
                  replaceClimatevariableType={replaceClimatevariableType}
                  replaceLocationAbbreviation={replaceLocationAbbreviation}
                  />
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} className={'sandbox-varriable-selectors'} >
              <Box fontWeight='fontWeightBold' m={1} display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='flex-start'>
                <SandboxSelector
                  items={climatevariableItems}
                  controlName={'Climate Variable'}
                  onChange={handleClimatevariableChange}
                  value={climatevariable}
                  disabled={climatevariableDisabled}
                  replaceClimatevariableType={replaceClimatevariableType}
                  />
              </Box>
            </Grid>

            <Grid item xs={12} sm={2} className={'sandbox-varriable-selectors'}>
              <Box fontWeight='fontWeightBold' ml={2} display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='flex-start' className={'sandbox-check-box'}>
                <SandboxDataCheck
                  useRobust={useRobust}
                  onChange={handleRobustChange}
                  />
              </Box>
            </Grid>

            <Grid item xs={12} sm={1} className={'sandbox-varriable-selectors'}>
              <Box fontWeight='fontWeightBold' ml={2} display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='flex-start'>
                <Button  onClick={downloadSVGAsText} variant="contained" color="default">
                  Primary
                </Button>
              </Box>
            </Grid>



            <Grid item xs={12} className={'sandbox-year-slider'} >
              <Box fontWeight='fontWeightBold' mx={2} mb={1} className="SliderBox" display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='center' >
                <SandboxSlider
                  useRobust={useRobust}
                  useRobustClicked={useRobustClicked}
                  setUseRobustClickedFalse={setUseRobustClickedFalse}
                  sliderMinxMaxValues={sliderMinxMaxValues}
                  sliderValues={sliderValues}
                  onChange={handleSliderChange}
                  />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} display='flex' flex={1} className={classes.sandboxChartRegion}>
          <Box display='flex' flexDirection='row' m={1} justifyContent='center' flex={1} flexGrow={3} className={classes.sandboxChartRegionBox}>
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

SandboxControls.propTypes = {
  chartDataRegion: PropTypes.string,
  chartDataLocation: PropTypes.string,
  chartDataClimatevariable: PropTypes.string,
  chartDataUseRobust: PropTypes.bool,
  chartDataSliderValues: PropTypes.array,
  climateDataFilesJSONFile: PropTypes.object
};
