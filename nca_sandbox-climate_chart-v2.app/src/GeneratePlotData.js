




class GeneratePlotData {
    constructor(xvals, yvals){
        this.xmin = 1900;
        this.xmax = 2018;
        this.xvals = xvals;
        this.yvals = yvals;

    }
    
    setXRange(xmin, xmax){
        this.xmin = xmin;
        this.xmax = xmax;
    }

    getXvalues(){
        let ret = [];
        for(let x_val=this.xmin; x_val <= this.xmax; x_val++){
            ret.push(x_val.toString());
        }
        console.log('GeneratePlotData.getXvalues()');
        console.log(ret);
        return ret;
    }


    getYvalues(){
        let ret = [];
        let x_index = this.xmin;
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
        console.log('GeneratePlotData.getYvalues()');
        console.log(ret);
        return ret;
//        return ['0.571', '0.457', '0.753', '0.872', '0.875', '1.575', '0.64', '0.821', '0.904', '0.862', '0.899', '0.59', '1.026', '0.781', '1.653', '0.643', '0.897', '0.849', '0.418', '0.944', '0.608', '0.974', '0.74', '0.977', '0.412', '0.633', '0.79', '1.302', '0.514', '1.373', '0.461', '0.894', '0.536', '0.727', '0.996', '1.044', '0.685', '0.814', '0.3', '0.917', '1.201', '0.699', '0.705', '0.561', '0.894', '1.415', '1.699', '0.483', '1.263', '1.861', '0.448', '0.442', '0.508', '1.369', '1.054', '1.06', '1.412', '0.417', '0.851', '0.827', '1.463', '0.875', '0.582', '0.672', '0.988', '1.036', '1.547', '0.825', '1.929'].slice(this.xmin-1950, this.xmax-1950);
    }


    getData(){
        return [this.getTrace1(), this.getTrace2()]
    }


    getTrace1(){
        return {
          uid: '1883be', 
          meta: {columnNames: {
              x: 'Year', 
              y: 'NC'
            }}, 
          mode: 'lines', 
          name: 'Precip', 
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
            line: {color: 'rgb(88, 179, 171)'}, 
            color: 'rgb(88, 179, 171)'
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
          uid: '5b1527', 
          meta: {columnNames: {
              x: 'Year', 
              y: 'NC'
            }}, 
          mode: 'markers+lines', 
          name: 'Annual Precip', 
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

    getLayout(){ 
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
              range: [1967.1226295828067, 2020.8773704171933], 
              yaxis: [0, 2.053037694013304], 
              visible: false, 
              autorange: true
            }, 
            showexponent: 'all', 
            exponentformat: 'none', 
            spikethickness: 4
          }, 
          yaxis: {
            type: 'linear', 
            range: [0, 2.053037694013304], 
            ticks: '', 
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
              mesh3d: [
                {
                  type: 'mesh3d', 
                  colorbar: {
                    ticks: '', 
                    outlinewidth: 0
                  }
                }
              ], 
              contour: [
                {
                  type: 'contour', 
                  colorbar: {
                    ticks: '', 
                    outlinewidth: 0
                  }, 
                  autocolorscale: true
                }
              ], 
              heatmap: [
                {
                  type: 'heatmap', 
                  colorbar: {
                    ticks: '', 
                    outlinewidth: 0
                  }, 
                  autocolorscale: true
                }
              ], 
              scatter: [
                {
                  type: 'scatter', 
                  marker: {colorbar: {
                      ticks: '', 
                      outlinewidth: 0
                    }}
                }
              ], 
              surface: [
                {
                  type: 'surface', 
                  colorbar: {
                    ticks: '', 
                    outlinewidth: 0
                  }
                }
              ], 
              heatmapgl: [
                {
                  type: 'heatmapgl', 
                  colorbar: {
                    ticks: '', 
                    outlinewidth: 0
                  }
                }
              ], 
              histogram: [
                {
                  type: 'histogram', 
                  marker: {colorbar: {
                      ticks: '', 
                      outlinewidth: 0
                    }}
                }
              ], 
              parcoords: [
                {
                  line: {colorbar: {
                      ticks: '', 
                      outlinewidth: 0
                    }}, 
                  type: 'parcoords'
                }
              ], 
              scatter3d: [
                {
                  type: 'scatter3d', 
                  marker: {colorbar: {
                      ticks: '', 
                      outlinewidth: 0
                    }}
                }
              ], 
              scattergl: [
                {
                  type: 'scattergl', 
                  marker: {colorbar: {
                      ticks: '', 
                      outlinewidth: 0
                    }}
                }
              ], 
              choropleth: [
                {
                  type: 'choropleth', 
                  colorbar: {
                    ticks: '', 
                    outlinewidth: 0
                  }
                }
              ], 
              scattergeo: [
                {
                  type: 'scattergeo', 
                  marker: {colorbar: {
                      ticks: '', 
                      outlinewidth: 0
                    }}
                }
              ], 
              histogram2d: [
                {
                  type: 'histogram2d', 
                  colorbar: {
                    ticks: '', 
                    outlinewidth: 0
                  }, 
                  autocolorscale: true
                }
              ], 
              scatterpolar: [
                {
                  type: 'scatterpolar', 
                  marker: {colorbar: {
                      ticks: '', 
                      outlinewidth: 0
                    }}
                }
              ], 
              contourcarpet: [
                {
                  type: 'contourcarpet', 
                  colorbar: {
                    ticks: '', 
                    outlinewidth: 0
                  }
                }
              ], 
              scattercarpet: [
                {
                  type: 'scattercarpet', 
                  marker: {colorbar: {
                      ticks: '', 
                      outlinewidth: 0
                    }}
                }
              ], 
              scattermapbox: [
                {
                  type: 'scattermapbox', 
                  marker: {colorbar: {
                      ticks: '', 
                      outlinewidth: 0
                    }}
                }
              ], 
              scatterpolargl: [
                {
                  type: 'scatterpolargl', 
                  marker: {colorbar: {
                      ticks: '', 
                      outlinewidth: 0
                    }}
                }
              ], 
              scatterternary: [
                {
                  type: 'scatterternary', 
                  marker: {colorbar: {
                      ticks: '', 
                      outlinewidth: 0
                    }}
                }
              ], 
              histogram2dcontour: [
                {
                  type: 'histogram2dcontour', 
                  colorbar: {
                    ticks: '', 
                    outlinewidth: 0
                  }, 
                  autocolorscale: true
                }
              ]
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
              title: {x: 0.05}, 
              xaxis: {
                ticks: '', 
                gridcolor: '#EBF0F8', 
                linecolor: '#EBF0F8', 
                automargin: true, 
                zerolinecolor: '#EBF0F8', 
                zerolinewidth: 2
              }, 
              yaxis: {
                ticks: '', 
                gridcolor: '#EBF0F8', 
                linecolor: '#EBF0F8', 
                automargin: true, 
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
          bargroupgap: 0, 
          plot_bgcolor: 'rgb(251, 252, 254)', 
          paper_bgcolor: 'rgb(251, 252, 254)'
        };
    }

}


export default GeneratePlotData;
