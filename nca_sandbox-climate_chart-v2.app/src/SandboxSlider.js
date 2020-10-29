import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


// const muiTheme = createMuiTheme({
//   overrides:{
//     MuiSlider: {
//       mark: {
//         left: '2.5rem !important'
//       }
//     }
//   }
// });



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
  const useRobust = props.useRobust;
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

  const marks = [
    {
      value: sliderMinxMaxValues[0],
      label: 'Start Year',
    },
    {
      value: sliderMinxMaxValues[1],
      label: 'End Year',
    },
  ];

 return (
     <FormControl variant="outlined" className={classes.formControl} fullWidth={true} disabled={disabled}>
       <ThemeProvider>
         <Slider
           value={sliderValues}
           min={sliderMinxMaxValues[0]}
           max={sliderMinxMaxValues[1]}
           onChange={handleChange}
           valueLabelDisplay="auto"
           aria-labelledby="range-slider"
           getAriaValueText={valuetext}
           color="primary"
           marks={marks}
           />
       </ThemeProvider>
     </FormControl>
 );
}
