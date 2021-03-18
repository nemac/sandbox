import React from 'react';
import Plotly from 'plotly.js-cartesian-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import PropTypes from 'prop-types';

const Plot = createPlotlyComponent(Plotly);

class SandboxPlotRegion extends React.Component {
  constructor(props) {
    super(props);
    this.responsiveChartRef = React.createRef();
    this.plotlyLayout = props.plotlyLayout;
  }

  componentDidMount() {
    const splitTitle = (title) => {
      if (title.indexOf('<br>', 0) > 0) return title;
      const longestLength = 25;
      const titleLength = title.length;

      let newTitle = title;
      for (let pos = longestLength; pos < titleLength; pos = (pos + 5) + longestLength) {
        const sepPos = newTitle.indexOf(' ', pos);
        if (sepPos > 0) {
          newTitle = `${newTitle.substring(0, sepPos)}<br>${newTitle.substring(sepPos + 1)}`;
        }
      }
      return newTitle;
    };

    const unSplitTitle = (title) => {
      if (title.indexOf('<br>', 0) > 0 && window.innerWidth <= 768) return title;
      return title.replace('<br>', ' ');
    };

    this.resizeListener = window.addEventListener('resize', () => {
      const elREF = this.responsiveChartRef.current;
      const el = elREF;
      const { plotlyLayout } = this.props;
      const copiedLayout = { ...plotlyLayout };
      copiedLayout.width = el.parentNode.getBoundingClientRect().width;
      copiedLayout.height = el.getBoundingClientRect().height - 24;
      const angle = window.innerWidth <= 1000 ? 90 : 0;
      const dtick = window.innerWidth <= 768 ? 10 : 5;
      const titleX = window.innerWidth <= 768 ? 0.5 : 0.4;
      const chartTitle = copiedLayout ? unSplitTitle(copiedLayout.title.text) : '';
      const shortTitle = splitTitle(chartTitle);
      copiedLayout.xaxis.tickangle = angle;
      copiedLayout.xaxis.dtick = dtick;
      copiedLayout.legend.x = window.innerWidth <= 768 ? 0 : 0.65;
      copiedLayout.legend.y = window.innerWidth <= 768 ? -0.15 : 1.125;
      copiedLayout.title.text = window.innerWidth <= 768 ? shortTitle : chartTitle;
      copiedLayout.title.x = titleX;

      this.setState({
        layout: copiedLayout
      });
      window.dispatchEvent(new Event('resizedone'));
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
      const widthAdjust = window.innerWidth <= 768 ? 70 : 0;
      copiedLayout.width = el.parentNode.getBoundingClientRect().width + widthAdjust;
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
