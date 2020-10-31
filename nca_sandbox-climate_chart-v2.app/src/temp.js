import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import Slider from '@material-ui/core/Slider';
import Selector from './Selector.js';
import SandboxDataCheck from './SandboxDataCheck.js';
import Divider from '@material-ui/core/Divider';
import blueGrey from '@material-ui/core/colors/blueGrey';

library.add(faChartLine);
const bgChart = blueGrey[100];
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    [theme.breakpoints.down('xs')]: {
      overflow: 'scroll',
    },
  },
  header: {
    height: '60px',
    maxHeight: '80px',
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
  yearSlider: {
    height: '75px',
    maxHeight: '75px',
  },
  chartRegion: {
    height: 'calc(100% - 225px)',
    [theme.breakpoints.down('xs')]: {
      height: '225px',
    },
  },
  chartBg: {
    backgroundColor: bgChart,
  }
}));

function valuetext(value) {
  return `${value}°C`;
}

export default function SandboxControls() {
  const classes = useStyles();
  const [value, setValue] = React.useState([20, 37]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} justify="flex-start" direction={"row"} className={classes.root}>

        <Grid item xs={12} className={classes.header} width="100%" >
          <Box fontWeight="fontWeightBold" m={1} p={1} display="flex" flexWrap="nowrap" justifyContent="flex-start">
            <Box px={1} color="text.secondary" fontSize="h4.fontSize" className={classes.headerIcon}>
              <FontAwesomeIcon icon={["fas", "chart-line"]} />
            </Box>
            <Box px={1} color="text.secondary" fontSize="h5.fontSize">NCA Sandbox - Climate Charts</Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3} className={classes.varriableSelectors}>
          <Box fontWeight="fontWeightBold" m={1} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start">
            <Selector items={['test1', 'test2', 'test3']}/>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.varriableSelectors}>
          <Box fontWeight="fontWeightBold" m={1} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start">
            <Selector items={['test4', 'test5', 'test6']}/>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.varriableSelectors}>
          <Box fontWeight="fontWeightBold" m={1} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start">
            <Selector items={['test7', 'test8', 'test9']}/>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.varriableSelectors}>
          <Box fontWeight="fontWeightBold" ml={2}  display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="flex-start" className={classes.checkBox}>
            <SandboxDataCheck />
          </Box>
        </Grid>

        <Grid item xs={12}  className={classes.yearSlider}>
          <Box fontWeight="fontWeightBold" p={2} display="flex" flexDirection="row" flexWrap="nowrap" flex={0} flexGrow={0} flexShrink={0}>
            <Slider
              value={value}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              color="primary"
              />
          </Box>
        </Grid>

        <Grid item xs={12}  display="flex"  flex={1} className={classes.chartRegion}>
          <Divider variant="middle" />
          <Box className={classes.chartBg} fontWeight="fontWeightBold" m={2} p={2} display="flex" flexDirection="row" justifyContent="center" flex={1} flexGrow={3} height="90%" >
            Chart Goes Here
          </Box>
        </Grid>

      </Grid>
    </div>
  );
}
