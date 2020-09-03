import * as React from 'react';
import Slider from '@material-ui/core/Slider'

function valuetext(value) {
  return value;
}

class DoubleSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      values: [props.min_value, props.max_value]
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(evt, values: number[]){
    console.log("DoubleSlider.onChange(): values=");
    console.log(values);
    this.props.sliderChanged(values);
  };

  render() {
    const {
      state: { values }
    } = this;
    return (
        <Slider 
            value={values}
            step={1}
            onChange={this.onChange}
            min={1900}
            max={2018}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            />
    );
  }
}
export default DoubleSlider;

