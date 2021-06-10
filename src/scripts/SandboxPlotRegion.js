import React from 'react';
import Plotly from 'plotly.js-cartesian-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';
import PropTypes from 'prop-types';

const Plot = createPlotlyComponent(Plotly);

export default function SandboxPlotRegion(props) {
  const { plotlyData } = props;
  const config = { ...{ responsive: true, displayModeBar: false } };
  const responsiveChartRef = React.useRef();
  const [layout, _setLayout] = React.useState({ ...props.plotlyLayout });

  // create ref to use in listener
  const layoutRef = React.useRef(layout);
  const setLayout = (data) => {
    layoutRef.current = data;
    _setLayout(data);
  };

  // split title for small screens
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

  // remove split from title for large screens
  const unSplitTitle = (title) => {
    if (title.indexOf('<br>', 0) > 0 && window.innerWidth <= 768) return title;
    return title.replace('<br>', ' ');
  };

  const resizeChart = () => {
    const elREF = responsiveChartRef.current;
    if (!elREF) return null;
    const el = elREF;
    const copiedLayout = layoutRef.current;
    copiedLayout.width = el.parentNode.getBoundingClientRect().width;
    copiedLayout.height = el.getBoundingClientRect().height - 24;
    const angle = window.innerWidth <= 1000 ? 90 : 0;
    const dtick = window.innerWidth <= 768 ? 10 : 5;
    const titleX = window.innerWidth <= 768 ? 0.5 : 0.4;

    // only change xaxis if the object exists
    if (copiedLayout.xaxis) {
      copiedLayout.xaxis.tickangle = angle;
      copiedLayout.xaxis.dtick = dtick;
    }

    // only change legend if the object exists
    if (copiedLayout.legend) {
      copiedLayout.legend.x = window.innerWidth <= 768 ? 0 : 0.65;
      copiedLayout.legend.y = window.innerWidth <= 768 ? -0.15 : 1.125;
    }

    // only change title if the object exists
    if (copiedLayout.title) {
      const chartTitle = copiedLayout ? unSplitTitle(copiedLayout.title.text) : '';
      const shortTitle = splitTitle(chartTitle);
      copiedLayout.title.text = window.innerWidth <= 768 ? shortTitle : chartTitle;
      copiedLayout.title.x = titleX;
    }

    setLayout({ ...copiedLayout });
    window.dispatchEvent(new Event('resizedone'));
    return null;
  };

  // effect for prop change so when new prop is passed in from parent the graph is re-rendered
  React.useLayoutEffect(() => {
    setLayout(props.plotlyLayout);
    resizeChart();
  }, [props.plotlyLayout]);

  React.useEffect(() => {
    window.addEventListener('resize', resizeChart);

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener(resizeChart);
    };
  }, []);

  return (
    <div className="PlotRegionDiv"
      {...{
        ref: responsiveChartRef
      }}
      >
      <Plot
        data={plotlyData}
        layout={layoutRef.current}
        config={config}
        revision={Math.floor(Math.random() * 100000)}
        />
    </div>
  );
}

SandboxPlotRegion.propTypes = {
  plotlyLayout: PropTypes.object,
  plotlyData: PropTypes.array
};
