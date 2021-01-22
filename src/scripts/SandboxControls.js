// mui and react
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';

// sandbox conmponents
import SandboxPlotRegion from './SandboxPlotRegion';
import SandboxGeneratePlotData from './SandboxGeneratePlotData';
import SandboxHumanReadable from './SandboxHumanReadable';
import SandboxSelector from './SandboxSelector';
import SandboxAlert from './SandboxAlert';
import SandboxActionMenu from './SandboxActionMenu';

// configs
import SandboxDataControl from '../configs/SandboxDataControl';
import SandboxRegionItems from '../configs/SandboxRegionItems';
import SandboxPeriods from '../configs/SandboxPeriods';
import SandboxLocationRegionalItems from '../configs/SandboxLocationRegionalItems';
import SandboxLocationStateItems from '../configs/SandboxLocationStateItems';

// css
import '../css/Sandbox.scss';

const RegionItems = SandboxRegionItems();
const Periods = SandboxPeriods();
const LocationRegionalItems = SandboxLocationRegionalItems();
const LocationStateItems = SandboxLocationStateItems();

const axios = require('axios');

const white = '#FFFFFF';
const darkGrey = '#E6E6E6';
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
    border: `1px solid ${darkGrey}`,
    borderRadius: '4px',
    [theme.breakpoints.down('xs')]: {
      height: '675px',
      minHeight: '675px'
    }
  },
  sandboxSelectionAreaHolder: {
    margin: '6px',
    [theme.breakpoints.down('xs')]: {
      height: '100vh',
      maxHeight: '675px'
    }
  },
  sandboxChartRegion: {
    height: 'calc(100% - 205px)',
    maxHeight: 'calc(100% - 205px)',
    [theme.breakpoints.down('xs')]: {
      height: '575px',
      maxHeight: '575px'
    }
  },
  sandboxChartRegionBox: {
    height: 'calc(100% - 10px)',
    [theme.breakpoints.down('xs')]: {
      height: '575px'
    }
  },
  sandboxExports: {
    height: '70px',
    maxheight: '70px',
    [theme.breakpoints.down('xs')]: {
      height: '300px',
      maxheight: '300px'
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function SandboxControls() {
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

  // check url parameters for a using average bar true (averages are bar) if blank
  const URLLineChart = urlParams.get('line') ? urlParams.get('line') : 'year';

  // set defaults for intial states of ui compnents
  let URLClimatevariableDisabled = true;
  let URLLocationDisabled = true;
  let URLPeriodDisabled = true;
  let URLLocationItems = [''];

  // the region determines some of the inital states, so if the URl contains a region
  // make sure we set those states, also there diferent location values for different regions
  switch (URLRegion) {
    case 'National':
      // National data set the climatevariable pulldown to NOT disabled by changing the state
      URLClimatevariableDisabled = false;
      URLPeriodDisabled = false;
      break;
    case 'Regional':
      // National data set the climatevariable pulldown to NOT disabled by changing the state
      URLLocationItems = LocationRegionalItems;
      URLLocationDisabled = false;
      URLClimatevariableDisabled = false;
      URLPeriodDisabled = false;
      break;
    case 'State':
      // National data set the climatevariable pulldown to NOT disabled by changing the state
      URLLocationItems = LocationStateItems;
      URLLocationDisabled = false;
      URLClimatevariableDisabled = false;
      URLPeriodDisabled = false;
      break;
    default:
      // default state
      URLClimatevariableDisabled = true;
      URLLocationDisabled = true;
      URLPeriodDisabled = true;
      break;
  }

  const classes = useStyles();

  // set React state via React Hooks
  // used to detect the first call - for getting state from url
  const [atStart, setAtStart] = useState(true);
  // used to oepn or close the alert box
  const [openError, setOpenError] = useState(false);
  // chart error message
  const [chartErrorMessage, setChartErrorMessage] = useState('Chart Error');
  // chart error title
  const [chartErrorTitle, setChartErrorTitle] = useState('Error');
  // chart error type currently Error or Warning
  const [errorType, setErrorType] = useState('Error');
  // the region
  const [region, setRegion] = useState(URLRegion);
  // the location within region its National when region is National
  const [location, setLocation] = useState(URLLocation);
  // the climate varriable tmax100F etc
  const [climatevariable, setClimatevariable] = useState(URLClimatevariable);
  // the period current 1900 - current or 1950 - current
  const [period, setPeriod] = useState(URLPeriod);
  // average bars or line
  // when false average is the bars when false average is line
  // when true yearly is the line when false yearly is bars
  const [lineChart, setLineChart] = useState(URLLineChart);

  // chart data from files in ../sandboxdata
  const [chartData, setChartData] = useState([{}]);
  // plotly chart layout defaults
  const layoutDefaults = { yaxis: { rangemode: 'tozero', title: 'Days' }, xaxis: { rangemode: 'tozero' } };
  // plotly chart layout
  const [chartLayout, setChartLayout] = useState(layoutDefaults);
  // chart data json file
  const [climateDataFilesJSON, setClimateDataFilesJSON] = useState(['']);
  // all the possible location items
  const [locationItems, setLocationItems] = useState(URLLocationItems);
  // all the possible climate variables
  const [climatevariableItems, setClimatevariableItems] = useState(['']);
  // if no region selected disables location pulldown - helps manage user error
  const [locationDisabled, setlocationDisabled] = useState(URLLocationDisabled);
  // if no region selected disables climate variable pulldown - helps manage user error
  const [climatevariableDisabled,
    setClimatevariableDisabled] = useState(URLClimatevariableDisabled);
  // if no region selected period pulldown - helps manage user error
  const [periodDisabled, setPeriodDisabled] = useState(URLPeriodDisabled);

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
    const { chartDataPeriod } = props;
    const { chartLineChart } = props;

    // create new URL parameter object
    const searchParams = new URLSearchParams();

    // get the url parameters
    searchParams.set('region', chartDataRegion);
    searchParams.set('location', chartDataLocation);
    searchParams.set('climatevariable', chartDataClimatevariable);
    searchParams.set('period', chartDataPeriod);
    searchParams.set('line', chartLineChart);

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
    const { chartDataPeriod } = props;
    const { climateDataFilesJSONFile } = props;
    const { chartLineChart } = props;

    // update url history this is the point at which we will need to make sure
    // the graph looks the same when shared via url
    sandBoxURL({
      chartDataRegion,
      chartDataLocation,
      chartDataClimatevariable,
      chartDataPeriod,
      chartLineChart
    });

    // limit the possible data file to period
    // (years aka 1900 - current 1950 - current) and the climate variable (should be one)
    const data = climateDataFilesJSONFile.filter((json) => {
      const returnValue = json.period === chartDataPeriod &&
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

        // convert the all the parameters to human readable title
        const chartTitle = sandboxHumanReadable.getChartTitle({
          climatevariable: chartDataClimatevariable,
          region: chartDataRegion,
          titleLocation
        });

        // get climate varriable human readable format
        const humandReadablechartDataClimatevariable =
          sandboxHumanReadable.getClimateVariablePullDownText(chartDataClimatevariable);

        // get period range
        const humandReadablPeriodRange =
          sandboxHumanReadable.getPeriodRange(chartDataPeriod);

        // if no data mark as data missing so we can handle required fields and error messaging
        let dataMissing = false;
        if (!climateDataFilesJSONFile) dataMissing = true;
        if (!chartDataRegion) dataMissing = true;
        if (chartDataRegion !== 'National' && !chartDataLocation) dataMissing = true;
        if (!chartDataClimatevariable) dataMissing = true;
        if (!chartDataPeriod) dataMissing = true;

        // create the plotly input so the chart is created based on users seletion
        const plotInfo = {
          xvals: chartDataFromFile[0],
          yvals: chartDataFromFile[1],
          xmin: humandReadablPeriodRange[0],
          xmax: humandReadablPeriodRange[1],
          chartTitle,
          legnedText: chartType,
          chartType,
          climatevariable: humandReadablechartDataClimatevariable,
          chartLineChart,
          dataMissing
        };

        // get the charts data formated for plotly
        const plotData = new SandboxGeneratePlotData(plotInfo);

        // if data is missing then zero out chart
        if (dataMissing) {
          plotData.zeroOutChartData();
        }

        // get configuration for defaults and invalid varriables/periods
        const locationLimit = chartDataRegion === 'National' ? 'National' : chartDataLocation;
        const configLimitData = { locationLimit };
        const sandboxDataControl = new SandboxDataControl();

        // get default period for the location
        const defaultPeriod = sandboxDataControl.getDefaultPeriod(configLimitData);
        // get invalud climate variables for the location
        const inValidClimateVariables =
          sandboxDataControl.getInValidClimateVariables(configLimitData);
        // get invalud periods for the location
        const inValidPeriods = sandboxDataControl.getInValidPeriods(configLimitData);

        // TODO will fill this in later
        if (defaultPeriod) {
          // do nothing for now
        }

        if (inValidClimateVariables) {
          // do nothing for now
        }

        if (inValidPeriods) {
          // do nothing for now
        }

        // check if region or location has data if not display
        // no data available for location and clear the chart
        // if data missing for combo field level errors will handle messaging
        if (!plotData.hasData() && !dataMissing) {
          setOpenError(true);
          setErrorType('Error');
          setChartErrorTitle('Error data not available');
          setChartErrorMessage(`Unfortunately, there is no data available for ${humandReadablechartDataClimatevariable}
            for ${titleLocation}. To resolve this issue, try one or all of these three actions.
            1) Change the location.
            2) Change the climate variable.
            3) Change the time period`);
        } else if (plotData.isAllZeros() && !dataMissing) {
          setOpenError(true);
          setErrorType('Warning');
          setChartErrorTitle('Warning data is all zeros');
          setChartErrorMessage(`Warning the chart data for ${chartTitle} contains all zeros (0).`);
        } else {
          setOpenError(false);
        }

        const xRange = {
          xmin: humandReadablPeriodRange[0],
          xmax: humandReadablPeriodRange[1]
        };

        // set the charts min and max based on the data in the data file
        plotData.setXRange(xRange);

        // change reacts state so it refreshes
        setChartData(plotData.getData());
        setChartLayout(plotData.getLayout());
        return plotData;
      })
      // handle errors
      .catch((error) => {
        console.error(`SanboxControls.updatePlotData() error=${error}`); // eslint-disable-line no-console
      });
  };

  // function loads the index.json file to find the correct data.txt file based on the varriables
  // the user chooses or from URL parameters
  const loadData = async (loadRegion, argPeriod) => {
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

        // filter data for period
        data = responseData.filter((type) => type.period === argPeriod);

        // get climate variable items
        setClimatevariableItems(data.map((json) => json.type));

        // only send chart data if at the intializing of the app aka the first time
        // this is here for when URL parameters are passed
        if (atStart) {
          getChartData({
            chartDataRegion: region,
            chartDataLocation: location,
            chartDataClimatevariable: climatevariable,
            chartDataPeriod: period,
            climateDataFilesJSONFile: responseData,
            chartLineChart: lineChart
          });
        }
        return responseData;
      })
      .catch((error) => {
        // handle error
        console.error(`SanboxControls loadData error: ${error}`); // eslint-disable-line no-console
        return [''];
      });
  };

  // use the react effect to control when location and
  // regions change to repopulate the climate variable pulldown
  useEffect(() => {
    // call loadData when region changes
    loadData(region, period, atStart);
  }, [region]);

  // use the react effect to control when loading state from URL
  // this should only happen once during startup.
  useEffect(() => {
    // call loadData when at start changes, meaning only call this
    // when the site fist starts and intializes
    loadData(region, period, atStart);

    // make sure the start state is no false and this will never run again
    // the loadData function will only update chartdata the first timei t runs
    setAtStart(false);
  }, [atStart]);

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

        // National data set the period pulldown to NOT disabled by changing the state
        setPeriodDisabled(false);
        break;
      case 'Regional':
        // Regional data set the location items to the regional items
        setLocationItems(LocationRegionalItems);
        setLocation('');

        // Regional data set the location pulldown to disabled
        // since there are no locations by changing the state
        setlocationDisabled(false);

        // Regional data set the climatevariable pulldown to NOT disabled by changing the state
        setClimatevariableDisabled(false);

        // Regional data set the period pulldown to NOT disabled by changing the state
        setPeriodDisabled(false);
        break;
      case 'State':
        // Regional data set the location items to the state items
        setLocationItems(LocationStateItems);
        setLocation('');

        // Regional data set the location pulldown to disabled
        // since there are no locations by changing the state
        setlocationDisabled(false);

        // Regional data set the climatevariable pulldown to NOT disabled by changing the state
        setClimatevariableDisabled(false);

        // Regional data set the period pulldown to NOT disabled by changing the state
        setPeriodDisabled(false);
        break;
      default:
        setLocationItems(['']);
        setLocation('');
        setlocationDisabled(true);
        setClimatevariableDisabled(true);
        setPeriodDisabled(true);
        break;
    }
    getChartData({
      chartDataRegion: newValue,
      chartDataLocation: '', // make sure location is blank
      chartDataClimatevariable: climatevariable,
      chartDataPeriod: period,
      climateDataFilesJSONFile: climateDataFilesJSON,
      chartLineChart: lineChart
    });
  };

  // handle state change for location within the region
  const handleLocationChange = (newValue) => {
    setLocation(newValue);
    getChartData({
      chartDataRegion: region,
      chartDataLocation: newValue,
      chartDataClimatevariable: climatevariable,
      chartDataPeriod: period,
      climateDataFilesJSONFile: climateDataFilesJSON,
      chartLineChart: lineChart
    });
  };

  // handle state change for climate variable
  const handleClimatevariableChange = (newValue) => {
    setClimatevariable(newValue);
    getChartData({
      chartDataRegion: region,
      chartDataLocation: location,
      chartDataClimatevariable: newValue,
      chartDataPeriod: period,
      climateDataFilesJSONFile: climateDataFilesJSON,
      chartLineChart: lineChart
    });
    return null;
  };

  // handle state change for climate variable
  const handlePeriodChange = (newValue) => {
    setPeriod(newValue);
    getChartData({
      chartDataRegion: region,
      chartDataLocation: location,
      chartDataClimatevariable: climatevariable,
      chartDataPeriod: newValue,
      climateDataFilesJSONFile: climateDataFilesJSON,
      chartLineChart: lineChart
    });
    return null;
  };

  // handles switching of yearly and average in chart
  // avg as bars and yearly as line - default
  // yearly as bars and avg as line
  const handleSwtichAverageAndYearly = () => {
    setLineChart('avg');
    getChartData({
      chartDataRegion: region,
      chartDataLocation: location,
      chartDataClimatevariable: climatevariable,
      chartDataPeriod: period,
      climateDataFilesJSONFile: climateDataFilesJSON,
      chartLineChart: 'avg'
    });
    return null;
  };

  // handles switching of yearly and average in chart
  // avg as bars and yearly as line - default
  // yearly as bars and avg as line
  const handleSwtichMovingAverageAndYearly = () => {
    setLineChart('mavg');
    getChartData({
      chartDataRegion: region,
      chartDataLocation: location,
      chartDataClimatevariable: climatevariable,
      chartDataPeriod: period,
      climateDataFilesJSONFile: climateDataFilesJSON,
      chartLineChart: 'mavg'
    });
    return null;
  };

  // handles switching of yearly and average in chart
  // avg as bars and yearly as line - default
  // yearly as bars and avg as line
  const handleSwtichYearlyToLine = () => {
    // do something
    setLineChart('year');
    getChartData({
      chartDataRegion: region,
      chartDataLocation: location,
      chartDataClimatevariable: climatevariable,
      chartDataPeriod: period,
      climateDataFilesJSONFile: climateDataFilesJSON,
      chartLineChart: 'year'
    });
    return null;
  };

  // repalce the climate variable with human readable climate variable
  // tmax100F beceomes Days with Maximum Temperature Above 100°F
  const replaceClimatevariableType = (replaceClimatevariable) => {
    const sandboxHumanReadable = new SandboxHumanReadable();
    return sandboxHumanReadable.getClimateVariablePullDownText(replaceClimatevariable);
  };

  // repalce the period variable with human readable period variable
  // 1900-current beceomes 1900 - X year in YYYY format - 2021
  const replacePeriodType = (replacePeriod) => {
    const sandboxHumanReadable = new SandboxHumanReadable();
    return sandboxHumanReadable.getPeriodPullDownText(replacePeriod);
  };

  // hack to export svg, not using using pure JS
  const convertToOneSvg = (svgSelector) => {
    // fiond and covnert html all plotly chart nodes
    // (plotly puts legends and the chart in seperate nodes)
    // to an JS array
    const svgs = Array.from(document.querySelectorAll(svgSelector));
    const mergedDiv = document.createElement('div');
    mergedDiv.setAttribute('id', 'merged-div');

    // create a new svg element
    const mergedSVG = document.createElement('svg');

    // set new svg element getAttributes to match the first plotly svg element
    // this will ensure width/height style and all the other settings match in the export
    mergedSVG.setAttribute('xmlns', svgs[0].getAttribute('xmlns'));
    mergedSVG.setAttribute('xmlns:xlink', svgs[0].getAttribute('xmlns:xlink'));
    mergedSVG.setAttribute('width', svgs[0].getAttribute('width'));
    mergedSVG.setAttribute('height', svgs[0].getAttribute('height'));
    mergedSVG.setAttribute('style', svgs[0].getAttribute('style'));

    // append the svg to the div - this is needed to export the svg tet properly
    mergedDiv.appendChild(mergedSVG);

    // iterate all the plotly nodes and merge them into the same svg node
    // this forces all the svg into one dom element to export correctly
    svgs.forEach((svgnode) => {
      const content = Array.from(svgnode.childNodes);
      content.forEach((svgele) => {
        // drag layer contains svg that is not needed and results
        // in svg data that will require manipulation of data.
        if (!svgele.classList.contains('draglayer')) {
          const node = svgele.cloneNode(true);
          mergedSVG.appendChild(node);
        }
      });
    });

    // create the base64 data text so the svg is written correctly
    const base64doc = btoa(unescape(encodeURIComponent(mergedSVG.outerHTML)));

    // remove the added dom element used to create the svg base64 data
    mergedDiv.remove();
    return base64doc;
  };

  // creates a download file name with current date and time and all the
  // chart settings from the ui
  const getDownloadName = () => {
    // // get curent data time
    // const date = new Date().toISOString().slice(0, 10);

    // get human readable versons of text
    const sandboxHumanReadable = new SandboxHumanReadable('');
    const chartTitle = sandboxHumanReadable.getChartTitle({
      climatevariable,
      region,
      titleLocation: replaceLocationAbbreviation(location)
    });

    // format file name
    return `${chartTitle}`;
  };

  // take blob data and add it to a href, intiate a click so the file downloads
  const donwloadFile = (data, type = 'svg') => {
    // create a new a element
    const a = document.createElement('a');

    // add click handler
    const e = new MouseEvent('click');

    // create download name based on curent settings
    a.download = `${getDownloadName()}.${type}`;

    if (type === 'svg') {
      // add data to href so its "on the fly"
      const b64start = 'data:image/svg+xml;base64,';
      a.href = `${b64start}${data}`;
    } else {
      a.href = data;
    }

    // force click
    a.dispatchEvent(e);

    // Remove a element
    a.remove();
    return null;
  };

  // convert svg base64 data to png
  const convertToPng = (svgSelector) => {
    // fiond and covnert html all plotly chart nodes
    // (plotly puts legends and the chart in seperate nodes)
    // to an JS array
    const svgs = Array.from(document.querySelectorAll(svgSelector));
    const width = svgs[0].getAttribute('width');
    const height = svgs[0].getAttribute('height');
    const mergedDiv = document.createElement('div');
    mergedDiv.setAttribute('id', 'merged-div');

    // create a new svg element
    const mergedSVG = document.createElement('svg');

    // set new svg element getAttributes to match the first plotly svg element
    // this will ensure width/height style and all the other settings match in the export
    mergedSVG.setAttribute('xmlns', svgs[0].getAttribute('xmlns'));
    mergedSVG.setAttribute('xmlns:xlink', svgs[0].getAttribute('xmlns:xlink'));
    mergedSVG.setAttribute('width', width);
    mergedSVG.setAttribute('height', height);
    mergedSVG.setAttribute('style', svgs[0].getAttribute('style'));
    // append the svg to the div - this is needed to export the svg tet properly
    mergedDiv.appendChild(mergedSVG);

    // iterate all the plotly nodes and merge them into the same svg node
    // this forces all the svg into one dom element to export correctly
    svgs.forEach((svgnode) => {
      const content = Array.from(svgnode.childNodes);
      content.forEach((svgele) => {
        const node = svgele.cloneNode(true);
        mergedSVG.appendChild(node);
      });
    });

    const blob = new Blob([mergedSVG.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(blob);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, width, height);
      const png = canvas.toDataURL();
      donwloadFile(png, 'png');
    };
    image.src = blobURL;
  };

  // handles downloads chart as SVG
  const handleDownloadChartAsSVG = () => {
    const base64doc = convertToOneSvg('.js-plotly-plot .main-svg');
    donwloadFile(base64doc);
  };

  // handles mail to TSU
  const handleMailToTSU = () => {
    const sandboxHumanReadable = new SandboxHumanReadable();
    const TSUEMail = document.createElement('a');

    // convert the all the parameters to human readable title
    const chartTitle = sandboxHumanReadable.getChartTitle({
      climatevariable,
      region,
      titleLocation: location
    });

    // email subject
    const emailSubject = 'Here is my chart for the NCA';

    // email subject with link to chart
    const emailBody = `I created a chart to show the ${chartTitle}, using the NCA Sandbox. Here is a link to the chart: \n ${encodeURIComponent(window.location.href)}`;
    TSUEMail.href = `mailto:mail@example.org?subject=${emailSubject}&body=${emailBody}`;

    // force click
    const e = new MouseEvent('click');
    TSUEMail.dispatchEvent(e);

    // Remove a element
    TSUEMail.remove();
    return null;
  };

  // handles downloads chart as SVG
  const handleDownloadChartAsPNG = () => {
    convertToPng('.js-plotly-plot .main-svg');
  };

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
                  missing={(!region)}
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
                  missing={(region !== 'National' && !location)}
                  replaceClimatevariableType={replaceClimatevariableType}
                  replaceLocationAbbreviation={replaceLocationAbbreviation}
                  />
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} className={'sandbox-varriable-selectors'} >
              <Box fontWeight='fontWeightBold' m={1} display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='flex-start'>
                <SandboxSelector
                  items={climatevariableItems}
                  controlName={'Select a Climate Variable'}
                  onChange={handleClimatevariableChange}
                  value={climatevariable}
                  disabled={climatevariableDisabled}
                  missing={(!climatevariable)}
                  replaceClimatevariableType={replaceClimatevariableType}
                  />
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} className={'sandbox-varriable-selectors'} >
              <Box fontWeight='fontWeightBold' m={1} display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='flex-start'>
                <SandboxSelector
                  items={Periods}
                  controlName={'Select a Time Period'}
                  onChange={handlePeriodChange}
                  value={period}
                  disabled={periodDisabled}
                  missing={(!period)}
                  replaceClimatevariableType={replaceClimatevariableType}
                  replacePeriodType={replacePeriodType}
                  />
              </Box>
            </Grid>

            <Grid item xs={12} className={classes.sandboxExports} >
              <SandboxActionMenu
                handleDownloadChartAsPNGa={handleDownloadChartAsPNG}
                handleDownloadChartAsSVGa={handleDownloadChartAsSVG}
                handleSwtichAverageAndYearlya={handleSwtichAverageAndYearly}
                handleSwtichMovingAverageAndYearlya={handleSwtichMovingAverageAndYearly}
                handleSwtichYearlyToLinea={handleSwtichYearlyToLine}
                handleMailToTSUa={handleMailToTSU}
                lineChart={lineChart}
                />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} display='flex' flex={1} className={classes.sandboxChartRegion}>

          <Box display='flex' flexDirection='row' m={1} width={1} justifyContent='center' flex={1} flexGrow={3}>
              <SandboxAlert
                shouldOpenAlert={openError}
                errorType={errorType}
                chartErrorTitle={chartErrorTitle}
                chartErrorMessage={chartErrorMessage}
                />
          </Box>

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
  chartDataPeriod: PropTypes.string,
  climateDataFilesJSONFile: PropTypes.object,
  chartLineChart: PropTypes.string
};
