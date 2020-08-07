import React from 'react';
import Plot from 'react-plotly.js';

//const plot_data = require('./testPlotData');
//import {plot_data} from './testPlotData.js'
import * as plot_data from './testPlotData.js';


/*
const plot_data = {
data: [
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ],
layout: {width: 650, height: 300, title: 'A Test Plot'}

}
*/

class PlotRegion extends React.Component {
  render() {
    return (
    <div id="plot_region" className="plot_region">
      <Plot
        /*data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}*/
        data={plot_data.data}
        /*
        layout={ {width: 650, height: 300, title: 'A Test Plot'} }*/
        layout={plot_data.layout}
      />
      </div>
    );
  }
}

export default PlotRegion;
