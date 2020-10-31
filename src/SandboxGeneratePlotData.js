class SandboxGeneratePlotData {
  constructor(props) {
    this.xmin = props.xmin;
    this.xmax = props.xmax;
    this.xvals = props.xvals;
    this.yvals = props.yvals;
    this.maxVal = Math.max(...this.yvals);
    this.chartTitle = props.chartTitle;
    this.legnedText = props.legnedText;
    this.chartType = props.chartType;
    this.barColor = this.chartType === 'Precipitation' ? '61, 133, 198' : '88, 179, 171';
    this.periodGroups = props.periodGroups ? props.periodGroups : 5;
    this.useRobust = props.useRobust;
    this.textAngle = this.useRobust ? 0 : 90;
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
      meta: {
        columnNames: {
          x: 'Year',
          y: 'Location'
        }
      },
      mode: 'lines',
      name: `${this.legnedText}`,
      type: 'histogram',
      xsrc: 'dmichels:4:3b282f',
      x: this.getXvalues(),
      ysrc: 'dmichels:4:060bbe',
      y: this.getYvalues(),
      xbins: {
        end: this.xmax,
        size: 5,
        start: this.xmin
      },
      marker: {
        line: { color: `rgb(${this.barColor})` },
        color: `rgb(${this.barColor})`
      },
      nbinsx: 0,
      histfunc: 'avg',
      cumulative: { enabled: false },
      transforms: [
        {
          meta: {
            columnNames:
            {
              target: 'Year'
            }
          },
          type: 'filter',
          value: [this.xmin.toString(), this.xmax.toString()],
          operation: '[]',
          targetsrc: 'dmichels:4:3b282f',
          target: this.getXvalues()
        }
      ],
      legendgroup: 1,
      orientation: 'v',
      hovertemplate: ''
    };
  }

  getTrace2() {
    return {
      uid: SandboxGeneratePlotData.uuidv(),
      meta: {
        columnNames: {
          x: 'Year',
          y: 'Location'
        }
      },
      mode: 'markers+lines',
      name: `Annual ${this.legnedText}`,
      type: 'scatter',
      xsrc: 'dmichels:4:3b282f',
      x: this.getXvalues(),
      ysrc: 'dmichels:4:060bbe',
      y: this.getYvalues(),
      marker: { color: 'rgb(0, 0, 0)' },
      transforms: [
        {
          meta: { columnNames: { target: 'Year' } },
          type: 'filter',
          value: [this.xmin.toString(), this.xmax.toString()],
          operation: '[]',
          targetsrc: 'dmichels:4:3b282f',
          target: this.getXvalues()
        }
      ]
    };
  }

  getXLabelText() {
    const periodGroups = this.periodGroups;
    return this.xvals.map((value) => {
      const plus = value + periodGroups;
      const tickText = `${value} - ${plus.toString().slice(-2)}`;
      return tickText;
    });
  }

  getXLabelValues() {
    let count = 0;
    const periodGroups = this.periodGroups;
    return this.xvals.map((value) => {
      count += 1;
      const mod = (count - 1) % periodGroups;
      if (mod === 0) {
        const tickValue = value + parseInt(periodGroups / 2, 10);
        return tickValue;
      }
      return null;
    });
  }

  getLayout() {
    return {
      showlegend: true,
      legend: {
        autosize: true,
        orientation: 'h',
        xanchor: 'center',
        x: 0.5,
        y: -0.3
      },
      title: {
        text: this.chartTitle,
        font: {
          family: 'Roboto',
          size: 20
        },
        x: 0.5
      },
      xaxis: {
        type: 'linear',
        title: `${this.periodGroups}-year period`,
        dtick: this.periodGroups,
        range: [this.xmin, this.xmax],
        showline: false,
        tickfont: {
          family: 'Roboto',
          size: 12
        },
        tickmode: 'array',
        nticks: 5,
        tickvals: this.getXLabelValues(),
        ticktext: this.getXLabelText(),
        autorange: false,
        tickangle: this.textAngle,
        constraintoward: 'center',
        automargin: false,
        showspikes: false,
        rangemode: 'tozero',
        spikethickness: 4,
        rangeslider: {
          range: [1900, 2020],
          yaxis: [0, 2],
          visible: false,
          autorange: true
        }
      },
      yaxis: {
        rangemode: 'tozero',
        type: 'linear',
        title: 'Days',
        range: [0, 2],
        ticks: '',
        tickformat: ',d',
        autorange: true,
        showspikes: false,
        tickfont: {
          family: 'Roboto',
          size: 12
        }
      },
      bargap: 0.28,
      autosize: true,
      height: 1,
      bargroupgap: 0,
      plot_bgcolor: 'rgb(251, 252, 254)',
      paper_bgcolor: 'rgb(251, 252, 254)'
    };
  }
}

export default SandboxGeneratePlotData;