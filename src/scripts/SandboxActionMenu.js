// floating action buttons for downloading and switching bar and averages.
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import TimelineIcon from '@material-ui/icons/Timeline';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import SandboxCustomSizeExport from './SandboxCustomSizeExport';
import SandboxSumbitFigure from './SandboxSumbitFigure';

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
    minWidth: '75px',
    margin: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      fontSize: '.80rem'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(0),
      width: '100%'
    }
  },
  fabsvgLeft: {
    minWidth: '150px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(0),
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    [theme.breakpoints.down('md')]: {
      minWidth: '135px',
      fontSize: '.85rem'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(0),
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(1),
      width: '100%'
    }
  },
  fabsvgCenter: {
    minWidth: '150px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    borderRadius: '0px',
    [theme.breakpoints.down('md')]: {
      minWidth: '135px',
      fontSize: '.85rem'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset',
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(0),
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(1),
      width: '100%'
    }
  },
  fabsvgRight: {
    minWidth: '150px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(1),
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    [theme.breakpoints.down('md')]: {
      minWidth: '135px',
      fontSize: '.85rem'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset',
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(0),
      marginRight: theme.spacing(1),
      width: '100%'
    }
  },
  MenuItem: {
    textDecoration: 'underline'
  },
  sandboxExportsButtonBoxForm: {
    flexDirection: 'inherit',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      width: '100%'
    }
  },
  sandboxExportsButtonBoxFormLabel: {
    position: 'absolute',
    left: '45%',
    top: theme.spacing(-1.25),
    fontSize: '0.75rem',
    color: '#5C5C5C'
  }
}));

export default function Selector(props) {
  const classes = useStyles();
  const { handleSwtichYearlyToLinea } = props;
  const { handleSwtichAverageAndYearlya } = props;
  const { handleSwtichMovingAverageAndYearlya } = props;
  const { handleDownloadChartAsCSVa } = props;
  const { handleDownloadChartAsPNGa } = props;
  const { handleDownloadChartAsSVGa } = props;
  const { lineChart } = props;

  const [openCustomSizeSVG, setOpenCustomSizeSVG] = React.useState(false);
  const [openCustomSizePNG, setOpenCustomSizePNG] = React.useState(false);
  const [openSubmitFigure, setOpenSubmitFigure] = React.useState(false);

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

  const handleDownloadChartAsPNG = (svgSelector, width, height) => {
    handleDownloadChartAsPNGa(svgSelector, width, height);
  };

  const handleDownloadChartAsCSV = (event) => {
    handleDownloadChartAsCSVa();
  };

  const handleDownloadChartAsSVG = (svgSelector, width, height) => {
    handleDownloadChartAsSVGa(svgSelector, width, height);
  };

  // handles open of sumbit figure
  const handleOpenSubmitFigure = () => {
    setOpenSubmitFigure(true);
  };

  // handles close of custom size export
  const handleCloseSubmitFigure = () => {
    setOpenSubmitFigure(false);
  };

  // handles open of custom size export
  const handleCustomSizeOpenSVG = () => {
    window.dispatchEvent(new Event('resize'));
    setOpenCustomSizeSVG(true);
  };

  // handles close of custom size export
  const handleCustomSizeCloseSVG = () => {
    setOpenCustomSizeSVG(false);
  };

  // handles close of custom size export
  const handleCustomSizeOpenPNG = () => {
    window.dispatchEvent(new Event('resize'));
    setOpenCustomSizePNG(true);
  };

  // handles close of custom size export
  const handleCustomSizeClosePNG = () => {
    setOpenCustomSizePNG(false);
  };

  return (
      <Grid container spacing={0} justify='flex-end' direction={'row'} >
        <Grid item xs={12} sm={12} md={6} width='100%' >
          <Box className={classes.sandboxExportsButtonBox} fontWeight='fontWeightBold' mt={1} display='flex' flexDirection='row' flexWrap='wrap' >
            <FormControl component="fieldset" variant='outlined' className={classes.sandboxExportsButtonBoxForm}>
              <FormLabel component="legend" className={classes.sandboxExportsButtonBoxFormLabel}>Trendline</FormLabel>
            <Button onClick={handleSwtichYearlyToLine} classes={{ root: `${setSelected(lineChart, 'year')}` }} className={classes.fabsvgLeft} variant="contained" color="default" startIcon={<TimelineIcon />}>
              Yearly
            </Button>
            <Button onClick={handleSwtichAverageAndYearly} classes={{ root: `${setSelected(lineChart, 'avg')}` }} className={classes.fabsvgCenter} variant="contained" color="default" startIcon={<TimelineIcon />}>
              Average
            </Button>
            <Button onClick={handleSwtichMovingAverageAndYearly} classes={{ root: `${setSelected(lineChart, 'mavg')}` }} className={classes.fabsvgRight} variant="contained" color="default" startIcon={<TimelineIcon />}>
              Moving Average
            </Button>
          </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} width='100%' >
          <Box className={classes.sandboxExportsButtonBox} fontWeight='fontWeightBold' mt={1} display='flex' flexDirection='row' flexWrap='wrap' >
            <Button onClick={handleDownloadChartAsCSV} className={classes.fabsvg} variant="contained" color="default" startIcon={<SaveAltIcon />}>
              .CSV
            </Button>
            <Button onClick={handleCustomSizeOpenPNG} className={classes.fabsvg} variant="contained" color="default" startIcon={<SaveAltIcon />}>
              .PNG
            </Button>
            <SandboxCustomSizeExport
              open={openCustomSizePNG}
              handleCustomSizeClose={handleCustomSizeClosePNG}
              exportType={'PNG'}
              exportHeading={'Export chart to PNG'}
              exportFunc={handleDownloadChartAsPNG} />
            <Button onClick={handleCustomSizeOpenSVG} className={classes.fabsvg} variant="contained" color="default" startIcon={<SaveAltIcon />}>
              .SVG
            </Button>
            <SandboxCustomSizeExport
              open={openCustomSizeSVG}
              handleCustomSizeClose={handleCustomSizeCloseSVG}
              exportType={'SVG'}
              exportHeading={'Export chart to SVG'}
              exportFunc={handleDownloadChartAsSVG} />
            <Button onClick={handleOpenSubmitFigure} className={classes.fabsvg} variant="contained" color="default" startIcon={<MailOutlineIcon />}>
              To TSU
            </Button>
            <SandboxSumbitFigure
              open={openSubmitFigure}
              handleCloseFigure={handleCloseSubmitFigure} />
          </Box>
        </Grid>
      </Grid>
  );
}

Selector.propTypes = {
  handleSwtichYearlyToLinea: PropTypes.func,
  handleSwtichAverageAndYearlya: PropTypes.func,
  handleSwtichMovingAverageAndYearlya: PropTypes.func,
  handleDownloadChartAsCSVa: PropTypes.func,
  handleDownloadChartAsPNGa: PropTypes.func,
  handleDownloadChartAsSVGa: PropTypes.func,
  lineChart: PropTypes.string,
  onChange: PropTypes.func
};
