import React from 'react';
import Plot from 'react-plotly.js';

class SandboxPlotRegion extends React.Component {
  state = {
    layout: { title: "Reponsive plotly chart", width: 500, height: 400 }
  };

  constructor(props) {
      super(props)
      this.responsiveChartRef = React.createRef();
  }

  componentDidMount() {
    this.resizeListener = window.addEventListener("resize", () => {
      const elREF = this.responsiveChartRef.current;
      const el = elREF;

      const copiedLayout = Object.assign({}, this.props.plotlyLayout);
      copiedLayout.width = el.parentNode.getBoundingClientRect().width;
      copiedLayout.height = el.getBoundingClientRect().height-24;
    });
  }

  componentWillUnmount() {
    window.removeEventListener(this.resizeListener);
  }

  render() {
    const copiedLayout = Object.assign({}, this.props.plotlyLayout);
    const data = this.props.plotlyData;
    const config = {...{ responsive: true }};
    const elREF = this.responsiveChartRef.current;
    if(elREF) {
      const el = elREF;
      copiedLayout.width = el.parentNode.getBoundingClientRect().width;
      copiedLayout.height = el.getBoundingClientRect().height-24;
    }


    return (
      <div
        {...{
          ref: this.responsiveChartRef,
        }}
        >
        <Plot
          data={data}
          layout={copiedLayout}
          config={config}
          revision={Math.floor(Math.random() * 100000)}
          />
      </div>
    );
  }
}

export default SandboxPlotRegion;
