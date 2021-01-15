import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';

const useStyles = makeStyles((theme) => ({
  sandboxAlertBox: {
    color: '#000000',
    position: 'absolute',
    zIndex: '1000'
  },
  sandboxAlertCollapse: {
    position: 'relative',
    width: '100%'
  }
}));

export default function Alert(props) {
  const classes = useStyles();
  const { chartErrorTitle } = props;
  const { chartErrorMessage } = props;
  const { errorType } = props;
  const { openError } = props;

  const errorBgColor = red[500];
  const errorBorderColor = red[900];
  const warningBgColor = orange[500];
  const warningBorderColor = orange[800];

  // get the background color for error type
  const backgroundColor = (theErrorType) => {
    switch (theErrorType) {
      case 'Error':
        return errorBgColor;
      case 'Warning':
        return warningBgColor;
      default:
        return warningBgColor;
    }
  };

  // get the border color for error type
  const borderColor = (theErrorType) => {
    switch (theErrorType) {
      case 'Error':
        return errorBorderColor;
      case 'Warning':
        return warningBorderColor;
      default:
        return warningBorderColor;
    }
  };

  return (
    <Collapse className={classes.sandboxAlertCollapse} in={openError} >
      <Box className={classes.sandboxAlertBox} bgcolor={backgroundColor(errorType)} color='text.primary' p={1} mr={2} borderRadius={4} border={1} borderColor={borderColor(errorType)} >
        <Box fontWeight="fontWeightBold" py={1} display='flex'>
          <div className={'sandbox-alert-icon'} ><ErrorOutlineIcon /></div>
          <div className={'sandbox-alert-header'}>{chartErrorTitle}</div>
        </Box>
        {chartErrorMessage}
      </Box>
    </Collapse>
  );
}

Alert.propTypes = {
  chartErrorTitle: PropTypes.string,
  chartErrorMessage: PropTypes.string,
  errorType: PropTypes.string,
  openError: PropTypes.string
};
