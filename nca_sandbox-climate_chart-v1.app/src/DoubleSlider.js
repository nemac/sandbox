// https://codesandbox.io/s/zl8nrlp9x?file=/src/index.tsx:0-2480
import * as React from 'react';
//import { render } from 'react-dom';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { Handle, Track, Tick } from './DoubleSliderComponents'; // example render components

const sliderStyle: React.CSSProperties = {
  margin: '5%',
  position: 'relative',
  width: '90%'
};

const railStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: 10,
  borderRadius: 7,
  cursor: 'pointer',
  backgroundColor: 'rgb(155,155,155)'
};

const domain: number[] = [1900, 2018];

class DoubleSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      values: [props.min_value, props.max_value]
    };
  } 

  onChange = (values: number[]) => {
    console.log("DoubleSlider.onChange(): values=");
    console.log(values);
    this.props.sliderChanged(values);
    //this.setState({ values });
  };

  render() {
    const {
      state: { values }
    } = this;

    return (
      <div style={{ height: 120, width: '100%' }}>
        <Slider
          mode={1}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => (
              <div style={railStyle} {...getRailProps()} />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={10}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    );
  }
}

export default DoubleSlider;

