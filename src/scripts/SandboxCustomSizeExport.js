import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import SandboxDefaultExportSizes from '../configs/SandboxDefaultExportSizes';

const darkGrey = '#E6E6E6';

const useStyles = makeStyles((theme) => ({
  exportModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  exportModalDiv: {
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    },
    backgroundColor: theme.palette.background.paper,
    border: '0px solid transparent',
    outline: 'unset',
    borderRadius: '4px',
    padding: theme.spacing(2, 4, 3)
  },
  exportHeaderText: {
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${darkGrey}`
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
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '.75em'
    }
  },
  exportButtons: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  exportForm: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  exportInput: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(2),
    width: '45%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  exportSmallButtonText: {
    marginLeft: theme.spacing(1)
  },
  exportHeaderIcon: {
    fontSize: '1.65rem',
    marginBottom: theme.spacing(-0.3)
  }
}));

export default function SandboxCustomSizeExport(props) {
  const classes = useStyles();
  const { open } = props;
  const { handleCustomSizeClose } = props;
  const { exportFunc } = props;
  const { exportHeading } = props;
  const { exportType } = props;

  // set constant for svg selector - this is html element that holds the chart
  //  and all its sub elements we want the width and height
  //  so we can set the custom dimensions
  const svgSelector = '.js-plotly-plot .main-svg';

  //  get default dimensions from config
  const sandboxDefaultExportSizes = new SandboxDefaultExportSizes();
  const defaultSizes = sandboxDefaultExportSizes.filter((value) => (value.name === 'Default'));

  // get the dimensions of the chart currently
  // if none than use the default 1250x300
  const defaultDimensions = () => {
    const svgElem = document.querySelector(svgSelector);
    let width = defaultSizes.width;
    let height = defaultSizes.height;
    if (svgElem) {
      width = svgElem.getAttribute('width');
      height = svgElem.getAttribute('height');
    }
    return { width, height };
  };

  // set the default state
  const dimensions = defaultDimensions();
  const [exportWidth, setExportWidth] = useState(dimensions.width);
  const [exportHeight, setExportHeight] = useState(dimensions.height);

  const [wysiwygWidth, setWysiwygWidth] = useState(dimensions.width);
  const [wysiwygHeight, setWysiwygHeight] = useState(dimensions.height);

  // only run when the compnent mounts
  useEffect(() => {
    // on resize re calc dimensions
    window.addEventListener('resize', () => {
      const currentDimensions = defaultDimensions();
      setExportWidth(parseInt(currentDimensions.width, 10));
      setExportHeight(parseInt(currentDimensions.height, 10));
      setWysiwygWidth(parseInt(currentDimensions.width, 10));
      setWysiwygHeight(parseInt(currentDimensions.height, 10));
    });
    // passing an empty array as the dependencies of the effect will cause it to run
    //   the listener to be added only one time
  }, []);

  // handle export modal close event
  const handleClose = (event) => {
    handleCustomSizeClose(false);
  };

  // handle export modal expor the chart event
  const handleExportClick = () => {
    exportFunc(svgSelector, exportWidth, exportHeight);
    // adds timeout for resizeing of image.
    //  without the time and the mouse could be over the graph
    //  and result on hover text shpwing up on exprt
    setTimeout(() => { handleClose(); }, 650);
  };

  // handle default dimension change
  const handlePresetDimensionsWidthChange = (event) => {
    setExportWidth(parseInt(event.currentTarget.value, 10));
  };

  // handle default dimension change
  const handlePresetDimensionsHeightChange = (event) => {
    setExportHeight(parseInt(event.currentTarget.value, 10));
  };

  // get dimension from config
  const getDimensions = (name) => {
    const dimensionFromButton = sandboxDefaultExportSizes.filter((value) => (value.name === name));
    return dimensionFromButton[0].dimensions;
  };

  // handle default dimension click
  const handlePresetDimensionsClick = (event) => {
    // Wysiwyg - dimensions will be the same as the website.
    if (event.currentTarget.value === 'Default') {
      const defaultDimensionswysiwyg = defaultDimensions();
      setExportWidth(parseInt(defaultDimensionswysiwyg.width, 10));
      setExportHeight(parseInt(defaultDimensionswysiwyg.height, 10));
      // dimensions will match a default from config - ../configs/SandboxDefaultExportSizes
    } else {
      const configDimensions = getDimensions(event.currentTarget.value);
      setExportWidth(parseInt(configDimensions.width, 10));
      setExportHeight(parseInt(configDimensions.height, 10));
    }
  };

  return (
      <Modal
        disableBackdropClick
        disableEscapeKeyDown
        className={classes.exportModal}
        classes={{ focused: classes.exportModal }}
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description' >
        <div className={classes.exportModalDiv}>
          <h2 id='simple-modal-title' className={classes.exportHeaderText}>
            <SaveAltIcon className={classes.exportHeaderIcon}/> {exportHeading}
          </h2>
          <p id='simple-modal-description' className={classes.exportDescriptionText}>
            Export the chart to a custom size or use one of the
            predetermined dimensions. The default option will match the
            what the dimensions you see on the page (WYSIWYG).
          </p>
          <Button
            className={classes.exportButtons}
            onClick={handlePresetDimensionsClick}
            variant='contained'
            color='primary'
            value='Default'>
              Default
              <small className={classes.exportSmallButtonText}>
                ({wysiwygWidth} x {wysiwygHeight})
              </small>
          </Button>
          <Button
            className={classes.exportButtons}
            onClick={handlePresetDimensionsClick}
            variant='outlined'
            color='primary'
            value='NCA'>
              NCA
              <small className={classes.exportSmallButtonText}>
                ({getDimensions('NCA').width} x {getDimensions('NCA').height})
              </small>
          </Button>

          <FormControl className={classes.exportForm}>
            <TextField
              className={classes.exportInput}
              onChange={handlePresetDimensionsWidthChange}
              id='outlined-number-width'
              variant='outlined'
              label='Width'
              type='number'
              value={exportWidth}
              InputLabelProps={{ shrink: true }}
              InputProps={{ endAdornment: <InputAdornment position='end'>PX</InputAdornment>, inputProps: { min: 250, max: 5000 } }}/>
            <TextField
              className={classes.exportInput}
              onChange={handlePresetDimensionsHeightChange}
              id='outlined-number-height'
              variant='outlined'
              label='Height'
              type='number'
              value={exportHeight}
              InputLabelProps={{ shrink: true }}
              InputProps={{ endAdornment: <InputAdornment position='end'>PX</InputAdornment>, inputProps: { min: 250, max: 5000 } }} />
          </FormControl>
          <div className={classes.exportContainer}>
            <div className={classes.exportStart}>
              <Button
                className={classes.exportButtons}
                onClick={handleExportClick}
                color='primary'
                variant='contained'
                startIcon={<SaveAltIcon />}>Export {exportType}
              </Button>
            </div>
            <div className={classes.exportEnd}>
              <Button
                className={classes.exportButtons}
                onClick={handleClose}
                color='default'
                variant='contained' >Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
  );
}

SandboxCustomSizeExport.propTypes = {
  handleCustomSizeClose: PropTypes.func,
  exportFunc: PropTypes.func,
  exportHeading: PropTypes.string,
  exportType: PropTypes.string,
  open: PropTypes.bool
};
