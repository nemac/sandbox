import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


export default function CheckboxLabels(props) {
  const useRobust = props.useRobust;
  const handleChange = (event) => {
    props.onChange(event.target.checked);
  };

  return (
      <FormControlLabel
        control={
          <Checkbox
            checked={useRobust}
            onChange={handleChange}
            name="useRobust"
            color="default"
          />
        }
        label="Use more robust data"
      />
  );
};