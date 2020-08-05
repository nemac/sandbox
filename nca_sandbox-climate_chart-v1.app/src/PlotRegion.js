import React from 'react';
import Plot from 'react-plotly.js';

class PlotRegion extends React.Component {
  render() {
    return (
    <div id="plot_region" className="plot_region">
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        /*layout={ {width: 320, height: 240, title: 'A Fancy Plot'} } */
        layout={ {width: 650, height: 300, title: 'A Test Plot'} }
      />
      </div>
    );
  }
}

export default PlotRegion;

