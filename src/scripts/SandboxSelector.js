import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
    backgroundColor: '#E6E6E6'
  },
  menuItem: {
    textAlign: 'left'
  },
  sandboxInputLabel: {
    color: '#5C5C5C'
  }
}));

export default function Selector(props) {
  const classes = useStyles();
  const { items } = props;
  const { controlName } = props;
  const { value } = props;
  const { disabled } = props;
  const { onChange } = props;
  const replaceClimatevariableType = controlName === 'Climate Variable' ? props.replaceClimatevariableType : (name) => name;
  const replaceLocationAbbreviation = controlName === 'Select a Location' ? props.replaceLocationAbbreviation : (name) => name;
  const replacePeriodType = controlName === 'Select a Period' ? props.replacePeriodType : (name) => name;

  const replaceRegional = (regionalValue) => {
    let returnValue = regionalValue;
    if (regionalValue.toUpperCase() === 'REGIONAL') returnValue = 'NCA Region';
    return returnValue;
  };

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl variant='outlined' className={classes.formControl} fullWidth={true} disabled={disabled}>
      <InputLabel id='demo-simple-select-outlined-label' className={classes.sandboxInputLabel} >{controlName}</InputLabel>
      <Select
        labelId='demo-simple-select-outlined-label'
        id='demo-simple-select-outlined'
        value={value}
        onChange={handleChange}
        label={controlName}
        className={classes.menuItem}
        >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {items.map((name) => (
          <MenuItem key={name} value={name} className={classes.menuItem}>
            {replaceRegional(replaceClimatevariableType(replaceLocationAbbreviation(replacePeriodType(name))))}
          </MenuItem>))}
        </Select>
      </FormControl>
  );
}

Selector.propTypes = {
  items: PropTypes.array,
  controlName: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  replaceClimatevariableType: PropTypes.func,
  replaceLocationAbbreviation: PropTypes.func,
  replacePeriodType: PropTypes.func,
  onChange: PropTypes.func
};
