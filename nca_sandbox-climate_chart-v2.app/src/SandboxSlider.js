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

const marks = [
  {
    value: 1900,
    label: 'Start Year',
  },
  {
    value: 2018,
    label: 'End Year',
  },
];

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
  const sliderValues = props.values;
  const disabled = props.disabled;

  const handleChange = (event, newValue) => {
    props.onChange(newValue);
  };

 return (
     <FormControl variant="outlined" className={classes.formControl} fullWidth={true} disabled={disabled}>
       <ThemeProvider>
         <Slider
           value={sliderValues}
           min={1900}
           max={2018}
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
