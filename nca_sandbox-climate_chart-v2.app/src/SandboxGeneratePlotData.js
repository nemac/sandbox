class SandboxGeneratePlotData {
  constructor(props){
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

  setXRange(props){
    this.xmin = props.xmin;
    this.xmax = props.xmax;
  }

  setTitle(props){
    this.chartTitle = props.chartTitle;
  }

  getXvalues(){
    let ret = [];
    for(let x_val=this.xmin; x_val <= this.xmax; x_val++){
      ret.push(x_val.toString());
    }
    return ret;
  }

  getYvalues(){
    let ret = [];
    let x_index = this.xmin;

    // remove -9999
    this.yvals = this.yvals.map( val => {
      let newVal = val
      if (val < 0) {
        newVal = undefined;
      }
      return newVal
    })

    while(x_index < parseInt(this.xvals[0])){ // requested range below data range
      x_index++;
      ret.push('0');  // should this be undef/NaN? How does plotly handle it?
    }
    let yvals_index=0;
    while(x_index <= parseInt(this.xvals[this.xvals.length-1])){ // data
      x_index++;
      ret.push(this.yvals[yvals_index++]);
    }
    while(x_index <= this.xmax){ //requested range above data range
      x_index++;
      ret.push('0');
    }
    return ret;
  }

  getData() {
    if (this.maxVal === -Infinity) return [{}];
    return [this.getTrace1(), this.getTrace2()];
  }

  uuidv() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getTrace1(){
    return {
      uid: this.uuidv(),
      meta: {columnNames: {
        x: 'Year',
        y: 'Location'
      }},
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
        start:this.xmin
      },
      marker: {
        line: {color: `rgb(${this.barColor})`},
        color: `rgb(${this.barColor})`
      },
      nbinsx: 0,
      histfunc: 'avg',
      cumulative: {enabled: false},
      transforms: [
        {
          meta: {columnNames: {target: 'Year'}},
          type: 'filter',
          value: [this.xmin.toString(), this.xmax.toString()],
          operation: '[]',
          targetsrc: 'dmichels:4:3b282f',
          target: this.getXvalues(),
        }
      ],
      legendgroup: 1,
      orientation: 'v',
      hovertemplate: ''
    };
  }

  getTrace2(){
    return {
      uid: this.uuidv(),
      meta: {columnNames: {
        x: 'Year',
        y: 'Location'
      }},
      mode: 'markers+lines',
      name: `Annual ${this.legnedText}`,
      type: 'scatter',
      xsrc: 'dmichels:4:3b282f',
      x: this.getXvalues(),
      ysrc: 'dmichels:4:060bbe',
      y: this.getYvalues(),
      marker: {color: 'rgb(0, 0, 0)'},
      transforms: [
        {
          meta: {columnNames: {target: 'Year'}},
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
    let count = 0
    const periodGroups = this.periodGroups
    return this.xvals.map( (value) => {
      const plus = value+periodGroups;
      const tickText =  `${value} - ${plus.toString().slice(-2)}`;
      return tickText;
    })
  }

  getXLabelValues() {
    let count = 0
    const periodGroups = this.periodGroups;
    return this.xvals.map( (value) => {
      count += 1;
      const mod = (count-1) % periodGroups;
      if (mod === 0) {
        const tickValue = value + parseInt(periodGroups/2);
        return tickValue;
      }
    })
  }

  getLayout(){
    return {
      showlegend: true,
      legend: {
        autosize: true,
        orientation: "h",
        xanchor: "center",
        x: 0.5,
        y: -0.3
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
        },
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
        },
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
