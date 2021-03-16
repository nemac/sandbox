import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';

const darkGrey = '#E6E6E6';

const useStyles = makeStyles((theme) => ({
    exportModal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    exportModalDiv: {
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        width: '80%'
      },
      backgroundColor: theme.palette.background.paper,
      border: '0px solid transparent',
      outline: 'unset',
      borderRadius: '4px',
      padding: theme.spacing(2, 4, 3),
    },
    exportHeaderText: {
      paddingBottom: theme.spacing(1),
      borderBottom: `1px solid ${darkGrey}`,
    },
    exportContainer: {
      paddingTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'flex-end'
    },
    exportStart: {
      display: 'flex',
      marginRight: 'auto'
    },
    exportEnd: {
      display: 'flex'
    },
    exportDescriptionText: {
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        fontSize: '.75em'
      }
    },
    exportButtons: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    exportForm: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    exportInput: {
      marginTop: theme.spacing(3),
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    }
}));

export default function SandboxCustomSizeExport(props) {
  const classes = useStyles();
  const { open } = props;
  const { handleCustomSizeOpen } = props;
  const { handleCustomSizeClose } = props;
  const { exportFunc } = props;
  const { exportHeading } = props;
  const { exportDescription } = props;
  const { exportType } = props;

  // set constant for svg selector - this is html element that holds the chart
  //  and all its sub elements we want the width and height
  //  so we can set the custom dimensions
  const svgSelector = '.js-plotly-plot .main-svg';

  // get the dimensions of the chart currently
  // if none than use the default 1250x300
  const defaultDimensions = () => {
    const svgElem = document.querySelector(svgSelector);
    let width = 1250;
    let height = 300;
    if (svgElem) {
      width = svgElem.getAttribute('width');
      height = svgElem.getAttribute('height');
    }
    return { width, height };
  };

  // set the default state
  const dimensions = defaultDimensions();
  const [ exportWidth, setExportWidth] = useState(dimensions.width);
  const [ exportHeight, setExportHeight] = useState(dimensions.height);

  // only run when the compnent mounts
  React.useEffect(() => {
    // on resize re calc dimensions
    window.addEventListener("resize", () => {
      const dimensions = defaultDimensions();
      setExportWidth(dimensions.width);
      setExportHeight(dimensions.height);
    });
    /* passing an empty array as the dependencies of the effect will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);

  // handle export modal open event
  const handleOpen = (event) => {
    handleCustomSizeOpen(true);
  };

  // handle export modal close event
  const handleClose = (event) => {
    handleCustomSizeClose(false);
  };

  // handle export modal expor the chart event
  const handleExportClick= () => {
    exportFunc(svgSelector, exportWidth, exportHeight);
    handleClose();
  };

  return (
      <Modal disableBackdropClick disableEscapeKeyDown className={classes.exportModal} classes={{ focused: classes.exportModal }} open={open} onClose={handleClose} aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description' >
        <div className={classes.exportModalDiv}>
          <h2 id='simple-modal-title' className={classes.exportHeaderText}>{exportHeading}</h2>
          <p id='simple-modal-description' className={classes.exportDescriptionText}>
            {exportDescription}
          </p>
          <FormControl className={classes.exportForm}>
            <TextField className={classes.exportInput} id='outlined-number-width' variant='outlined' label='Width' type='number'
              defaultValue={exportWidth}
              InputLabelProps={{ shrink: true, }}
              InputProps={{endAdornment: <InputAdornment position="end">PX</InputAdornment>,inputProps: { min: 250, max: 5000 }}}/>
            <TextField className={classes.exportInput} id='outlined-number-height' variant='outlined' label='Height' type='number'
              defaultValue={exportHeight}
              InputLabelProps={{ shrink: true, }}
              InputProps={{endAdornment: <InputAdornment position="end">PX</InputAdornment>,inputProps: { min: 250, max: 5000 }}} />
          </FormControl>
          <div className={classes.exportContainer}>
            <div className={classes.exportStart}>
              <Button className={classes.exportButtons} onClick={handleExportClick} color='primary' variant='contained' startIcon={<SaveAltIcon />}>Export {exportType}</Button>
            </div>
            <div className={classes.exportEnd}>
              <Button className={classes.exportButtons} onClick={handleClose} color='default' variant='contained' startIcon={<CancelIcon />}>Close</Button>
            </div>
          </div>
        </div>
      </Modal>
  );
}

SandboxCustomSizeExport.propTypes = {
  handleCustomSizeOpen: PropTypes.func,
  handleCustomSizeClose: PropTypes.func,
  exportFunc: PropTypes.func,
  exportHeading: PropTypes.string,
  exportType: PropTypes.string,
  exportDescription: PropTypes.string,
  open: PropTypes.bool
};
