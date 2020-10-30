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
      const tickText =  `${value}-${plus.toString().slice(-2)}`;
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
        y: -0.25
      },
      xaxis: {
        type: 'linear',
        title: `${this.periodGroups}-year period`,
        dtick: this.periodGroups,
        range: [this.xmin, this.xmax],
        tick0: 0,
        ticks: '',
        showline: false,
        tickfont: {
          family: 'Roboto',
          size: 12
        },
        tickmode: 'array',
        nticks: 5,
        // staggerAxis: staggerLabels.xAxis(),
        staggerMode: true,
        staggerLines: 2,
        tickvals: this.getXLabelValues(),
        ticktext: this.getXLabelText(),
        autorange: false,
        tickangle: this.textAngle,
        constraintoward: 'center',
        automargin: false,
        showspikes: false,
        tickformat: '',
        tickprefix: '',
        rangemode: 'tozero',
        rangeslider: {
          range: [1900, 2020],
          yaxis: [0, 2],
          visible: false,
          autorange: true
        },
        showexponent: 'all',
        exponentformat: 'none',
        spikethickness: 4
      },
      yaxis: {
        rangemode: 'tozero',
        type: 'linear',
        title: 'Days',
        tickfont: {
          family: 'Roboto',
          size: 12
        },
        range: [0, 2],
        ticks: '',
        tickformat: ',d',
        autorange: true,
        showspikes: false
      },
      bargap: 0.28,
      autosize: true,
      template: {
        data: {
          bar: [
            {
              type: 'bar',
              marker: {colorbar: {
                ticks: '',
                outlinewidth: 0
              }}
            }
          ],
          table: [
            {
              type: 'table',
              cells: {
                fill: {color: '#EBF0F8'},
                line: {color: 'white'}
              },
              header: {
                fill: {color: '#C8D4E3'},
                line: {color: 'white'}
              }
            }
          ],
          carpet: [
            {
              type: 'carpet',
              aaxis: {
                gridcolor: '#C8D4E3',
                linecolor: '#C8D4E3',
                endlinecolor: '#2a3f5f',
                minorgridcolor: '#C8D4E3',
                startlinecolor: '#2a3f5f'
              },
              baxis: {
                gridcolor: '#C8D4E3',
                linecolor: '#C8D4E3',
                endlinecolor: '#2a3f5f',
                minorgridcolor: '#C8D4E3',
                startlinecolor: '#2a3f5f'
              }
            }
          ],
        },
        layout: {
          geo: {
            bgcolor: 'white',
            showland: true,
            lakecolor: 'white',
            landcolor: 'white',
            showlakes: true,
            subunitcolor: '#C8D4E3'
          },
          font: {color: '#2a3f5f'},
          polar: {
            bgcolor: 'white',
            radialaxis: {
              ticks: '',
              gridcolor: '#EBF0F8',
              linecolor: '#EBF0F8'
            },
            angularaxis: {
              ticks: '',
              gridcolor: '#EBF0F8',
              linecolor: '#EBF0F8'
            }
          },
          scene: {
            xaxis: {
              ticks: '',
              gridcolor: '#DFE8F3',
              gridwidth: 2,
              linecolor: '#EBF0F8',
              zerolinecolor: '#EBF0F8',
              showbackground: true,
              backgroundcolor: 'white'
            },
            yaxis: {
              ticks: '',
              gridcolor: '#DFE8F3',
              gridwidth: 2,
              linecolor: '#EBF0F8',
              zerolinecolor: '#EBF0F8',
              showbackground: true,
              backgroundcolor: 'white'
            },
            zaxis: {
              ticks: '',
              gridcolor: '#DFE8F3',
              gridwidth: 2,
              linecolor: '#EBF0F8',
              zerolinecolor: '#EBF0F8',
              showbackground: true,
              backgroundcolor: 'white'
            }
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
            ticks: '',
            gridcolor: '#EBF0F8',
            linecolor: '#EBF0F8',
            automargin: false,
            zerolinecolor: '#EBF0F8',
            zerolinewidth: 2
          },
          yaxis: {
            ticks: '',
            gridcolor: '#EBF0F8',
            linecolor: '#EBF0F8',
            automargin: false,
            zerolinecolor: '#EBF0F8',
            zerolinewidth: 2
          },
          ternary: {
            aaxis: {
              ticks: '',
              gridcolor: '#DFE8F3',
              linecolor: '#A2B1C6'
            },
            baxis: {
              ticks: '',
              gridcolor: '#DFE8F3',
              linecolor: '#A2B1C6'
            },
            caxis: {
              ticks: '',
              gridcolor: '#DFE8F3',
              linecolor: '#A2B1C6'
            },
            bgcolor: 'white'
          },
          colorway: ['#636efa', '#EF553B', '#00cc96', '#ab63fa', '#19d3f3', '#e763fa', '#fecb52', '#ffa15a', '#ff6692', '#b6e880'],
          hovermode: 'closest',
          colorscale: {
            diverging: [['0', '#8e0152'], ['0.1', '#c51b7d'], ['0.2', '#de77ae'], ['0.3', '#f1b6da'], ['0.4', '#fde0ef'], ['0.5', '#f7f7f7'], ['0.6', '#e6f5d0'], ['0.7', '#b8e186'], ['0.8', '#7fbc41'], ['0.9', '#4d9221'], ['1', '#276419']],
            sequential: [['0', '#0508b8'], ['0.0893854748603352', '#1910d8'], ['0.1787709497206704', '#3c19f0'], ['0.2681564245810056', '#6b1cfb'], ['0.3575418994413408', '#981cfd'], ['0.44692737430167595', '#bf1cfd'], ['0.5363128491620112', '#dd2bfd'], ['0.6256983240223464', '#f246fe'], ['0.7150837988826816', '#fc67fd'], ['0.8044692737430168', '#fe88fc'], ['0.8938547486033519', '#fea5fd'], ['0.9832402234636871', '#febefe'], ['1', '#fec3fe']],
            sequentialminus: [['0', '#0508b8'], ['0.0893854748603352', '#1910d8'], ['0.1787709497206704', '#3c19f0'], ['0.2681564245810056', '#6b1cfb'], ['0.3575418994413408', '#981cfd'], ['0.44692737430167595', '#bf1cfd'], ['0.5363128491620112', '#dd2bfd'], ['0.6256983240223464', '#f246fe'], ['0.7150837988826816', '#fc67fd'], ['0.8044692737430168', '#fe88fc'], ['0.8938547486033519', '#fea5fd'], ['0.9832402234636871', '#febefe'], ['1', '#fec3fe']]
          },
          plot_bgcolor: 'white',
          paper_bgcolor: 'white',
          shapedefaults: {
            line: {width: 0},
            opacity: 0.4,
            fillcolor: '#506784'
          },
          annotationdefaults: {
            arrowhead: 0,
            arrowcolor: '#506784',
            arrowwidth: 1
          }
        },
        themeRef: 'PLOTLY_WHITE'
      },
      height: 1,
      bargroupgap: 0,
      plot_bgcolor: 'rgb(251, 252, 254)',
      paper_bgcolor: 'rgb(251, 252, 254)'
    };
  }

}


export default SandboxGeneratePlotData;
