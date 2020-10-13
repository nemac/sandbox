import React from 'react';
import Plot from 'react-plotly.js';


class PlotRegion extends React.Component {
    render() {
        // Automaticly resize plot
        let w = window.innerWidth - 48;
        let h = window.innerHeight - 210;
        this.props.plotly_layout['width'] = w;
        this.props.plotly_layout['height'] = h;

        console.log("Rendering PlotRegion this.state.plotly_data=")
        console.log(this.props.plotly_data)

        return (
            <Plot
                data={this.props.plotly_data}
                layout={this.props.plotly_layout}
                frames={this.props.plotly_frames}
                config={this.props.plotly_config}
                revision={this.props.plotly_revision}
                onInitialized={(figure) => this.setState(figure)}
                onUpdate={(figure) => this.setState(figure)}
            />
        );
    }
}

export default PlotRegion;
