//  TODO
//    hover labels with good text and values
//    moving average vs period average
//    add json config for limits of data/variable combos
//    better file names
//    when switching areas we probably need to zero out chart...
class SandboxGeneratePlotData {
  constructor(props) {
    // style guide driven colors, fonts, ticks may need expanding
    //  https://docs.google.com/document/d/1_zO39hdlGL9uY0Y0Vf57ncYNYXuACUAIM0fKCUo3spc/edit?ts=5fa547dd#
    this.blue = '4, 90, 141';
    this.red = '189, 0, 38';
    this.green = '127, 188, 65';
    this.brown = '153, 52, 4';
    this.chartBackgroundColor = '#FBFCFE';
    this.annualLineColor = '#000000';
    this.precipitationColor = '#5AB4AC';
    this.temperatureColor = '#FEB24C';
    this.bargap = 0.15;
    this.legendBarLineX = 0.85;
    this.legendBarLineY = 1.125;
    this.font = 'Arial';
    this.zeroLineColor = '#000000';
    this.zerolinewidth = '1.25';
    this.gridColor = '#BFBFBF';
    this.AverageAllFontColor = '#000000';
    this.AverageAllColor = '#858585';
    this.AverageMovingColor = '#858585';
    this.AverageAllWidth = '6';
    this.AverageAllFontSize = '14pt';
    this.AverageWidth = '3';
    this.AverageColor = '#000000';
    this.gridWidth = '1';
    this.fontSizePrimary = '14pt';
    this.fontSizeLabels = '12pt';
    this.fontSizeLabelsSecondary = '12pt';
    this.xmin = props.xmin;
    this.xmax = props.xmax;
    this.xvals = props.xvals;
    this.yvals = props.yvals;
    this.useAvgBar = props.chartUseAvgBar;
    this.maxVal = Math.max(...this.yvals);
    this.minVal = Math.min(...this.yvals);
    this.chartTitle = props.chartTitle;
    this.legnedText = props.legnedText;
    this.chartType = props.chartType;
    this.climatevariable = props.climatevariable;
    this.barColor = this.chartType === 'Precipitation' ? this.precipitationColor : this.temperatureColor;
    this.periodGroups = props.periodGroups ? props.periodGroups : 5;
    this.textAngle = 90;
    this.yValsSumByPeriod = this.yValsSumByPeriod();
    this.yValsAvgByPeriod = this.yValsAvgByPeriod();
    this.yValsMovingAverage = this.computeMovingAverage();
    this.xValsMovingAverage = this.movingAverageXValues();
    this.xValsPeriod = this.xValsPeriod();
    this.xValsPeriodLabel = this.xValsPeriodLabel();
    const sumAll = this.yValsSumAll();
    this.yValsSumAll = sumAll <= -50 ? undefined : sumAll;
    const avgAll = this.yValsAvgAll();
    this.yValsAvgAll = avgAll <= -50 ? 0 : avgAll;
    const min = this.minVal < 0 ? 0 : this.minVal;
    this.prettyRange = SandboxGeneratePlotData.pretty([min, this.maxVal]);
    this.yRange = [this.prettyRange[0], this.prettyRange[this.prettyRange.length - 1]];
  }

  // some regions-locations have no data or -9999 need
  // to check if the region or location has data and is so return false
  // so we can pass an message to user
  hasData() {
    if ((Number.isNaN(this.maxVal) || Number.isNaN(this.minVal)) ||
         (this.maxVal === 0 && this.minVal === 0) ||
         (this.maxVal === -999 && this.minVal === -999)) {
      return false;
    }
    return true;
  }

  static pretty(range, n = 5, internalOnly = false) {
    // from https://gist.github.com/Frencil/aab561687cdd2b0de04a
    let numberOfDivisons = n;
    numberOfDivisons = parseInt(n, 10);
    const minN = numberOfDivisons / 3;
    const shrinkSml = 0.75;
    const highUBias = 1.5;
    const u5Bias = 0.5 + 1.5 * highUBias;
    const d = Math.abs(range[0] - range[1]);
    let c = d / n;
    if ((Math.log(d) / Math.LN10) < -2) {
      c = (Math.max(Math.abs(d)) * shrinkSml) / minN;
    }

    const base = 10 ** Math.floor(Math.log(c) / Math.LN10);
    let baseToFixed = 0;
    if (base < 1) {
      baseToFixed = Math.abs(Math.round(Math.log(base) / Math.LN10));
    }

    let unit = base;
    if (((2 * base) - c) < (highUBias * (c - unit))) {
      unit = 2 * base;
      if (((5 * base) - c) < (u5Bias * (c - unit))) {
        unit = 5 * base;
        if (((10 * base) - c) < (highUBias * (c - unit))) {
          unit = 10 * base;
        }
      }
    }

    let ticks = [];
    let i = 0;
    if (range[0] <= unit) {
      i = 0;
    } else {
      i = Math.floor(range[0] / unit) * unit;
      i = parseFloat(i.toFixed(baseToFixed));
    }
    while (i < range[1]) {
      ticks.push(i);
      i += unit;
      if (baseToFixed > 0) {
        i = parseFloat(i.toFixed(baseToFixed));
      }
    }
    ticks.push(i);

    if (internalOnly) {
      if (ticks[0] < range[0]) { ticks = ticks.slice(1); }
      if (ticks[ticks.length - 1] > range[1]) { ticks.pop(); }
    }

    return ticks;
  }

  // calc moving average
  computeMovingAverage() {
    const data = this.yvals;
    const period = this.periodGroups;
    const getAverage = (avgArr) => avgArr.reduce((a, b) => a + b, 0) / avgArr.length;
    const movingAverages = [];

    // if the period is greater than the length of the dataset
    // then return the average of the whole dataset
    if (period > data.length) {
      return getAverage(data);
    }
    for (let x = 0; x + period - 1 < data.length; x += 1) {
      movingAverages.push(getAverage(data.slice(x, x + period)));
    }
    return movingAverages;
  }

  // calc moving average
  movingAverageXValues() {
    const data = this.xvals;
    const period = this.periodGroups;
    const movingAveragesX = [];

    for (let x = 0; x - period - 1 < data.length; x += 1) {
      movingAveragesX.push(data[x]);
    }
    return movingAveragesX;
  }

  // creates the y values for each period
  xValsPeriodLabel() {
    let count = 0;
    const yValsPeriodAll = this.xvals.map((value, index) => { // eslint-disable-line
      // return value
      if (index === 0) {
        const plus = value + (this.periodGroups - 1);
        const tickText = `${value}–${plus.toString().slice(-2)}`;
        count += 1;
        return tickText;
      }
      if (count === (this.periodGroups - 1)) {
        count = 0;
        const plus = value + (this.periodGroups - 1);
        const tickText = `${value}–${plus.toString().slice(-2)}`;
        count += 1;
        return tickText;
      }
      count += 1;
      return '';
    });
    return yValsPeriodAll.filter((value) => value !== undefined);
  }

  // creates the y values for each period
  xValsPeriod() {
    let count = 0;
    const yValsPeriodAll = this.xvals.map((value, index) => { // eslint-disable-line
      // return value
      if (index === 0) {
        return value <= -50 ? undefined : value;
      }
      if (count === (this.periodGroups - 1)) {
        count = 0;
        return value <= -50 ? undefined : value;
      }
      count += 1;
    });
    return yValsPeriodAll.filter((value) => value !== undefined);
  }

  // sum values
  yValsSumAll() {
    return this.yvals.reduce((a, b) => a + b, 0);
  }

  // sums for the defined periods, creates a new array with period means
  yValsSumByPeriod() {
    let count = 0;
    let peroidSum = 0;
    let returnSum = 0;
    const yvalsCount = this.yvals.length - 1;
    const sumXvalsAll = this.yvals.map((value, index) => { // eslint-disable-line
      if (count === (this.periodGroups - 1)) {
        peroidSum += value <= -50 ? undefined : value;
        returnSum = peroidSum;
        count = 0;
        peroidSum = 0;
        return Number(Number(returnSum).toFixed(4));
      } else { // eslint-disable-line no-else-return
        peroidSum += value <= -50 ? undefined : value;
        count += 1;
      }

      // make last bar if its not full period
      if (index === yvalsCount) {
        peroidSum += value;
        returnSum = peroidSum;
        return Number(Number(returnSum).toFixed(4));
      }
    });
    return sumXvalsAll.filter((value) => value !== undefined);
  }

  // overall average
  yValsAvgAll() {
    return this.yvals.reduce((a, b) => a + b, 0) / this.yvals.length;
  }

  // means for the defined periods, creates a new array with period means
  yValsAvgByPeriod() {
    let count = 0;
    let peroidSum = 0;
    let returnAvg = 0;
    const yvalsCount = this.yvals.length - 1;
    const avgXvalsAll = this.yvals.map((value, index) => { // eslint-disable-line
      if (count === (this.periodGroups - 1)) {
        peroidSum += value <= -50 ? undefined : value;
        returnAvg = peroidSum / this.periodGroups;
        count = 0;
        peroidSum = 0;
        return Number(Number(returnAvg).toFixed(4));
      } else { // eslint-disable-line no-else-return
        peroidSum += value <= -50 ? undefined : value;
        count += 1;
      }

      // make last bar if its not full period
      if (index === yvalsCount) {
        peroidSum += value;
        returnAvg = peroidSum / this.periodGroups;
        return Number(Number(returnAvg).toFixed(4));
      }
    });
    return avgXvalsAll.filter((value) => value !== undefined);
  }

  setXRange(props) {
    this.xmin = props.xmin;
    this.xmax = props.xmax;
  }

  setTitle(props) {
    this.chartTitle = props.chartTitle;
  }

  getXvalues() {
    const ret = [];
    for (let xVal = this.xmin; xVal <= this.xmax; xVal += 1) {
      ret.push(xVal.toString());
    }
    return ret;
  }

  getYvalues() {
    const ret = [];
    let xIndex = this.xmin;

    // remove -9999
    this.yvals = this.yvals.map((val) => {
      let newVal = val;
      if (val < 0) {
        newVal = undefined;
      }
      return newVal;
    });
    while (xIndex < parseInt(this.xvals[0], 10)) { // requested range below data range
      xIndex += 1;
      ret.push('0'); // should this be undef/NaN? How does plotly handle it?
    }
    let yvalsIndex = 0;
    while (xIndex <= parseInt(this.xvals[this.xvals.length - 1], 10)) { // data
      ret.push(this.yvals[yvalsIndex]);
      yvalsIndex += 1;
      xIndex += 1;
    }
    while (xIndex <= this.xmax) { // requested range above data range
      xIndex += 1;
      ret.push('0');
    }
    return ret;
  }

  getData() {
    // remove bad data so chart resets to all zeros
    if (!this.hasData()) {
      this.yvals = this.yvals.map((v) => (Number.isNaN(v) ? 0 : v));
      this.yValsSumByPeriod = this.yValsSumByPeriod.map((v) => (Number.isNaN(v) ? 0 : v));
      this.yValsAvgByPeriod = this.yValsAvgByPeriod.map((v) => (Number.isNaN(v) ? 0 : v));
      this.yRange = this.yRange.map((v) => (Number.isNaN(v) ? 0 : v));
      this.yValsSumAll = 0;
      this.yValsAvgAll = 0;
    }
    if (this.maxVal === -Infinity) return [{}];

    // is average is the bar and yearly the line chart
    if (this.useAvgBar) {
      return [this.traceAverageBar(), this.traceYearlyLine()];
    }

    // is average is the line and yearly the bar
    return [this.traceYearlyBar(), this.traceAverageLine()];
    // return [this.traceYearlyBar(), this.traceAverageLine(), this.traceMovingAverageLineBase()];
  }

  // get the chart layout
  getLayout() {
    // layout when average is the bar and yearly the line chart
    if (this.useAvgBar) {
      return this.layoutAverageBar();
    }
    // layout when average is the line and yearly the bar
    return this.layoutYearBar();
  }

  static uuidv() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0; // eslint-disable-line
      const v = c === 'x' ? r : (r & 0x3 | 0x8); // eslint-disable-line
      return v.toString(16);
    });
  }

  // trace for averages when average is a bar
  traceAverageBar() {
    return {
      uid: SandboxGeneratePlotData.uuidv(),
      mode: 'lines',
      name: 'Average days per year',
      type: 'histogram',
      histfunc: 'avg',
      xbins: {
        start: this.xmin,
        end: this.xmax,
        size: 5
      },
      nbinsx: 0,
      x: this.xvals,
      y: this.getYvalues(),
      bargroupgap: 5,
      marker: {
        line: {
          color: this.barColor,
          width: 1
        },
        color: this.barColor
      },
      hovermode: 'closest',
      hoverinfo: 'x+y',
      // hovertemplate: 'Average days: %{y:0.2f} for the years %{x}<br><extra></extra>',
      legendgroup: 1,
      orientation: 'v'
    };
  }

  // trace for year when average is a bar
  traceYearlyLine() {
    return {
      uid: SandboxGeneratePlotData.uuidv(),
      mode: 'lines',
      name: 'Days per year',
      type: 'scatter',
      x: this.xvals,
      y: this.getYvalues(),
      marker: {
        color: this.annualLineColor
      },
      line: {
        color: this.AverageColor,
        width: this.AverageWidth,
        dash: 'solid',
        shape: 'linear',
        simplify: true
      },
      hoverinfo: 'x+y'
      // hovertemplate: ' <br /> %{y:0.2f} Annual ' +
      // this.climatevariable + ' for the year: %{x}<extra></extra>  <br /> ',
    };
  }

  // trace for year when year is a bar
  traceYearlyBar() {
    return {
      uid: SandboxGeneratePlotData.uuidv(),
      mode: 'lines',
      name: 'Days per year',
      type: 'bar',
      x: this.xvals,
      y: this.getYvalues(),
      xbins: {
        start: this.xmin,
        end: this.xmax,
        size: 5
      },
      marker: {
        line: {
          color: this.barColor,
          width: 1
        },
        color: this.barColor
      },
      histfunc: 'sum',
      hoverinfo: 'x+y',
      legendgroup: 1,
      orientation: 'v'
      // hovertemplate: 'Average days: %{y:0.2f} for the years %{x}<br><extra></extra>',
    };
  }

  // trace for averages when year is a bar
  traceMovingAverageLineBase() {
    return {
      uid: SandboxGeneratePlotData.uuidv(),
      mode: 'lines',
      name: 'Moving Average Days',
      type: 'scatter',
      x: this.xValsMovingAverage,
      y: this.yValsMovingAverage,
      line: {
        color: this.AverageColor,
        width: this.AverageWidth,
        dash: 'solid',
        shape: 'spline',
        simplify: true
      },
      hoverinfo: 'x+y',
      visible: 'legendonly'
    };
  }

  // trace for averages when year is a bar
  traceAverageLine() {
    return {
      uid: SandboxGeneratePlotData.uuidv(),
      mode: 'lines',
      name: 'Average days per year',
      type: 'scatter',
      x: this.xValsPeriod,
      y: this.yValsAvgByPeriod,
      line: {
        color: this.AverageColor,
        width: this.AverageWidth,
        dash: 'solid',
        shape: 'spline',
        simplify: true
      },
      hoverinfo: 'x+y'
    };
  }

  // layout  when average is a bar
  layoutAverageBar() {
    return {
      displayModeBar: false,
      autosize: true,
      height: 1,
      bargap: this.bargap,
      plot_bgcolor: this.chartBackgroundColor,
      paper_bgcolor: this.chartBackgroundColor,
      legend: {
        yanchor: 'top',
        autosize: true,
        orientation: 'h',
        x: this.legendBarLineX,
        y: this.legendBarLineY,
        font: {
          family: this.font,
          size: this.fontSizeLabels
        }
      },
      title: {
        text: this.chartTitle,
        font: {
          family: this.font,
          size: this.fontSizePrimary
        },
        x: 0.4
      },
      xaxis: {
        type: 'linear',
        range: [this.xmin - 5, this.xmax + 5],
        autorange: false,
        automargin: false,
        showspikes: false,
        zeroline: true,
        showline: false,
        showgrid: false,
        fixedrange: true,
        rangemode: 'tozero',
        zerolinecolor: this.zeroLineColor,
        zerolinewidth: this.zerolinewidth,

        dtick: 5,
        tick0: 0,
        tickangle: this.textAngle,
        tickformat: '',
        tickprefix: '',
        nticks: this.periodGroups,
        // tickmode: 'array',
        // tickvals: this.xValsPeriod,
        // ticktext: this.xValsPeriodLabel,
        ticks: 'outside',
        tickcolor: this.zeroLineColor,
        tickwidth: this.zerolinewidth,
        tickfont: {
          family: this.font,
          size: this.fontSizeLabelsSecondary
        },
        title: {
          text: `${this.periodGroups}-Year Averages`,
          font: {
            family: this.font,
            size: this.fontSizeLabels
          }
        },
        constraintoward: 'center',
        spikethickness: 4,
        displayModeBar: false,
        autosize: true
      },
      yaxis: {
        title: {
          text: 'Days',
          font: {
            family: this.font,
            size: this.fontSizeLabels
          }
        },
        rangemode: 'tozero',
        range: this.yRange,
        type: 'linear',
        ticks: 'outside',
        tickcolor: this.zeroLineColor,
        tickwidth: this.zerolinewidth,
        autorange: false,
        showspikes: false,
        fixedrange: true,
        showline: true,
        linecolor: this.zeroLineColor,
        linewidth: this.zerolinewidth,
        zerolinecolor: this.zeroLineColor,
        zerolinewidth: this.zerolinewidth,
        gridcolor: this.gridColor,
        gridwidth: this.gridwidth,
        bargap: this.bargap
      },
      template: {
        layout: {
          hovermode: 'closest',
          hoverinfo: 'x+y',
          plot_bgcolor: this.chartBackgroundColor,
          paper_bgcolor: this.chartBackgroundColor
        }
      },
      annotations: [{
        xref: 'x',
        yref: 'y',
        x: this.xmax + 2.5,
        y: this.yValsAvgAll.toFixed(1),
        text: `Average days ${this.yValsAvgAll.toFixed(1)}`,
        showarrow: true,
        arrowhead: 7,
        arrowsize: 2,
        arrowwidth: 2,
        arrowcolor: this.AverageAllColor,
        ay: -100,
        ax: 10,
        font: {
          family: this.font,
          size: this.AverageAllFontSize,
          color: this.AverageAllFontColor
        }
      }],
      shapes: [{
        type: 'line',
        layer: 'below',
        x0: this.xmin - 5,
        y0: this.yValsAvgAll.toFixed(1),
        x1: this.xmax + 5,
        y1: this.yValsAvgAll.toFixed(1),
        line: {
          color: this.AverageAllColor,
          width: this.AverageAllWidth
        }
      },
      {
        type: 'line',
        layer: 'above',
        x0: this.xmin - 5,
        y0: 0,
        x1: this.xmax + 5,
        y1: 0,
        line: {
          color: this.zeroLineColor,
          width: this.zerolinewidth
        }
      },
      {
        type: 'line',
        layer: 'above',
        x0: this.xmin - 5,
        y0: this.yRange[this.yRange.length - 1],
        x1: this.xmax + 5,
        y1: this.yRange[this.yRange.length - 1],
        line: {
          color: this.gridColor,
          width: this.gridwidth
        }
      },
      {
        type: 'line',
        layer: 'above',
        x0: this.xmin - 5,
        y0: this.yRange[0],
        x1: this.xmax + 5,
        y1: this.yRange[0],
        line: {
          color: this.zeroLineColor,
          width: this.zerolinewidth
        }
      }]
    };
  }

  // layout  when year is a bar
  layoutYearBar() {
    return {
      displayModeBar: false,
      autosize: true,
      height: 1,
      bargap: this.bargap,
      plot_bgcolor: this.chartBackgroundColor,
      paper_bgcolor: this.chartBackgroundColor,
      legend: {
        yanchor: 'top',
        autosize: true,
        orientation: 'h',
        x: this.legendBarLineX,
        y: this.legendBarLineY,
        font: {
          family: this.font,
          size: this.fontSizeLabels
        }
      },
      title: {
        text: this.chartTitle,
        font: {
          family: this.font,
          size: this.fontSizePrimary
        },
        x: 0.4
      },
      xaxis: {
        type: 'linear',
        range: [this.xmin - 5, this.xmax + 5],
        autorange: false,
        automargin: false,
        showspikes: false,
        zeroline: true,
        showline: false,
        showgrid: false,
        fixedrange: true,
        rangemode: 'tozero',
        zerolinecolor: this.zeroLineColor,
        zerolinewidth: this.zerolinewidth,

        dtick: 5,
        tick0: 0,
        tickangle: this.textAngle,
        tickformat: '',
        tickprefix: '',
        nticks: this.periodGroups,
        // tickmode: 'array',
        // tickvals: this.xValsPeriod,
        // ticktext: this.xValsPeriodLabel,
        ticks: 'outside',
        tickcolor: this.zeroLineColor,
        tickwidth: this.zerolinewidth,
        tickfont: {
          family: this.font,
          size: this.fontSizeLabelsSecondary
        },
        title: {
          text: 'Year',
          font: {
            family: this.font,
            size: this.fontSizeLabels
          }
        },
        constraintoward: 'center',
        spikethickness: 4,
        displayModeBar: false,
        autosize: true
      },
      yaxis: {
        title: {
          text: 'Days',
          font: {
            family: this.font,
            size: this.fontSizeLabels
          }
        },
        rangemode: 'tozero',
        range: this.yRange,
        type: 'linear',
        ticks: 'outside',
        tickcolor: this.zeroLineColor,
        tickwidth: this.zerolinewidth,
        autorange: false,
        showspikes: false,
        fixedrange: true,
        showline: true,
        linecolor: this.zeroLineColor,
        linewidth: this.zerolinewidth,
        zerolinecolor: this.zeroLineColor,
        zerolinewidth: this.zerolinewidth,
        gridcolor: this.gridColor,
        gridwidth: this.gridwidth,
        bargap: this.bargap
      },
      template: {
        layout: {
          hovermode: 'closest',
          hoverinfo: 'x+y',
          plot_bgcolor: this.chartBackgroundColor,
          paper_bgcolor: this.chartBackgroundColor
        }
      },
      annotations: [{
        xref: 'x',
        yref: 'y',
        x: this.xmax + 2.5,
        y: this.yValsAvgAll.toFixed(1),
        text: `Average days ${this.yValsAvgAll.toFixed(1)}`,
        showarrow: true,
        arrowhead: 7,
        arrowsize: 2,
        arrowwidth: 2,
        arrowcolor: this.AverageAllColor,
        ay: -100,
        ax: 10,
        font: {
          family: this.font,
          size: this.AverageAllFontSize,
          color: this.AverageAllFontColor
        }
      }],
      shapes: [{
        type: 'line',
        layer: 'below',
        x0: this.xmin - 5,
        y0: this.yValsAvgAll.toFixed(1),
        x1: this.xmax + 5,
        y1: this.yValsAvgAll.toFixed(1),
        line: {
          color: this.AverageAllColor,
          width: this.AverageAllWidth
        }
      },
      {
        type: 'line',
        layer: 'above',
        x0: this.xmin - 5,
        y0: 0,
        x1: this.xmax + 5,
        y1: 0,
        line: {
          color: this.zeroLineColor,
          width: this.zerolinewidth
        }
      },
      {
        type: 'line',
        layer: 'above',
        x0: this.xmin - 5,
        y0: this.yRange[this.yRange.length - 1],
        x1: this.xmax + 5,
        y1: this.yRange[this.yRange.length - 1],
        line: {
          color: this.gridColor,
          width: this.gridwidth
        }
      },
      {
        type: 'line',
        layer: 'above',
        x0: this.xmin - 5,
        y0: this.yRange[0],
        x1: this.xmax + 5,
        y1: this.yRange[0],
        line: {
          color: this.zeroLineColor,
          width: this.zerolinewidth
        }
      }]
    };
  }
}

export default SandboxGeneratePlotData;
