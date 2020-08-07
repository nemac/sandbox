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
    constructor(props) {
        super(props);
        /*
        this.state = { 
            data:   props.plotly_data, 
            layout: props.plotly_layout, 
            frames: props.plotly_frames, 
            config: props.plotly_config 
         };
        */
    }
    render() {
        console.log("Rendering PlotRegion this.state.data=")
        console.log(this.props.plotly_data)

        return (
          <div  className="plot_region">
            <Plot
                data={this.props.plotly_data}
                layout={this.props.plotly_layout}
                frames={this.props.plotly_frames}
                config={this.props.plotly_config}
                onInitialized={(figure) => this.setState(figure)}
                onUpdate={(figure) => this.setState(figure)}
            />
          </div>
        );
    }
}

export default PlotRegion;
