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
    this.font = 'Arial';
    this.zeroLineColor = '#000000';
    this.zerolinewidth = '1pt';
    this.gridColor = '#BFBFBF';
    this.gridWidth = '1pt';
    this.fontSizePrimary = '14pt';
    this.fontSizeLabels = '12pt';
    this.fontSizeLabelsSecondary = '12pt';
    this.xmin = props.xmin;
    this.xmax = props.xmax;
    this.xvals = props.xvals;
    this.yvals = props.yvals;
    this.maxVal = Math.max(...this.yvals);
    this.minVal = Math.min(...this.yvals);
    this.chartTitle = props.chartTitle;
    this.legnedText = props.legnedText;
    this.chartType = props.chartType;
    this.barColor = this.chartType === 'Precipitation' ? this.precipitationColor : this.temperatureColor;
    this.periodGroups = props.periodGroups ? props.periodGroups : 5;
    this.useRobust = props.useRobust;
    this.textAngle = this.useRobust ? 90 : 90;
    this.xValsSumByPeriod = this.xValsSumByPeriod();
    this.xValsAvgByPeriod = this.xValsAvgByPeriod();
    this.yValsPeriod = this.yValsPeriod();
    this.yValsPeriodLabel = this.yValsPeriodLabel();
    const sumAll = this.yValsSumAll();
    this.yValsSumAll = sumAll <= -50 ? undefined : sumAll;
    const avgAll = this.yValsAvgAll();
    this.yValsAvgAll = avgAll <= -50 ? 0 : avgAll;
    const min = this.minVal < 0 ? 0 : this.minVal
    this.prettyRange = SandboxGeneratePlotData.pretty([min, this.maxVal]);
    this.yRange = [this.prettyRange[0], this.prettyRange[this.prettyRange.length - 1]];
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

  // creates the y values for each period
  yValsPeriodLabel() {
    let count = 0;
    const yValsPeriodAll = this.xvals.map((value, index) => { // eslint-disable-line
      // return value
      if (index === 0) {
        const plus = value + (this.periodGroups - 1);
        const tickText = `${value}–${plus.toString().slice(-2)}`;
        return tickText;
      }
      if (count === (this.periodGroups - 1)) {
        count = 0;
        const plus = value + (this.periodGroups - 1);
        const tickText = `${value}–${plus.toString().slice(-2)}`;
        return tickText;
      }
      count += 1;
    });
    return yValsPeriodAll.filter((value) => value !== undefined);
  }

  // creates the y values for each period
  yValsPeriod() {
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

  yValsSumAll() {
    return this.yvals.reduce((a, b) => a + b, 0);
  }

  // sums for the defined periods, creates a new array with period means
  xValsSumByPeriod() {
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

  yValsAvgAll() {
    return this.yvals.reduce((a, b) => a + b, 0) / this.yvals.length;
  }

  // means for the defined periods, creates a new array with period means
  xValsAvgByPeriod() {
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
      xIndex += 1;
      yvalsIndex += 1;
      ret.push(this.yvals[yvalsIndex]);
    }
    while (xIndex <= this.xmax) { // requested range above data range
      xIndex += 1;
      ret.push('0');
    }
    return ret;
  }

  getData() {
    if (this.maxVal === -Infinity) return [{}];
    // return [this.getTrace1()];
    return [this.getTrace1(), this.getTrace2()];
  }

  static uuidv() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0; // eslint-disable-line
      const v = c === 'x' ? r : (r & 0x3 | 0x8); // eslint-disable-line
      return v.toString(16);
    });
  }

  getTrace1() {
    return {
      uid: SandboxGeneratePlotData.uuidv(),
      mode: 'lines',
      name: `${this.legnedText} for Period`,
      type: 'bar',
      x: this.yValsPeriod,
      y: this.xValsAvgByPeriod,
      marker: {
        line: {
          color: this.barColor
        },
        color: this.barColor
      },
      nbinsx: 0,
      hovermode: 'closest',
      hoverinfo: 'x+y',
      cumulative: {
        enabled: false
      },
      legendgroup: 1,
      orientation: 'v'
    };
  }

  getTrace2() {
    return {
      uid: SandboxGeneratePlotData.uuidv(),
      mode: 'markers+lines',
      name: `Annual ${this.legnedText}`,
      type: 'scatter',
      x: this.xvals,
      y: this.getYvalues(),
      marker: {
        color: this.annualLineColor
      },
      hovermode: 'closest',
      hoverinfo: 'x+y'
    };
  }

  getLayout() {
    return {
      displayModeBar: false,
      autosize: true,
      height: 1,
      bargroupgap: 0,
      plot_bgcolor: this.chartBackgroundColor,
      paper_bgcolor: this.chartBackgroundColor,
      legend: {
        autosize: true,
        orientation: 'h',
        xanchor: 'center',
        x: 0.85,
        y: 1.05,
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
        x: 0.5
      },
      xaxis: {
        type: 'linear',
        range: [this.xmin - 5, this.xmax + 5],
        bargap: this.bargap,
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
        tickfont: {
          family: this.font,
          size: this.fontSizeLabelsSecondary
        },
        title: {
          text: `${this.periodGroups}–year period`,
          font: {
            family: this.font,
            size: this.fontSizeLabels
          }
        },
        dtick: 5,
        tick0: 0,
        tickangle: this.textAngle,
        constraintoward: 'center',
        tickformat: '',
        tickprefix: '',
        tickmode: 'array',
        nticks: this.periodGroups,
        tickvals: this.yValsPeriod,
        ticktext: this.yValsPeriodLabel,
        ticks: 'outside',
        tickcolor: this.zeroLineColor,
        tickwidth: this.zerolinewidth,
        spikethickness: 4,
        displayModeBar: false,
        autosize: true,
        rangeslider: {
          range: [this.xmin, this.xmax],
          yaxis: [0, 2],
          visible: false,
          autorange: true
        }
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
        type: 'linear',
        ticks: 'outside',
        tickcolor: this.zeroLineColor,
        tickwidth: this.zerolinewidth,
        autorange: false,
        showspikes: false,
        fixedrange: true,
        showline: true,
        range: this.yRange,
        linecolor: this.zeroLineColor,
        linewidth: this.zerolinewidth,
        zerolinecolor: this.zeroLineColor,
        zerolinewidth: this.zerolinewidth,
        gridcolor: this.gridColor,
        gridwidth: this.gridwidth,
        bargap: this.bargap
      },
      shapes: [{
        type: 'line',
        layer: 'below',
        x0: this.xmin - 5,
        y0: this.yValsAvgAll,
        x1: this.xmax + 5,
        y1: this.yValsAvgAll,
        line: {
          color: this.zeroLineColor,
          width: this.zerolinewidth
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
        layer: 'lowest',
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
