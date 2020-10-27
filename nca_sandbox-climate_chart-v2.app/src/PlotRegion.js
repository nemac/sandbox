import React from 'react';
import Plot from 'react-plotly.js';


class PlotRegion extends React.Component {
    constructor(props) {
        super(props)
        // console.log("PlotRegion object instantated.");
        // this.name = "PlotRegion"
        window.addEventListener('resize', props.handleResize);
        props.handleResize();

    }

    render() {
        // console.log("PlotRegion render() height="+this.props.plotly_height+" width="+this.props.plotly_width);
        // Automaticly resize plot
        this.props.plotly_layout['width'] =  100 // this.props.plotly_width;
        this.props.plotly_layout['height'] =  100  // this.props.plotly_height;

        // console.log("Rendering PlotRegion rev="+this.props.plotly_revision+" this.props.plotly_data=")
        // console.log(this.props.plotly_data)

        return (
            <div id="plot_region" className="plot_region">
                <Plot
                    data={this.props.plotly_data}
                    layout={this.props.plotly_layout}
                    frames={this.props.plotly_frames}
                    config={this.props.plotly_config}
                    revision={this.props.plotly_revision}
                    onInitialized={(figure) => this.setState(figure)}
                    onUpdate={(figure) => this.setState(figure)}
                />
            </div>
        );
    }
}

export default PlotRegion;
