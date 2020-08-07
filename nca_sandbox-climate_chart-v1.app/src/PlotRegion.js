import React from 'react';
import Plot from 'react-plotly.js';

//import plot_data from 'nc-state-rain-3inch-plot.js';
const plot_data = require('./testPlotData');



class PlotRegion extends React.Component {
  render() {
    return (
    <div id="plot_region" className="plot_region">
      <Plot
        data={plot_data.data}
        layout={plot_data.layout}
      />
      </div>
    );
  }
}

export default PlotRegion;

