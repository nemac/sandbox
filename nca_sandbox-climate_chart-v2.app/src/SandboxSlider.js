import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const muiTheme = createMuiTheme({
  overrides:{
    MuiSlider: {
      thumb:{
        color: "#5C5C5C",
      },
      track: {
        color: '#5C5C5C'
      },
      rail: {
        color: '#5C5C5C'
      }
    }
  }
});


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: "#5C5C5C",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

const valuetext =(value) => {
  return `${value}`;
};

export default function SandboxSlider(props) {
  const classes = useStyles();
  let sliderValues = props.values;
  const disabled = props.disabled;
  const useRobustClicked = props.useRobustClicked;
  const sliderMinxMaxValues = props.sliderMinxMaxValues;

  // only run after robust data click
  if (useRobustClicked) {
    sliderValues[0] = sliderMinxMaxValues[0];
    sliderValues[1] = sliderMinxMaxValues[1];
    props.setUseRobustClicked(false);
  }

  const handleChange = (event, newValue) => {
    props.onChange(newValue);
  };

  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth={true} disabled={disabled}>
      <Grid container spacing={0} justify="flex-start" direction={"row"} >
        <Grid item xs={12} width="100%" >
          <Divider variant="middle" />
        </Grid>
        <Box fontWeight="fontWeightRegular" pb={2} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="center" textAlign="center">
        </Box>
      </Grid>
      <Grid container spacing={1} justify="flex-start" direction={"row"} >
        <Grid item xs={1} width="100%" >
          <Box fontWeight="fontWeightMedium" p={1} variant="h3" display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="center" textAlign="center">
            Start Year {sliderValues[0]}
          </Box>
        </Grid>
        <Grid item xs={10} width="100%" >
          <Box fontWeight="fontWeightRegular" p={1} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="center" textAlign="center">
            <ThemeProvider theme={muiTheme}>
              <Slider
                value={sliderValues}
                min={sliderMinxMaxValues[0]}
                max={sliderMinxMaxValues[1]}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                color="primary"
                />
            </ThemeProvider>
          </Box>
        </Grid>
        <Grid item xs={1} width="100%" >
          <Box fontWeight="fontWeightMedium" p={1} variant="h3" display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="center" textAlign="center">
            End Year {sliderValues[1]}
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={0} justify="flex-start" direction={"row"} >
        <Box fontWeight="fontWeightRegular" pb={2} display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="center" textAlign="center">
        </Box>
      </Grid>
    </FormControl>
  );
}
