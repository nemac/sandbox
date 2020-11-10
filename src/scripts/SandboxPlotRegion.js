import React from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

class SandboxPlotRegion extends React.Component {
  constructor(props) {
    super(props);
    this.responsiveChartRef = React.createRef();
    this.plotlyLayout = props.plotlyLayout;
  }

  componentDidMount() {
    this.resizeListener = window.addEventListener('resize', () => {
      const elREF = this.responsiveChartRef.current;
      const el = elREF;
      const { plotlyLayout } = this.props;
      const copiedLayout = { ...plotlyLayout };

      copiedLayout.width = el.parentNode.getBoundingClientRect().width;
      copiedLayout.height = el.getBoundingClientRect().height - 24;

      this.setState({
        layout: copiedLayout
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener(this.resizeListener);
  }

  render() {
    const { plotlyLayout } = this.props;
    const copiedLayout = { ...plotlyLayout };
    const { plotlyData } = this.props;
    const config = { ...{ responsive: true, displayModeBar: false } };
    const elREF = this.responsiveChartRef.current;
    if (elREF) {
      const el = elREF;
      copiedLayout.width = el.parentNode.getBoundingClientRect().width;
      copiedLayout.height = el.getBoundingClientRect().height;
    }
    return (
      <div className="PlotRegionDiv"
        {...{
          ref: this.responsiveChartRef
        }}
        >
        <Plot
          data={plotlyData}
          layout={copiedLayout}
          config={config}
          revision={Math.floor(Math.random() * 100000)}
          />
      </div>
    );
  }
}

export default SandboxPlotRegion;

SandboxPlotRegion.propTypes = {
  plotlyLayout: PropTypes.object,
  plotlyData: PropTypes.array
};
