class SandboxGeneratePlotData {
  constructor(props) {
    // style guide driven colors, fonts, ticks may need expanding
    //  https://docs.google.com/document/d/1_zO39hdlGL9uY0Y0Vf57ncYNYXuACUAIM0fKCUo3spc/edit?ts=5fa547dd#
    this.blue = '4, 90, 141';
    this.red = '189, 0, 38';
    this.green = '127, 188, 65';
    this.brown = '153, 52, 4';
    this.precipitationColor = '#5AB4AC';
    this.temperatureColor = '#FEB24C';
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
    console.log('this.xvals', this.xvals)
    console.log('this.yvals', this.yvals)

    console.log('this.yValsPeriod', this.yValsPeriod)
    console.log('this.yValsPeriod', this.xValsSumByPeriod)
    console.log('this.xValsAvgByPeriod', this.xValsAvgByPeriod)

  }

  // creates the y values for each period
  yValsPeriod() {
    let count = 0;
    const yValsPeriodAll = this.xvals.map((value, index) => {
      // return value
      if (index === 0) {
        const plus = value + (this.periodGroups - 1);
        const tickText = `${value}–${plus.toString().slice(-2)}`;
        return value;
      }
      if (count === (this.periodGroups - 1)) {
        count = 0;
        const plus = value + (this.periodGroups - 1);
        const tickText = `${value}–${plus.toString().slice(-2)}`;
        return value;
      }
      count += 1;
    });
    // return yValsPeriodAll;
    return yValsPeriodAll.filter((value) => value !== undefined );
  }

  // sums for the defined periods, creates a new array with period means
  xValsSumByPeriod() {
    let count = 0
    let peroidSum = 0;
    let returnSum = 0
    const sumXvalsAll = this.yvals.map((value, index) => {
      if (count === (this.periodGroups - 1)) {
        peroidSum += value;
        returnSum = peroidSum;
        count = 0;
        peroidSum = 0;
        return Number(Number(returnSum).toFixed(4));
      } else {
        peroidSum += value;
        count += 1;
      }
    })
    // return sumXvalsAll;
    return sumXvalsAll.filter((value) => value !== undefined );
  }

  // means for the defined periods, creates a new array with period means
  xValsAvgByPeriod() {
    let count = 0;
    let peroidSum = 0;
    let returnAvg = 0
    const avgXvalsAll = this.yvals.map((value, index) => {
      if (count === (this.periodGroups - 1)) {
        peroidSum += value;
        returnAvg = peroidSum/this.periodGroups;
        count = 0;
        peroidSum = 0;
        return Number(Number(returnAvg).toFixed(4));
      } else {
        peroidSum += value;
        count += 1;
      }
    })
    // return avgXvalsAll;
    return avgXvalsAll.filter((value) => value !== undefined );
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
      meta: {
        columnNames: {
          x: 'YEAR',
          y: 'NC'
        }
      },
      mode: 'lines',
      name: 'Precip',
      type: 'bar',
      x: this.yValsPeriod,
      y: this.xValsAvgByPeriod,
      marker: {
        line: {color: this.barColor},
        color: this.barColor
      },
      nbinsx: 0,
      histfunc: 'sum',
      hoverinfo: 'x+y',
      cumulative: {enabled: false},
      legendgroup: 1,
      orientation: 'v',
      hovertemplate: ''
      // uid: '1883be',
      // meta: {columnNames: {
      //     x: 'Year',
      //     y: 'NC'
      //   }},
      // mode: 'lines',
      // name: 'Precip',
      // type: 'bar',
      // x: this.yValsPeriod,
      // y: this.xValsSumByPeriod,
      // marker: {
      //   line: {color: 'rgb(88, 179, 171)'},
      //   color: 'rgb(88, 179, 171)'
      // },
      // hoverinfo: 'x+y',
      // cumulative: {enabled: false},
      // // transforms: [
      // //   {
      // //     meta: {columnNames: {target: 'Year'}},
      // //     value: [this.xmin, this.xmax],
      // //     target:this.yValsPeriod
      // //   }
      // // ],
      // legendgroup: 1,
      // orientation: 'v',
      // hovertemplate: ''
    }
  }

  getTrace2() {
    return {
      uid: SandboxGeneratePlotData.uuidv(),
      meta: {columnNames: {
          x: 'YEAR',
          y: 'NC'
        }
      },
      mode: 'markers+lines',
      name: 'Annual Precip',
      type: 'scatter',
      x: this.xvals,
      y: this.yvals,
      marker: {color: 'rgb(0, 0, 0)'},
      hoverinfo: 'x+y'
    }
  }
  // getTrace2() {
  //   return {
  //     uid: SandboxGeneratePlotData.uuidv(),
  //     meta: {
  //       columnNames: {
  //         x: 'Year',
  //         y: 'Location'
  //       }
  //     },
  //     mode: 'markers+lines',
  //     name: `Annual ${this.legnedText}`,
  //     type: 'scatter',
  //     x: this.xValsAvgByPeriod,
  //     y: this.yValsPeriod,
  //     marker: { color: 'rgb(0, 0, 0)' },
  //     hoveron: 'points',
  //     hoverinfo: 'x+y',
  //     // transforms: [
  //     //   {
  //     //     meta: { columnNames: { target: 'Year' } },
  //     //     type: 'filter',
  //     //     value: [this.xmin.toString(), this.xmax.toString()],
  //     //     operation: '[]',
  //     //      target: this.xValsAvgByPeriod
  //     //   }
  //     // ]
  //   };
  // }

  // getTrace1() {
  //   return {
  //     uid: SandboxGeneratePlotData.uuidv(),
  //     meta: {columnNames: {
  //         x: 'Year',
  //         y: 'NC'
  //       }},
  //     mode: 'lines',
  //     name: 'Precip',
  //     type: 'histogram',
  //     xsrc: 'dmichels:4:3b282f',
  //     x: ['1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
  //     ysrc: 'dmichels:4:060bbe',
  //     y: ['0.571', '0.457', '0.753', '0.872', '0.875', '1.575', '0.64', '0.821', '0.904', '0.862', '0.899', '0.59', '1.026', '0.781', '1.653', '0.643', '0.897', '0.849', '0.418', '0.944', '0.608', '0.974', '0.74', '0.977', '0.412', '0.633', '0.79', '1.302', '0.514', '1.373', '0.461', '0.894', '0.536', '0.727', '0.996', '1.044', '0.685', '0.814', '0.3', '0.917', '1.201', '0.699', '0.705', '0.561', '0.894', '1.415', '1.699', '0.483', '1.263', '1.861', '0.448', '0.442', '0.508', '1.369', '1.054', '1.06', '1.412', '0.417', '0.851', '0.827', '1.463', '0.875', '0.582', '0.672', '0.988', '1.036', '1.547', '0.825', '1.929'],
  //     xbins: {
  //       end: 2019,
  //       size: 5,
  //       start: 1950
  //     },
  //     marker: {
  //       line: {color: 'rgb(88, 179, 171)'},
  //       color: 'rgb(88, 179, 171)'
  //     },
  //     nbinsx: 0,
  //     histfunc: 'sum',
  //     hoverinfo: 'x+y',
  //     cumulative: {enabled: false},
  //     transforms: [
  //       {
  //         meta: {columnNames: {target: 'Year'}},
  //         type: 'filter',
  //         value: ['1970', '2020'],
  //         operation: '[]',
  //         targetsrc: 'dmichels:4:3b282f',
  //         target: ['1950', '1951', '1952', '1953', '1954', '1955', '1956', '1957', '1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
  //       }
  //     ],
  //     legendgroup: 1,
  //     orientation: 'v',
  //     hovertemplate: ''
  //   //   meta: {
  //   //     columnNames: {
  //   //       x: 'Year',
  //   //       y: 'Location'
  //   //     }
  //   //   },
  //   //   mode: 'bar',
  //   //   name: `${this.legnedText}`,
  //   //   type: 'bar',
  //   //   x: this.xValsSumByPeriod,
  //   //   y: this.yValsPeriod,
  //   //   xbins: {
  //   //     end: this.xmax,
  //   //     size: 5,
  //   //     start: this.xmin
  //   //   },
  //   //   marker: {
  //   //     line: { color: `rgb(${this.barColor})` },
  //   //     color: this.barColor
  //   //   },
  //   //   nbinsx: 0,
  //   //   cumulative: { enabled: false },
  //   //   transforms: [
  //   //     {
  //   //       meta: {
  //   //         columnNames:
  //   //         {
  //   //           target: 'Year'
  //   //         }
  //   //       },
  //   //       type: 'filter',
  //   //       value: [this.xmin.toString(), this.xmax.toString()],
  //   //       operation: '[]',
  //   //       target: this.yValsPeriod
  //   //     }
  //   //   ],
  //   //   legendgroup: 1,
  //   //   orientation: 'v',
  //   //   histfunc: 'sum',
  //   //   hovermode:'closest',
  //   //   hoverinfo: 'x+y'
  //   // };
  // }

  // getTrace2() {
  //   return {
  //     uid: SandboxGeneratePlotData.uuidv(),
  //     meta: {
  //       columnNames: {
  //         x: 'Year',
  //         y: 'Location'
  //       }
  //     },
  //     mode: 'markers+lines',
  //     name: `Annual ${this.legnedText}`,
  //     type: 'scatter',
  //     x: this.xValsAvgByPeriod,
  //     y: this.yValsPeriod,
  //     marker: { color: 'rgb(0, 0, 0)' },
  //     hoveron: 'points',
  //     hoverinfo: 'x+y',
  //     // transforms: [
  //     //   {
  //     //     meta: { columnNames: { target: 'Year' } },
  //     //     type: 'filter',
  //     //     value: [this.xmin.toString(), this.xmax.toString()],
  //     //     operation: '[]',
  //     //      target: this.xValsAvgByPeriod
  //     //   }
  //     // ]
  //   };
  // }

  getXLabelText() {
    const periodGroups = this.periodGroups;
    return this.xvals.map((value) => {
      const plus = value + (periodGroups - 1);
      const tickText = `${value}–${plus.toString().slice(-2)}`;
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
      xaxis: {
        type: 'linear',
        dtick: 5,
        range: [this.xmin, this.xmax],
        tick0: 0,
        ticks: '',
        showline: false,
        tickfont: {family: 'Roboto'},
        tickmode: 'linear',
        autorange: false,
        tickangle: 90,
        automargin: true,
        showspikes: false,
        tickformat: '',
        tickprefix: '',
        rangeslider: {
          range: [this.xmin, this.xmax],
          yaxis: [0, 2],
          visible: false,
          autorange: true
        },
        showexponent: 'all',
        exponentformat: 'none',
        spikethickness: 4
      },
      yaxis: {
        type: 'linear',
        range: [0, 2],
        ticks: '',
        autorange: true,
        showspikes: false,
        bargap: 0.28,
      },
    }
  }
    // return {
    //   showlegend: true,
    //   displayModeBar: false,
    //   legend: {
    //     autosize: true,
    //     orientation: 'h',
    //     xanchor: 'center',
    //     x: 0.85,
    //     y: 1.05,
    //     font: {
    //       family: this.font,
    //       size: this.fontSizeLabels
    //     }
    //   },
    //   title: {
    //     text: this.chartTitle,
    //     font: {
    //       family: this.font,
    //       size: this.fontSizePrimary
    //     },
    //     x: 0.5
    //   },
    //   xaxis: {
    //     type: 'linear',
    //     title: {
    //       text: `${this.periodGroups}–year period`,
    //       font: {
    //         family: this.font,
    //         size: this.fontSizeLabels
    //       }
    //     },
    //     dtick:  1, //this.periodGroups,
    //     range: [this.xmin, this.xmax],
    //     zeroline: true,
    //     showline: true,
    //     linewidth: 1,
    //     showgrid: false,
    //     fixedrange: true,
    //     zerolinecolor: this.zeroLineColor,
    //     zerolinewidth: this.zerolinewidth,
    //     tickfont: {
    //       family: this.font,
    //       size: this.fontSizeLabelsSecondary
    //     },
    //     tickmode: 'array',
    //     nticks: this.periodGroups,
    //     tickvals: this.getXLabelValues(),
    //     ticktext: this.getXLabelText(),
    //     autorange: false,
    //     tickangle: this.textAngle,
    //     constraintoward: 'center',
    //     automargin: false,
    //     showspikes: false,
    //     rangemode: 'tozero',
    //     spikethickness: 4,
    //     rangeslider: {
    //       range: [1900, this.xmax],
    //       yaxis: [0, 2],
    //       visible: false,
    //       autorange: true
    //     }
    //   },
    //   yaxis: {
    //     rangemode: 'tozero',
    //     type: 'linear',
    //     title: {
    //       text: 'Days',
    //       font: {
    //         family: this.font,
    //         size: this.fontSizeLabels
    //       }
    //     },
    //     zerolinecolor: this.zeroLineColor,
    //     zerolinewidth: this.zerolinewidth,
    //     gridcolor: this.gridColor,
    //     gridwidth: this.gridwidth,
    //     range: [0, 2],
    //     ticks: '',
    //     linewidth: 1,
    //     tickformat: ',d',
    //     autorange: true,
    //     showspikes: false,
    //     fixedrange: true,
    //     tickfont: {
    //       family: this.font,
    //       size: this.fontSizeLabels
    //     }
    //   },
    //   bargap: 0.28,
    //   autosize: true,
    //   height: 1,
    //   bargroupgap: 0,
    //   plot_bgcolor: 'rgb(251, 252, 254)',
    //   paper_bgcolor: 'rgb(251, 252, 254)'
    // };
  // }
}

export default SandboxGeneratePlotData;
