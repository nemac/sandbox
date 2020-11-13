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
    this.yValsSumAll = this.yValsSumAll();
    this.yValsAvgAll = this.yValsAvgAll();
    const max = Math.max(...this.yvals)
    // const newMax = (Math.ceil(max*20)/20).toFixed(2);
    // this.rangex = (0, this.round5(max))

    const num = this.getNumber( max );
    const decimal = this.getDecimal((max % 1).toFixed(2));
    const newMax = Number(`${num}.${decimal}`) < 0 ? 1 : Number(`${num}.${decimal}`);

    this.yRange = [0, newMax];
    console.log('this.rangex', this.yRange  );

    // console.log('makeArr', this.makeArr(0,.25,5))
  }

  round5(x) {
    return Math.ceil(x/5)*5;
  }

  getDecimal(Decimal) {
  	// return this.round5(Number(this.round5(Number(Decimal.substring(Decimal.indexOf(".")+1, Decimal .length))).toString().replace(/^0+(\d)|(\d)0+$/gm, '$1$2')));
    return this.round5(Number(Decimal.substring(Decimal.indexOf(".")+1, Decimal .length)))

  }
  getNumber(Decimal) {
    // return this.round5(Number(this.round5(Number(Decimal.substring(Decimal.indexOf(".")+1, Decimal .length))).toString().replace(/^0+(\d)|(\d)0+$/gm, '$1$2')));
    return Math.trunc(Decimal)

  }

  // pretty(vals) {
  //   const min = Math.min(...vals) <= 0 ? 0.00001 : Math.min(...vals);
  //   const max = Math.max(...vals);
  //   const divisions = 5;
  //   console.log('max - min', max - min)
  //   const range = this.niceNumber(max - min, false);
  //   const d = this.niceNumber(range / (divisions - 1 ), true);
  //   console.log('range, d', range, d)
  //   const miny = Math.floor(min  / d) * d;
  //   const maxy = Math.ceil (max / d) * d;
  //
  //   // const roundedMax = (Math.ceil(max*20)/20).toFixed(2);
  //   // const maxPower = Math.pow(10.0, Math.floor(Math.log10(roundedMax)))
  //   return [miny, maxy]
  // }

  // makeArr(start, end, step) {
  //   step = step || 1;
  //   var arr = [];
  //   for (var i=start;i<stop;i+=step){
  //      arr.push(i);
  //   }
  //   return arr;
  // }
  // makeArr(startValue, stopValue, cardinality) {
  //   var arr = [];
  //   var step = (stopValue - startValue) / (cardinality - 1);
  //   for (var i = 0; i < cardinality; i++) {
  //     arr.push(startValue + (step * i));
  //   }
  //   console.log('makeArr', arr)
  //   return arr;
  // }

 //  pretty(min, max) {
 //    let ndiv = 5;
 //    const return_bounds = ndiv;
 //    const minN = 3;
 //    const shrinkSml = 0.75;
 //    const h = 1.5;
 //    const h5 = .5 + 1.5 * h;
 //    let isSmall = false;
 //    const dx = max - min;
 //    let cell = 0;
 //    let U = 0;
 //    const rounding_eps = 0.5;
 //    const eps_correction = 0;
 //
 //    if (dx == 0 && max == 0) {
 //      console.log('pretty first is small')
 //      cell = 1;
 //      isSmall = true;
 //    } else {
 //      cell = Math.max(Math.abs(min),Math.abs(max));
 //      U = 1 + ((h5 >= 1.5*h+.5) ? 1/(1+h) : 1.5/(1+h5));
 //      U *= this.imax2(1,ndiv) * Number.EPSILON;
 //      console.log('pretty imax2', this.imax2(1,ndiv));
 //      isSmall = dx < cell * U * 3;
 //      console.log('pretty second is small', U)
 //    }
 //
 //    if(isSmall) {
 //      if(cell > 10) {
 //        cell = 9 + cell/10;
 //      }
 //      cell *= shrinkSml;
 //      if(minN > 1) {
 //        cell /= minN;
 //      }
 //    } else {
 //      cell = dx;
 //      if(isSmall > 1) {
 //        cell /= isSmall;
 //      }
 //    }
 //
 //    if(cell < 20*Number.MAX_SAFE_INTEGER) {
 //      cell = 20*Number.MAX_SAFE_INTEGER;
 //    } else if(cell * 10 > Number.MAX_SAFE_INTEGER) {
 //      cell = .1*Number.MAX_SAFE_INTEGER;
 //    }
 //
 //   const base = Math.pow(10.0, Math.floor(Math.log10(cell))); /* base <= cell < 10*base */
 //   let unit = base;
 //   if((U = 2*base)-cell <  h*(cell-unit)) { unit = U;
 //   if((U = 5*base)-cell < h5*(cell-unit)) { unit = U;
 //   if((U = 10*base)-cell <  h*(cell-unit)) unit = U; }}
 //
 //   let ns = Math.floor(min/unit+rounding_eps);
 //   let nu = Math.ceil (max/unit-rounding_eps);
 //
 //   if(eps_correction && (eps_correction > 1 || !i_small)) {
 //     if(min != 0.) min *= (1- DBL_EPSILON); else min = -DBL_MIN;
 //     if(max != 0.) max *= (1+ DBL_EPSILON); else max = +DBL_MIN;
 //   }
 //
 //   while(nu*unit < max - rounding_eps*unit) nu++;
 //   let k = 0;
 //
 //   k = parseInt(0.5 + nu - ns,10);
 //   if(k < minN) {
 //     k = minN - k;
 //   	if(ns >= 0.) {
 //   	    nu += k/2;
 //   	    ns -= k/2 + k%2;/* ==> nu-ns = old(nu-ns) + min_n -k = min_n */
 //   	} else {
 //   	    ns -= k/2;
 //   	    nu += k/2 + k%2;
 //   	}
 //   	ndiv = minN;
 //       }
 //       else {
 //   	ndiv = k;
 //       }
 //       if(return_bounds) {// used in pretty.default(), ensure result covers original range
 //   	if(ns * unit < min) min = ns * unit;
 //   	if(nu * unit > max) max = nu * unit;
 //       } else { // used in graphics GEpretty()
 //   	min = ns;
 //   	max = nu;
 //       }
 // /* ensure that	nu - ns	 == min_n */
 //
 //    console.log('pretty', ns, nu, min, max, unit)
 //
 //  }
//
//   imax2(min, max) {
//     var sieve = [], i, j, primes = [];
//     for (i = 2; i <= max; ++i) {
//         if (!sieve[i]) {
//             // i has not been marked -- it is prime
//             if (i >= min) {
//                 primes.push(i);
//             }
//             for (j = i << 1; j <= max; j += i) {
//                 sieve[j] = true;
//             }
//         }
//     }
//     return primes[primes.length-1];
// }

  // pretty(low, high, n) {
  //   const range = this.niceNumber(high - low, false);
  //   const d = this.niceNumber(range / (n-1 ), true);
  //   const miny = Math.floor(low  / d) * d;
  //   const maxy = Math.ceil (high / d) * d;
  //   console.log('pretty', low, high)
  //   console.log('pretty', miny, maxy)
  //   return [miny, maxy];
  // }
  //
  // niceNumber(n, round) {
  //   const exp = Math.floor(Math.log10(Number(n)))
  //   // console.log('niceNumber', exp, n)
  //   let f = n / 10 ** exp
  //   let nf = 0
  //   if (round) {
  //     if (f < 1.5){
  //       nf = 1.0
  //     } else if (f < 3.0){
  //       nf = 2.0
  //     } else if (f < 7.0){
  //       nf = 5.0
  //     } else {
  //       nf = 10.0
  //     }
  //   } else {
  //     if (n < 1.0) {
  //       nf = 1.0;
  //     } else if (n <= 2.0) {
  //       nf = 2.0;
  //     } else if (n <= 5.0) {
  //       nf = 5.0;
  //     } else {
  //       nf = 10.0;
  //     }
  //   }
  //   return nf * (10.0 ** exp);
  // }

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
        return value;
      }
      if (count === (this.periodGroups - 1)) {
        count = 0;
        return value;
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
        peroidSum += value;
        returnSum = peroidSum;
        count = 0;
        peroidSum = 0;
        return Number(Number(returnSum).toFixed(4));
      } else { // eslint-disable-line no-else-return
        peroidSum += value;
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
        peroidSum += value;
        returnAvg = peroidSum / this.periodGroups;
        count = 0;
        peroidSum = 0;
        return Number(Number(returnAvg).toFixed(4));
      } else { // eslint-disable-line no-else-return
        peroidSum += value;
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
      y: this.yvals,
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
        // range: this.yRange,
        ticks: 'outside',
        tickcolor: this.zeroLineColor,
        tickwidth: this.zerolinewidth,
        // dtick: 0.5,
        autorange: true,
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
      }]
    };
  }
}

export default SandboxGeneratePlotData;