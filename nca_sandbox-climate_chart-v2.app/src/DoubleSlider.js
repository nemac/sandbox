import React from "react";
import Slider from "@material-ui/core/Slider";

function valuetext(value) {
  return value;
}

class DoubleSlider extends React.Component {
  render(){
    const value = [ this.props.min_value, this.props.max_value ];

    const handleChange = (event, newValue) => {
        this.props.sliderChanged(newValue);
        console.log("handleChange="+newValue)
    };
    return (
        <Slider
            min={1900}
            max={2018}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
        />
    );
  }
}

export default DoubleSlider;

