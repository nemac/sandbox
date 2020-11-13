import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const sliderColor = '#5C5C5C';

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: sliderColor
      },
      track: {
        color: sliderColor
      },
      rail: {
        color: sliderColor
      }
    }
  }
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minHeight: 95,
    color: '#5C5C5C'
  }
}));

const valuetext = (value) => `${value}`;

export default function SandboxSlider(props) {
  const classes = useStyles();
  const { sliderValues } = props;
  const { disabled } = props;
  const { useRobustClicked } = props;
  const { sliderMinxMaxValues } = props;
  const { onChange } = props;

  // only run after robust data click
  if (useRobustClicked) {
    sliderValues[0] = sliderMinxMaxValues[0];
    sliderValues[1] = sliderMinxMaxValues[1];
  }

  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <FormControl variant='outlined' className={classes.formControl} fullWidth={true} disabled={disabled}>
      <Grid container spacing={0} justify='flex-start' direction={'row'} >
        <Grid item xs={12} width='100%' >
          <Divider variant='middle' />
        </Grid>
        <Box fontWeight='fontWeightRegular' pb={2} display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='center' textAlign='center'>
        </Box>
      </Grid>
      <Grid container spacing={1} justify='flex-start' direction={'row'} >
        <Grid item xs={1} width='100%' >
          <Box fontWeight='fontWeightMedium' p={1} variant='h3' display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='center' textAlign='center'>
            Start Year <br />{sliderValues[0]}
          </Box>
        </Grid>
        <Grid item xs={10} width='100%' >
          <Box fontWeight='fontWeightRegular' p={1} display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='center' textAlign='center'>
            <ThemeProvider theme={muiTheme}>
              <Slider
                value={sliderValues}
                min={sliderMinxMaxValues[0]}
                max={sliderMinxMaxValues[1]}
                onChange={handleChange}
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
                getAriaValueText={valuetext}
                color='primary'
                />
            </ThemeProvider>
          </Box>
        </Grid>
        <Grid item xs={1} width='100%' >
          <Box fontWeight='fontWeightMedium' p={1} variant='h3' display='flex' flexDirection='row' flexWrap='nowrap' justifyContent='center' textAlign='center'>
            End Year <br />{sliderValues[1]}
          </Box>
        </Grid>
      </Grid>
    </FormControl>
  );
}

SandboxSlider.propTypes = {
  sliderValues: PropTypes.array,
  disabled: PropTypes.bool,
  useRobustClicked: PropTypes.bool,
  sliderMinxMaxValues: PropTypes.array,
  onChange: PropTypes.func
};