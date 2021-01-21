// floating action buttons for downloading and switching bar and averages.
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import SaveAltIcon from '@material-ui/icons/SaveAlt';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const useStyles = makeStyles((theme) => ({
  sandboxExportsButtonBox: {
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'unset'
    }
  },
  fabsvg: {
    position: 'relative',
    margin: theme.spacing(1),
    zIndex: 1000,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}));

export default function Selector(props) {
  const classes = useStyles();
  const { handleSwtichAverageAndYearlya } = props;
  const { handleSwtichMovingAverageAndYearlya } = props;
  const { handleDownloadChartAsPNGa } = props;
  const { handleDownloadChartAsSVGa } = props;
  const { handleMailToTSUa } = props;

  const handleSwtichAverageAndYearly = (event) => {
    handleSwtichAverageAndYearlya(event.target.value);
  };

  const handleSwtichMovingAverageAndYearly = (event) => {
    handleSwtichMovingAverageAndYearlya(event.target.value);
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
        <Button onClick={handleSwtichMovingAverageAndYearly} className={classes.fabsvg} variant="contained" color="default" startIcon={<SwapHorizontalCircleIcon />}>
          Switch moving average and yearly
        </Button>
        <Button onClick={handleSwtichAverageAndYearly} className={classes.fabsvg} variant="contained" color="default" startIcon={<SwapHorizontalCircleIcon />}>
          Switch average and yearly
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
  handleSwtichAverageAndYearlya: PropTypes.func,
  handleSwtichMovingAverageAndYearlya: PropTypes.func,
  handleDownloadChartAsPNGa: PropTypes.func,
  handleDownloadChartAsSVGa: PropTypes.func,
  handleMailToTSUa: PropTypes.func,
  onChange: PropTypes.func
};
