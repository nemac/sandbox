import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function SandboxCheckboxLabels(props) {
  const { useRobust } = props;
  const { onChange } = props;

  const handleChange = (event) => {
    onChange(event.target.checked);
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
}

SandboxCheckboxLabels.propTypes = {
  useRobust: PropTypes.bool,
  onChange: PropTypes.func
};
