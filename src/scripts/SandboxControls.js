import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';

import SandboxPlotRegion from './SandboxPlotRegion';
import SandboxGeneratePlotData from './SandboxGeneratePlotData';
import SandboxHumanReadable from './SandboxHumanReadable';
import SandboxSlider from './SandboxSlider';
import SandboxSelector from './SandboxSelector';
import SandboxDataCheck from './SandboxDataCheck';

const axios = require('axios');

const white = '#FFFFFF';
const darkGreay = '#E6E6E6';
const pullDownBackground = '#FBFCFE';
const fontColor = '#5C5C5C';

const useStyles = makeStyles((theme) => ({
  sandboxRoot: {
    backgroundColor: white,
    color: fontColor,
    height: '100vh',
    [theme.breakpoints.down('xs')]: {
      overflow: 'scroll'
    }
  },
  sandboxHeader: {
    height: '60px',
    maxHeight: '60px',
    color: fontColor
  },
  sandboxHeaderIcon: {
    display: 'inline-flex',
    marginTop: '-3px'
  },
  sandboxVarriableSelectors: {
    height: '90px',
    maxHeight: '90px'
  },
  sandboxCheckBox: {
    height: '90px',
    maxHeight: '90px'
  },
  sandboxYearSlider: {
    height: '100px',
    maxHeight: '100px'
  },
  sandboxSelectionArea: {
    height: '250px',
    maxHeight: '250px',
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
    height: 'calc(100% - 250px)',
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
  const classes = useStyles();
  const [sliderValues, setsliderValues] = useState([1900, 2018]);
  const [sliderMinxMaxValues, setSliderMinxMaxValues] = useState([1900, 2018]);

  const [useRobust, setUseRobust] = useState(false);
  const [useRobustClicked, setUseRobustClicked] = useState(false);

  const [region, setRegion] = useState('');
  const [location, setLocation] = useState('');
  const [climatevariable, setClimatevariable] = useState('');
  const [chartData, setChartData] = useState([{}]);
  const layoutDefaults = { yaxis: { rangemode: 'tozero', title: 'Days' }, xaxis: { rangemode: 'tozero' } };
  const [chartLayout, setChartLayout] = useState(layoutDefaults);

  const [climateDataFilesJSON, setClimateDataFilesJSON] = useState(['']);

  const [locationItems, setLocationItems] = useState(['']);
  const [climatevariableItems, setClimatevariableItems] = useState(['']);

  const [locationDisabled, setlocationDisabled] = useState(true);
  const [climatevariableDisabled, setClimatevariableDisabled] = useState(true);

  const loadNCAdata = async (loadRegion, isRobust) => {
    await axios.get(`${window.location.href}/sandboxdata/TSU_Sandbox_Datafiles/index.json`)
      .then((response) => {
        // handle success
        let data = {};
        switch (loadRegion) {
          case 'National':
            setClimateDataFilesJSON(response.data.national);
            data = response.data.national.filter((type) => type.robust === isRobust);
            setClimatevariableItems(data.map((json) => json.type));
            break;
          case 'Regional':
            setClimateDataFilesJSON(response.data.regional);
            data = response.data.regional.filter((type) => type.robust === isRobust);
            setClimatevariableItems(data.map((json) => json.type));
            break;
          case 'State':
            setClimateDataFilesJSON(response.data.state);
            data = response.data.state.filter((type) => type.robust === isRobust);
            setClimatevariableItems(data.map((json) => json.type));
            break;
          default:
            setClimateDataFilesJSON(response.data.national);
            data = response.data.national.filter((type) => type.robust === isRobust);
            setClimatevariableItems(data.map((json) => json.type));
            break;
        }

        return response.data;
      })
      .catch((error) => {
        // handle error
        console.error(`SanboxControls.loadNCADdata() error: ${error}`); // eslint-disable-line no-console
        return [''];
      });
  };

  // use the react effect to control when location and
  // regions change to repupulalte the climate variable pulldown
  useEffect(() => {
    loadNCAdata(region, useRobust);
    setUseRobustClicked(false);
  }, [region, useRobust]);

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

  const getClimatevariableType = (switchClimatevariable) => {
    const returnValue = switchClimatevariable.includes('inch') ? 'Precipitation' : 'Temperature';
    return returnValue;
  };

  const replaceLocationAbbreviation = (replaceAbbreviationLocation) => {
    const sandboxHumanReadable = new SandboxHumanReadable();
    return sandboxHumanReadable.getLocationDownText(replaceAbbreviationLocation);
  };

  // get chart data from current state = which should include
  const getChartData = (props) => {
    const { chartDataRegion } = props;
    const { chartDataLocation } = props;
    const { chartDataClimatevariable } = props;
    const { chartDataUseRobust } = props;

    const data = climateDataFilesJSON.filter((json) => {
      const returnData = json.robust === chartDataUseRobust &&
        json.type === chartDataClimatevariable;
      return returnData;
    });
    const dataFile = data.map((json) => json.name);

    axios.get(`${window.location.href}/sandboxdata/TSU_Sandbox_Datafiles/${dataFile}`)
      .then((response) => {
        const chartDataFromFile = parseNCAFile(response.data, chartDataRegion, chartDataLocation);
        const chartType = getClimatevariableType(chartDataClimatevariable);
        const sandboxHumanReadable = new SandboxHumanReadable(chartDataClimatevariable);
        const titleLocation = replaceLocationAbbreviation(chartDataLocation);
        const chartTitle = sandboxHumanReadable.getChartTitle({
          climatevariable: chartDataClimatevariable,
          region: chartDataRegion,
          titleLocation
        });
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
        const plotData = new SandboxGeneratePlotData(plotInfo);
        const xRange = {
          xmin: sliderValues[0],
          xmax: sliderValues[1]
        };
        plotData.setXRange(xRange);
        setChartData(plotData.getData());
        setChartLayout(plotData.getLayout());
      })
      .catch((error) => {
        console.error(`SanboxControls.updatePlotData() error=${error}`); // eslint-disable-line no-console
      });
  };

  // handle the robust change
  const handleRobustChange = (newValue) => {
    if (newValue) {
      setSliderMinxMaxValues([1950, 2018]);
    } else {
      setSliderMinxMaxValues([1900, 2018]);
    }
    setUseRobust(newValue);
    setUseRobustClicked(true);
    getChartData({
      chartDataRegion: region.toLowerCase(),
      chartDataLocation: location,
      chartDataClimatevariable: climatevariable,
      chartDataUseRobust: newValue
    });
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
      chartDataRegion: region.toLowerCase(),
      chartDataLocation: location,
      chartDataClimatevariable: climatevariable,
      chartDataUseRobust: useRobust
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
      chartDataUseRobust: useRobust
    });
  };

  // handle state change for location within the region
  const handleLocationChange = (newValue) => {
    setLocation(newValue);
    getChartData({
      chartDataRegion: region.toLowerCase(),
      chartDataLocation: newValue,
      chartDataClimatevariable: climatevariable,
      chartDataUseRobust: useRobust
    });
  };

  // handle state change for climate variable
  const handleClimatevariableChange = (newValue) => {
    setClimatevariable(newValue);
    getChartData({
      chartDataRegion: region.toLowerCase(),
      chartDataLocation: location,
      chartDataClimatevariable: newValue,
      chartDataUseRobust: useRobust
    });
    return null;
  };

  const replaceClimatevariableType = (replaceClimatevariable) => {
    const sandboxHumanReadable = new SandboxHumanReadable();
    return sandboxHumanReadable.getClimateVariablePullDownText(replaceClimatevariable);
  };

  return (
    <div className={classes.sandboxRoot}>
      <Grid container spacing={0} justify='flex-start' direction={'row'} className={classes.sandboxRoot}>
        <Grid item xs={12} width='100%' className={classes.sandboxSelectionAreaHolder} >
          <Grid container spacing={0} justify='flex-start' direction={'row'} className={classes.sandboxSelectionArea}>
            <Grid item xs={12} className={classes.sandboxHeader} width='100%' >
              <Box fontWeight='fontWeightBold' m={1} p={1} display='flex' flexWrap='nowrap' justifyContent='flex-start'>
                <Box px={1} fontSize='h4.fontSize' >
                  <InsertChartOutlinedIcon fontSize='large' className={classes.sandboxHeaderIcon} />
                </Box>
                <Box px={1} fontSize='h5.fontSize' >NCA Sandbox - Climate Charts</Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={3} className={classes.sandboxVarriableSelectors}>
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
            <Grid item xs={12} sm={3} className={classes.sandboxVarriableSelectors}>
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
            <Grid item xs={12} sm={3} className={classes.sandboxVarriableSelectors} >
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
            <Grid item xs={12} sm={3} className={classes.varriableSelectors}>
              <Box fontWeight='fontWeightBold' ml={2} display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='flex-start' className={classes.sandboxCheckBox}>
                <SandboxDataCheck
                  useRobust={useRobust}
                  onChange={handleRobustChange}
                  />
              </Box>
            </Grid>

            <Grid item xs={12} className={classes.sandboxYearSlider} >
              <Box fontWeight='fontWeightBold' m={1} display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='center' >
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
          <Box display='flex' mt={3} flexDirection='row' justifyContent='center' flex={1} flexGrow={3} height='90%' >
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
  chartDataUseRobust: PropTypes.bool
};
