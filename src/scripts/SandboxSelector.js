import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import SandoxPeriodsHumanReadable from '../configs/SandoxPeriodsHumanReadable';

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
  },
  sandboxErrorText: {
    backgroundColor: '#FBFCFE',
    margin: '0px',
    paddingTop: '3px'
  }
}));

export default function Selector(props) {
  const classes = useStyles();
  let { items } = props;
  const { controlName } = props;
  const { value } = props;
  const { disabled } = props;
  const { missing } = props;
  const { season } = props;
  const { onChange } = props;
  const replaceClimatevariableType = controlName === 'Select a Climate Variable' ? props.replaceClimatevariableType : (name) => name;
  const replaceLocationAbbreviation = controlName === 'Select a Location' ? props.replaceLocationAbbreviation : (name) => name;
  const replacePeriodType = controlName === 'Select a Time Period' ? props.replacePeriodType : (name) => name;
  const replaceSeasonType = controlName === 'Select the Season' ? props.replaceSeasonType : (name) => name;
  const selectorError = (missing && !disabled);
  const errorLabel = (selectorError) ? <FormHelperText className={classes.sandboxErrorText}>{controlName} is required</FormHelperText> : '';

  // limit period based on season
  // not all periods are valid for seasons
  const limitPeriods = (periodARG, seasonARG) => {
    const periodsHumanReadable = SandoxPeriodsHumanReadable();
    const seasonFull = periodsHumanReadable.filter((v) => v.season === seasonARG);

    // limit period array based on season limited array
    //  uses the humad readable...
    const seasonLimitedPeriods = periodARG.filter((el) => {
      return seasonFull.some((f) => {
        return f.value === el;
      });
    });

    return seasonLimitedPeriods;
  }

  // only limit items when in period
  if (controlName === 'Select a Time Period') {
    items = limitPeriods(items, season);
  }

  // replace regional
  const replaceRegional = (regionalValue) => {
    let returnValue = regionalValue;
    if (regionalValue.toUpperCase() === 'REGIONAL') returnValue = 'NCA Region';
    return returnValue;
  };

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const replaceWithHumanReadable = (theControlName, val, season) => {
    switch (theControlName) {
      case 'Select a Climate Variable':
        return replaceClimatevariableType(val, season);
      case 'Select a Location':
        return replaceLocationAbbreviation(val);
      case 'Select a Region':
        return replaceRegional(val);
      case 'Select a Time Period':
        return replacePeriodType(val, season);
      case 'Select the Season':
        return replaceSeasonType(val);
      default:
        return replaceClimatevariableType(val, season);
    }
  };

  return (
    <FormControl variant='outlined' className={classes.formControl} fullWidth={true} disabled={disabled} error={selectorError}>
      <InputLabel id='demo-simple-select-outlined-label' className={classes.sandboxInputLabel} >{controlName}</InputLabel>
      <Select
        labelId='demo-simple-select-outlined-label'
        id='demo-simple-select-outlined'
        value={value}
        onChange={handleChange}
        label={controlName}
        className={classes.menuItem}
        >
        {items.map((name) => (
          <MenuItem key={name} value={name} className={classes.menuItem}>
            {replaceWithHumanReadable(controlName, name, season)}
          </MenuItem>))}
        </Select>
        {errorLabel}
      </FormControl>
  );
}

Selector.propTypes = {
  items: PropTypes.array,
  controlName: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  missing: PropTypes.bool,
  replaceClimatevariableType: PropTypes.func,
  replaceLocationAbbreviation: PropTypes.func,
  replacePeriodType: PropTypes.func,
  onChange: PropTypes.func
};
