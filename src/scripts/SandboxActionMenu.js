// floating action buttons for downloading and switching bar and averages.
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import SaveAltIcon from '@material-ui/icons/SaveAlt';
import TimelineIcon from '@material-ui/icons/Timeline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const useStyles = makeStyles((theme) => ({
  sandboxExportsButtonBox: {
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1),
      justifyContent: 'unset'
    }
  },
  sandboxSelectedButton: {
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'unset'
    }
  },
  fabsvg: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      width: '100%'
    }
  },
  fabsvgLeft: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(0),
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(0),
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      width: '100%'
    }
  },
  fabsvgCenter: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    borderRadius: '0px',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(0),
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      width: '100%'
    }
  },
  fabsvgRight: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(1),
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      width: '100%'
    }
  },
  MenuItem: {
    textDecoration: 'underline'
  }
}));

export default function Selector(props) {
  const classes = useStyles();
  const { handleSwtichYearlyToLinea } = props;
  const { handleSwtichAverageAndYearlya } = props;
  const { handleSwtichMovingAverageAndYearlya } = props;
  const { handleDownloadChartAsPNGa } = props;
  const { handleDownloadChartAsSVGa } = props;
  const { handleMailToTSUa } = props;
  const { lineChart } = props;

  const setSelected = (whichchart, me) => {
    switch (lineChart) {
      case 'year':
        // yearly the line chart average is the bar chart
        if (me === lineChart) {
          return 'sandbox-start-icon-selected';
        }
        return 'sandbox-start-icon-not-selected';
      case 'avg':
        // average the line chart yearly is the bar chart
        if (me === lineChart) {
          return 'sandbox-start-icon-selected';
        }
        return 'sandbox-start-icon-not-selected';
      case 'mavg':
        // moving average the line chart yearly is the bar chart
        if (me === lineChart) {
          return 'sandbox-start-icon-selected';
        }
        return 'sandbox-start-icon-not-selected';
      default:
        // yearly the line chart average is the bar chart
        if (me === lineChart) {
          return 'sandbox-start-icon-selected';
        }
        return 'sandbox-start-icon-not-selected';
    }
  };

  const handleSwtichAverageAndYearly = (event) => {
    handleSwtichAverageAndYearlya(event.target.value);
  };

  const handleSwtichMovingAverageAndYearly = (event) => {
    handleSwtichMovingAverageAndYearlya(event.target.value);
  };

  const handleSwtichYearlyToLine = (event) => {
    handleSwtichYearlyToLinea(event.target.value);
  };

  const handleDownloadChartAsPNG = (event) => {
    handleDownloadChartAsPNGa();
  };

  const handleDownloadChartAsSVG = (event) => {
    handleDownloadChartAsSVGa();
  };

  const handleMailToTSU = (event) => {
    handleMailToTSUa();
  };

  return (
    <Box className={classes.sandboxExportsButtonBox} fontWeight='fontWeightBold' mt={1} display='flex' flexDirection='row' flexWrap='nowrap' >
      <div >
        <Button onClick={handleSwtichYearlyToLine} classes={{ root: `${setSelected(lineChart, 'year')}` }} className={classes.fabsvgLeft} variant="contained" color="default" startIcon={<TimelineIcon />}>
          Yearly
        </Button>
        <Button onClick={handleSwtichAverageAndYearly} classes={{ root: `${setSelected(lineChart, 'avg')}` }} className={classes.fabsvgCenter} variant="contained" color="default" startIcon={<TimelineIcon />}>
          Average
        </Button>
        <Button onClick={handleSwtichMovingAverageAndYearly} classes={{ root: `${setSelected(lineChart, 'mavg')}` }} className={classes.fabsvgRight} variant="contained" color="default" startIcon={<TimelineIcon />}>
          Moving Average
        </Button>
        <Button onClick={handleDownloadChartAsPNG} className={classes.fabsvg} variant="contained" color="default" startIcon={<SaveAltIcon />}>
          .PNG
        </Button>
        <Button onClick={handleDownloadChartAsSVG} className={classes.fabsvg} variant="contained" color="default" startIcon={<SaveAltIcon />}>
          .SVG
        </Button>
        <Button onClick={handleMailToTSU} className={classes.fabsvg} variant="contained" color="default" startIcon={<MailOutlineIcon />}>
          Send to TSU
        </Button>
      </div>
    </Box>
  );
}

Selector.propTypes = {
  handleSwtichYearlyToLinea: PropTypes.func,
  handleSwtichAverageAndYearlya: PropTypes.func,
  handleSwtichMovingAverageAndYearlya: PropTypes.func,
  handleDownloadChartAsPNGa: PropTypes.func,
  handleDownloadChartAsSVGa: PropTypes.func,
  handleMailToTSUa: PropTypes.func,
  lineChart: PropTypes.string,
  onChange: PropTypes.func
};
