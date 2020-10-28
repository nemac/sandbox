import React from 'react';
import Plot from 'react-plotly.js';

class PlotRegion extends React.Component {
    state = {
      layout: { title: "Reponsive plotly chart", width: 500, height: 400 }
    };
    responsiveChartRef = React.createRef();


    componentDidMount() {
      this.resizeListener = window.addEventListener("resize", () => {

        const elREF = this.responsiveChartRef.current;
        const el = elREF;

        const copiedLayout = Object.assign({}, this.state.layout);
        copiedLayout.width = el.getBoundingClientRect().width;
        copiedLayout.height = el.getBoundingClientRect().height;
        console.log('resize', copiedLayout.height, copiedLayout.width);

        this.setState({
          layout: copiedLayout
        });
      });
    }

    componentWillUnmount() {
      window.removeEventListener(this.resizeListener);
    }

    render() {
        // Automaticly resize plot
        // let w = window.innerWidth - 48;
        // let h = window.innerHeight - 210;
        // this.props.plotly_layout['width'] = w;
        // this.props.plotly_layout['height'] = h;


        const data = this.props.plotly_data;
        const { layout } = this.state;
        const config = {...{ responsive: true }};
        // const {frames} = this.props.plotly_frames;
        // const {revision} = this.props.plotly_revision;
        // const {onInitialized} = (figure) => this.setState(figure);
        // const {onUpdate} = (figure) => this.setState(figure);
        // const {autosize} = true;

        // console.log("Rendering PlotRegion this.state.plotly_data=")
        // console.log(this.props.plotly_data)
        // console.log('plotly_layout', this.props.plotly_layout)
        return (
          <div
          {...{
            ref: this.responsiveChartRef,
            // style: { height: "calc(100vh)" }
          }}
        >
            <Plot
              {...{
                    data,
                    layout,
                    config,
                    // autosize
                }}

            />
          </div>
        );
    }
}

// useResizeHandler
// data={this.props.plotly_data}
// layout={this.props.plotly_layout}
// frames={this.props.plotly_frames}
// config={this.props.plotly_config}
// revision={this.props.plotly_revision}
// onInitialized={(figure) => this.setState(figure)}
// onUpdate={(figure) => this.setState(figure)}
// autosize= {true}

export default PlotRegion;
