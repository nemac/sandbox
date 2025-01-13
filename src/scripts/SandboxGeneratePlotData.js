import { Opacity } from '@material-ui/icons';
import SandboxHumanReadable from './SandboxHumanReadable';

class SandboxGeneratePlotData {
  constructor(props) {
    // style guide driven colors, fonts, ticks may need expanding
    //  https://docs.google.com/document/d/1_zO39hdlGL9uY0Y0Vf57ncYNYXuACUAIM0fKCUo3spc/edit?ts=5fa547dd#
    this.smallScreen = 768;
    this.verySmallScreen = 500;
    this.blue = '4, 90, 141';
    this.red = '189, 0, 38';
    this.green = '127, 188, 65';
    this.brown = '153, 52, 4';
    this.chartBackgroundColor = '#FBFCFE';
    this.annualLineColor = '#000000';
    this.precipitationColor = '#5AB4AC';
    this.temperatureColor = '#FEB24C';
    this.heatingDegreeColor = '#DB1E1C';
    this.coolingDegreeColor = '#2276B4';
    this.bargap = 0.02; // 0.15;
    this.showLegend = true;
    this.legendBarLineX = window.innerWidth <= this.smallScreen ? 0 : 0.65;
    this.legendBarLineY = window.innerWidth <= this.smallScreen ? -0.15 : 1.125;
    this.font = 'Arial';
    this.zeroLineColor = '#000000';
    this.zerolinewidth = '1.25';
    this.gridColor = '#BFBFBF';
    this.SourceFontColor = '#000000';
    this.AverageAllFontColor = '#858585';
    this.AverageAllColor = '#858585';
    this.AverageMovingColor = '#858585';
    this.AverageAllWidth = '2'; //'6';
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
    // this.chartShowLine = props.chartShowLine;
    this.lineChart = props.chartLineChart;
    this.maxVal = Math.max(...this.yvals);
    this.minVal = Math.min(...this.yvals);
    this.shortTitle = SandboxGeneratePlotData.splitTitle(props.chartTitle);
    this.chartTitle = window.innerWidth <= this.smallScreen ? this.shortTitle : props.chartTitle;
    this.SmallScreenBreak = window.innerWidth <= this.smallScreen ? '<br>' : '';
    this.chartTitleX = window.innerWidth <= this.smallScreen ? 0.5 : 0.4;
    this.legnedText = props.legnedText;
    this.chartType = props.chartType;
    this.climatevariable = props.climatevariable;
    this.season = props.season;
    this.barColor = this.setChartColor(this.chartType);
    this.periodGroups = props.periodGroups ? props.periodGroups : 5;
    this.AverageMovingPeriod = 5;
    this.textAngle = window.innerWidth <= 1000 ? 90 : 0;
    this.dtick = window.innerWidth <= this.smallScreen ? 10 : 10;
    this.yValsSumByPeriod = this.yValsSumByPeriod();
    this.yValsAvgByPeriod = this.yValsAvgByPeriod();
    this.yValsMovingAverage = this.computeMovingAverage();
    this.xValsMovingAverage = this.movingAverageXValues();
    this.xValsPeriod = this.xValsPeriod();
    const sumAll = this.yValsSumAll();
    this.yValsSumAll = sumAll <= -50 ? undefined : sumAll;
    const avgAll = this.yValsAvgAll();
    this.yValsAvgAll = avgAll <= -50 ? 0 : avgAll;
    const min = this.minVal < 0 ? 0 : this.minVal;
    this.prettyRange = SandboxGeneratePlotData.pretty([min-2.1, this.maxVal+10]);
    this.yRange = [this.prettyRange[0], this.prettyRange[this.prettyRange.length - 1]];
    this.yAxisText = this.createYAxisText();
    this.legendPerText = this.createlegendPerText();
    this.legendEllapsedText = this.legendEllapsedText();
    this.averageTextUnits = this.averageTextUnits();
    // Years from 2021 to 2090
    // 2021, 2022, 2023, 2024, 
    this.xValuesProjections = [ 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090 ];
    // Lower boundary y-values ranging from 48 to 52.3
    // 48.00, 48.00, 48.00, 48.00, 48.00,
    this.yLowerProjections = [ 47.10, 47.94, 47.50, 47.32, 48.87, 48.34, 49.21, 48.25, 49.07, 49.02, 48.76, 49.28, 49.38, 48.69, 49.50, 48.56, 50.29, 48.46, 49.83, 49.63, 49.01, 49.92, 48.72, 49.68, 48.99, 50.07, 49.60, 50.45, 49.68, 49.83, 49.64, 50.92, 49.19, 49.83, 50.25, 50.04, 49.90, 50.27, 50.76, 50.85, 50.56, 50.28, 50.82, 50.68, 50.60, 50.90, 51.56, 51.50, 51.01, 50.74, 52.24, 51.65, 51.07, 51.79, 52.02, 51.22, 52.47, 52.09, 51.57, 52.30, 51.80, 52.08, 52.48, 52.11, 52.22, 52.09 ];
    this.yLowerProjections2 = [48.93, 48.81, 47.87, 48.94, 49.46, 49.85, 50.89, 49.73, 50.80, 50.17, 50.44, 49.99, 50.45, 49.71, 50.44, 50.84, 51.83, 50.89, 50.72, 50.85, 50.65, 50.92, 50.86, 50.99, 50.98, 50.80, 51.50, 50.87, 51.09, 50.39, 50.95, 51.68, 51.11, 51.90, 51.64, 51.21, 51.35, 51.27, 51.40, 51.63, 51.25, 51.19, 51.78, 51.09, 51.09, 51.65, 51.59, 51.45, 51.55, 53.22, 51.84, 51.23, 51.92, 52.26, 52.88, 51.74, 51.92, 51.87, 52.11, 52.27, 52.34, 52.41, 52.11, 52.47, 52.31, 52.29 ];

    // Upper boundary y-values ranging from 52.3 to 60
    // 54.44, 54.60, 54.70, 54.75,  
    this.yUpperProjections = [ 58.24, 58.20, 57.79, 57.07, 57.60, 57.01, 57.31, 57.91, 58.16, 57.39, 57.24, 57.83, 58.60, 58.21, 58.81, 58.24, 57.91, 58.27, 59.48, 58.83, 59.01, 59.55, 59.03, 59.17, 58.72, 60.05, 59.10, 59.58, 59.96, 60.06, 59.26, 59.60, 60.09, 60.12, 60.92, 60.17, 60.44, 60.23, 61.43, 60.46, 61.90, 60.69, 61.20, 62.10, 61.07, 61.49, 61.51, 61.33, 63.14, 62.71, 62.21, 62.44, 62.43, 62.26, 61.56, 62.50, 62.36, 62.87, 63.90, 63.22, 63.32, 63.01, 63.87, 64.55, 63.74, 63.60 ];
    this.yUpperProjections2 = [ 59.96, 59.87, 59.99, 58.90, 59.76, 58.91, 59.51, 59.86, 59.90, 59.80, 59.06, 62.47, 62.65, 59.35, 59.77, 59.81, 59.63, 59.77, 61.57, 61.83, 64.49, 60.77, 61.67, 61.93, 61.22, 61.77, 60.92, 61.46, 62.44, 62.71, 61.51, 62.34, 62.28, 63.63, 62.90, 62.86, 61.56, 63.74, 63.35, 63.14, 63.87, 63.99, 62.39, 63.55, 62.77, 63.75, 64.91, 63.88, 63.75, 64.14, 63.45, 63.82, 63.28, 63.72, 64.18, 65.19, 65.24, 64.77, 64.58, 64.99, 64.71, 65.60, 65.07, 65.20, 65.50, 65.06 ];

    this.middleProjections = [54.17, 54.17, 54.17, 54.17, 54.17, 54.28, 54.28, 54.28, 54.28, 54.28, 54.50, 54.50, 54.50, 54.50, 54.50, 54.90, 54.90, 54.90, 54.90, 54.90, 55.51, 55.51, 55.51, 55.51, 55.51, 55.95, 55.95, 55.95, 55.95, 55.95, 56.61, 56.61, 56.61, 56.61, 56.61, 57.34, 57.34, 57.34, 57.34, 57.34, 58.01, 58.01, 58.01, 58.01, 58.01, 58.42, 58.42, 58.42, 58.42, 58.42, 59.77, 59.77, 59.77, 59.77, 59.77, 60.35, 60.35, 60.35, 60.35, 60.35]
    // [ 54.17, 54.57, 54.15, 53.70, 54.73, 54.18, 54.76, 54.58, 55.12, 54.71, 54.50, 55.06, 55.49, 54.95, 55.66, 54.90, 55.60, 54.87, 56.16, 55.73, 55.51, 56.24, 55.38, 55.93, 55.36, 56.56, 55.85, 56.52, 56.32, 56.45, 55.95, 56.76, 56.14, 56.48, 57.09, 56.61, 56.67, 56.75, 57.60, 57.15, 57.73, 56.99, 57.51, 57.89, 57.34, 57.70, 58.04, 57.92, 58.58, 58.23, 58.72, 58.55, 58.25, 58.01, 57.89, 58.36, 58.42, 59.98, 60.24, 59.77, 59.81, 60.04, 60.68, 60.83, 60.48, 60.35 ];
  }

    addOneToArrays(arrays) {
      return arrays.map(array => array.map(num => num + 1));
    }

    makeProjectedShapes() {
      const shapes = this.middleProjections.map((value, index) => ({
        type: 'rect',
        layer: 'above',
        x0: this.xValuesProjections[index] - .5,  // Left edge of the bar
        x1: this.xValuesProjections[index] + .5,  // Right edge of the bar
        y0: 0,                   // Bottom edge of the bar
        y1: value,               // Height of the bar
        fillcolor: 'rgba(255, 209, 107, 0.5)',
        line: {
          width: 0
        }
      }));
      return shapes;
    }

    // temp to create path for projections example
    makePath2() {
      // Combine x and y coordinates for the polygon path
      const pathCoordinates = [];

      // Add lower boundary coordinates
      this.xValuesProjections.forEach((x, i) => {
        pathCoordinates.push(`${x},${this.yLowerProjections2[i]}`);
      });

      // Add upper boundary coordinates in reverse order to close the polygon
      for (let i = this.xValuesProjections.length - 1; i >= 0; i--) {
        pathCoordinates.push(`${this.xValuesProjections[i]},${this.yUpperProjections2[i]}`);
      }

      // Create the SVG path string
      const pathString = 'M' + pathCoordinates.join('L') + 'Z';
      return pathString;
  }

  // temp to create path for projections example
  makePath() {
      // Combine x and y coordinates for the polygon path
      const pathCoordinates = [];

      // const xValues = Array.from({ length: 70 }, (_, i) => 2025 + i);

      // // const getRandomInRange = (min, max) => Math.random() * (max - min) + min;
      // // const yLower = xValues.map((n, index) => {
      // //   if(index === 0) return 54.44
      // //   console.log(n, index) 
      // //   return getRandomInRange(51.5, 56.51) + (index/10);
      // //   }
      // // );

      // // const yUpper = xValues.map((n, index) => {
      // //   if(index === 0) return 54.44
      // //   console.log(n, index) 
      // //   return getRandomInRange(52.53, 50) - (index/10000);
      // //   }
      // // );

      // Add lower boundary coordinates
      this.xValuesProjections.forEach((x, i) => {
        pathCoordinates.push(`${x},${this.yLowerProjections[i]}`);
      });

      // Add upper boundary coordinates in reverse order to close the polygon
      for (let i = this.xValuesProjections.length - 1; i >= 0; i--) {
        pathCoordinates.push(`${this.xValuesProjections[i]},${this.yUpperProjections[i]}`);
      }

      // Create the SVG path string
      const pathString = 'M' + pathCoordinates.join('L') + 'Z';
      return pathString;
  }

  // set color for chart based on climate variable or chartType
  setChartColor(chartType) {
    switch (chartType) {
      case 'Precipitation':
        return this.precipitationColor;
      case 'Temperature':
        return this.temperatureColor;
      case 'CoolingDays':
        return this.coolingDegreeColor;
      case 'HeatingDays':
        return this.heatingDegreeColor;
      default:
        return this.temperatureColor;
    }
  }

  // default season text
  hoverTemplateSeasonText() {
    const sandboxHumanReadable = new SandboxHumanReadable();
    const seasonHumanReadable = sandboxHumanReadable.getSeasonPullDownText(this.season);
    if (this.season !== 'yearly') {
      if (this.season === 'ann') return 'annually';
      return seasonHumanReadable.toLowerCase().split(' ')[0].replace(':', '');
    }
    return 'year';
  }

  // default climate variable text
  hoverTemplateClimateVariableText() {
    // changes threshold wording to make more sense
    if (this.season !== 'yearly') return this.climatevariable.toLowerCase();
    return this.climatevariable.toLowerCase().replace('precipitation', 'precipitation')
      .replace('minimum', 'the minimum')
      .replace('maximum', 'the maximum');
  }

  // creaete prefix for hover text to deal with seasonal data
  //  seasonal data also has annual data so the wording is hard to deal with
  //  and one word to work for it all was not working
  hoverTemplateSeasonTextPrefix() {
    // seasonal data
    if (this.season !== 'yearly') {
      // annual season data
      if (this.season === 'ann') return '';
      return 'during the';
    }
    // default
    return 'for the';
  }

  // creates units days, °F, " for annotation on Average line
  textUnitsWords() {
    // seasonal units for inches of precip and degrees farhnheit
    if (this.season !== 'yearly') {
      return this.chartType === 'Precipitation' ? 'inches' : '°F';
    }
    // threshold which is days in the regions locatipon
    if (this.season === 'yearly') {
      return 'days';
    }
    // deault to days
    return 'days';
  }

  // creates units days, °F, " for annotation on Average line
  averageTextUnits() {
    // seasonal units for inches of precip and degrees farhnheit
    if (this.season !== 'yearly') {
      return this.chartType === 'Precipitation' ? '"' : '°F';
    }
    // threshold which is days in the regions locatipon
    if (this.season === 'yearly') {
      return 'days';
    }
    // deault to days
    return 'days';
  }

  // hover text for the yearly line
  yearLineText(x, y) {
    const seasonTextPrefix = this.hoverTemplateSeasonTextPrefix();
    const seasonText = this.hoverTemplateSeasonText();
    const climateVariableText = this.hoverTemplateClimateVariableText().replace('°f', '°F');
    const unitText = this.averageTextUnits;
    // season sentence
    if (this.season !== 'yearly') return ` In %{x} the ${climateVariableText}${this.SmallScreenBreak} was %{y:0.2f} ${unitText} ${seasonTextPrefix} ${seasonText} <extra></extra>`.replace(/ {2}/g, ' ');
    // threshold and default sentence
    return ` In %{x} there was an average of %{y:0.2f}${this.SmallScreenBreak} ${climateVariableText} <extra></extra>`.replace(/ {2}/g, ' ');
  }

  // hover text for year bar
  yearBarText(x, y) {
    const seasonTextPrefix = this.hoverTemplateSeasonTextPrefix();
    const seasonText = this.hoverTemplateSeasonText();
    const climateVariableText = this.hoverTemplateClimateVariableText();
    const unitText = this.averageTextUnits;
    // season sentence
    if (this.season !== 'yearly') return ` In %{x} the ${climateVariableText}${this.SmallScreenBreak} was %{y:0.2f}${unitText} ${seasonTextPrefix} ${seasonText}   <extra></extra>`.replace(/ {2}/g, ' ');
    // threshold and default sentence
    return ` In %{x} there were an average of %{y:0.2f}${this.SmallScreenBreak} ${climateVariableText} <extra></extra>`.replace(/ {2}/g, ' ');
  }

  // hover text for average bar
  averageBarText(x, y, customdata) {
    const seasonTextPrefix = this.hoverTemplateSeasonTextPrefix();
    const seasonText = this.hoverTemplateSeasonText();
    const climateVariableText = this.hoverTemplateClimateVariableText().replace('°f', '°F');
    const unitText = this.averageTextUnits;
    // season sentence
    if (this.season !== 'yearly') return ` Between %{customdata} the ${climateVariableText}${this.SmallScreenBreak} was %{y:0.2f}${unitText} ${seasonTextPrefix} ${seasonText} <extra></extra>`.replace(/ {2}/g, ' ');
    // threshold and default sentence
    return ` Between the years %{customdata} there were %{y:0.2f}${this.SmallScreenBreak} ${climateVariableText} <extra></extra>`.replace(/ {2}/g, ' ');
  }

  // hover text for average line
  averageLineText(x, y, customdata) {
    const seasonTextPrefix = this.hoverTemplateSeasonTextPrefix();
    const seasonText = this.hoverTemplateSeasonText();
    const climateVariableText = this.hoverTemplateClimateVariableText();
    const unitText = this.averageTextUnits;
    // season sentence
    if (this.season !== 'yearly') return ` Between %{customdata} the ${climateVariableText}${this.SmallScreenBreak} was %{y:0.2f}${unitText} ${seasonTextPrefix} ${seasonText} <extra></extra>`.replace(/ {2}/g, ' ');
    return ` Between %{customdata} there were %{y:0.2f}${this.SmallScreenBreak} ${climateVariableText} ${seasonTextPrefix} ${seasonText} <extra></extra>`.replace(/ {2}/g, ' ');
  }

  // hover text for moving average line
  movingAverageLineText(x, y, customdata) {
    const seasonTextPrefix = this.hoverTemplateSeasonTextPrefix();
    const seasonText = this.hoverTemplateSeasonText();
    const climateVariableText = this.hoverTemplateClimateVariableText();
    const unitText = this.averageTextUnits;
    // season sentence
    if (this.season !== 'yearly') return ` Between %{customdata} the ${climateVariableText}${this.SmallScreenBreak} was %{y:0.2f}${unitText} ${seasonTextPrefix} ${seasonText} <extra></extra>`.replace(/ {2}/g, ' ');
    return ` Between %{customdata} there were %{y:0.2f}${this.SmallScreenBreak}${climateVariableText} ${seasonTextPrefix} ${seasonText} <extra></extra>`.replace(/ {2}/g, ' ');
  }

  // creates legend text in parentheses
  legendEllapsedText() {
    // seasonal legend text
    if (this.season !== 'yearly') {
      const seasonText = this.hoverTemplateSeasonText();
      const unitText = this.textUnitsWords();
      const legendPerText = `${unitText} ${seasonText.split(' ')[0].toLowerCase()}`;
      return legendPerText;
    }
    // threshold legend text
    if (this.season === 'yearly') {
      const legendPerText = 'days';
      return legendPerText;
    }
    // default legend text
    return 'days';
  }

  // creates legend per text
  //  this is the per year or per season
  createlegendPerText() {
    if (this.season !== 'yearly') {
      const seasonText = this.hoverTemplateSeasonText();
      // seasonal prefix legend text
      let fortext = 'for ';
      // seasonal when annual prefix legend text
      if (this.season === 'ann') {
        fortext = '';
      }
      const legendPerText = `${fortext}${seasonText.split(' ')[0].toLowerCase()}`;
      return legendPerText;
    }
    // threshold prefix legend text
    if (this.season === 'yearly') {
      const legendPerText = 'per year';
      return legendPerText;
    }
    // default prefix legend text
    return 'per year';
  }

  // creates y axis text
  createYAxisText() {
    // seasonal y axis text
    if (this.season !== 'yearly') {
      const axisText = this.chartType === 'Precipitation' ? 'Inches' : 'Temperature (°F)';
      return axisText;
    }
    // threshold y axis text
    if (this.season === 'yearly') {
      const axisText = 'Days';
      return axisText;
    }
    // default y axis text
    return 'Days';
  }

  // splits chart title string into parts so its truncated
  // on small screens
  static splitTitle(title) {
    if (!title) return '';
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
  }

  // some regions-locations have 0 for all data and that is okay but we need to warn
  // user so they don't think its an error
  isAllZeros() {
    if (this.maxVal === 0 && this.minVal === 0) {
      return true;
    }
    return false;
  }

  // some regions-locations have no data or -9999 need
  // to check if the region or location has data and is so return false
  // so we can pass an message to user
  hasData() {
    if ((Number.isNaN(this.maxVal) || Number.isNaN(this.minVal)) ||
         (this.maxVal === -999 && this.minVal === -999) ||
         (this.maxVal === 0 && this.minVal === -999)) {
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
    const period = this.AverageMovingPeriod;
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
    const period = this.AverageMovingPeriod;
    const halfPeriod = Math.floor(this.periodGroups / 2);
    const movingAveragesX = [];

    for (let x = (period - halfPeriod) - 1; x - period - 1 < data.length; x += 1) {
      movingAveragesX.push(data[x]);
    }
    return movingAveragesX;
  }

  // creates the x values for each period for the custom hover template
  xValsAverageBarHoverText() {
    let count = 0;
    const yValsPeriodAll = this.xvals.map((value, index) => { // eslint-disable-line
      // return value
      if (index === 0) {
        const plus = value + (this.periodGroups - 1);
        const tickText = `${value}—${plus.toString().slice(0)}`;
        count += 1;
        return tickText;
      }
      if (count === (this.periodGroups)) {
        count = 0;
        const plus = value + (this.periodGroups - 1);
        const tickText = `${value}—${plus.toString().slice(0)}`;
        count += 1;
        return tickText;
      }
      count += 1;
    });
    return yValsPeriodAll.filter((value) => value !== undefined);
  }

  // creates the y values for each period
  xValsPeriod() {
    let count = 0;
    const halfPeriod = Math.floor(this.periodGroups / 2);
    const yValsPeriodAll = this.xvals.map((value, index) => { // eslint-disable-line
      // return value
      if (index === 0) {
        return value <= -50 ? undefined : value + halfPeriod;
      }
      if (count === (this.periodGroups - 1)) {
        count = 0;
        return value <= -50 ? undefined : value + halfPeriod;
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
        returnAvg = peroidSum / count;
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

  // there are cases when the chart data needs to be zero out
  zeroOutChartData() {
    const zeroValue = 0;
    this.yvals = [zeroValue];
    this.yValsSumByPeriod = [zeroValue];
    this.yValsAvgByPeriod = [zeroValue];
    this.yRange = [0, 4];
    this.yValsSumAll = 0.00000001;
    this.yValsAvgAll = 0.00000001;
  }

  getData() {
    // remove bad data so chart resets to all zeros
    if (!this.hasData() || this.isAllZeros()) {
      this.zeroOutChartData();
    }

    if (this.maxVal === -Infinity) return [{}];

    // switch for handling which variable is the line chart
    // for now its yearly, period average (defaults to 5), or
    // period moving average (defaults to 5).
    switch (this.lineChart) {
      case 'year':
        // yearly the line chart average is the bar chart
        return [this.traceAverageBar(), this.traceYearlyLine()];
      case 'avg':
        // average the line chart yearly is the bar chart
        return [this.traceYearlyBar(), this.traceAverageLine()];
      case 'mavg':
        // moving average the line chart yearly is the bar chart
        return [this.traceYearlyBar(), this.traceMovingAverageLine()];
      default:
        // yearly the line chart average is the bar chart
        return [this.traceAverageBar(), this.traceYearlyLine()];
    }
  }

  // get the chart layout
  getLayout() {
    // switch for handling layout of chart depending on what variable is the line
    // for now its yearly, period average (defaults to 5), or
    // period moving average (defaults to 5).
    switch (this.lineChart) {
      case 'year':
        // yearly the line chart average is the bar chart
        return this.layoutAverageBar();
      case 'avg':
        // average the line chart yearly is the bar chart
        return this.layoutYearBar();
      case 'mavg':
        // moving average the line chart yearly is the bar chart
        return this.layoutYearBar();
      default:
        // yearly the line chart average is the bar chart
        return this.layoutAverageBar();
    }
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
      mode: 'lines+markers',
      name: `5—Year Average (${this.legendEllapsedText})`,
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
      hoverinfo: 'x+y',
      customdata: this.xValsAverageBarHoverText(),
      hovertemplate: this.averageBarText(),
      legendgroup: 1,
      orientation: 'v'
    };
  }

  // trace for year when average is a bar
  traceYearlyLine() {
    return {
      uid: SandboxGeneratePlotData.uuidv(),
      mode: 'lines+markers',
      name: `Average ${this.textUnitsWords()} ${this.legendPerText}`,
      type: 'scatter',
      // visible: this.chartShowLine,
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
      connectgaps: true,
      hoverinfo: 'x+y',
      hovertemplate: this.yearLineText()
    };
  }

  // trace for year when year is a bar
  traceYearlyBar() {
    return {
      uid: SandboxGeneratePlotData.uuidv(),
      mode: 'lines+markers',
      name: `Average ${this.textUnitsWords()} ${this.legendPerText}`,
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
      orientation: 'v',
      hovertemplate: this.yearBarText()
    };
  }

  // trace for averages when year is a bar
  traceMovingAverageLine() {
    return {
      uid: SandboxGeneratePlotData.uuidv(),
      mode: 'lines+markers',
      name: `5—Year moving average (${this.legendEllapsedText})`,
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
      connectgaps: true,
      customdata: this.xValsMovingAverage.map((val) => `${val - Math.floor(this.periodGroups / 2)}—${(val - Math.floor(this.periodGroups / 2)) + this.AverageMovingPeriod}`),
      hoverinfo: 'x+y',
      hovertemplate: this.movingAverageLineText()
    };
  }

  // trace for averages when year is a bar
  traceAverageLine() {
    return {
      uid: SandboxGeneratePlotData.uuidv(),
      mode: 'lines+markers',
      name: `5—Year average (${this.legendEllapsedText})`,
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
      connectgaps: true,
      customdata: this.xValsPeriod.map((val) => `${val - Math.floor(this.periodGroups / 2)}—${(val - Math.floor(this.periodGroups / 2)) + this.periodGroups - 1}`),
      hoverinfo: 'x+y',
      hovertemplate: this.averageLineText()
    };
  }

  // layout  when average is a bar
  layoutAverageBar() {
    return {
      displayModeBar: false,
      showlegend: this.showLegend,
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
        x: this.chartTitleX
      },
      xaxis: {
        type: 'linear',
        // for data
        // range: [this.xmin - 5, this.xmax + 5],
        // for projection example
        range: [this.xmin - 5, 2095],
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
        dtick: this.dtick, // 10
        tick0: 0,
        tickangle: this.textAngle,
        tickformat: '',
        tickprefix: '',
        nticks: this.periodGroups,
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
          text: this.yAxisText,
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
          plot_bgcolor: this.chartBackgroundColor,
          paper_bgcolor: this.chartBackgroundColor
        }
      },
      annotations: [
      //   {
      //   xref: 'x',
      //   yref: 'y',
      //   x: this.xmax + 1,
      //   xanchor: 'left',
      //   y: this.yRange[0] + 0.33,
      //   yanchor: 'top',
      //   text: 'Data Source X',
      //   showarrow: false,
      //   font: {
      //     family: this.font,
      //     size: this.AverageAllFontSize,
      //     color: this.AverageAllFontColor
      //   }
      // },
        {
          xref: 'x',
          yref: 'y',
          // for data
          // x: this.xmax + 2.5,
          // for projection example
          x: 2090,
          y: this.yValsAvgAll.toFixed(1),
          text: `Average ${this.yValsAvgAll.toFixed(1)} ${this.averageTextUnits}`,
          showarrow: true,
          arrowhead: 0, //7,
          arrowsize: 0, //2,
          arrowwidth: 0, //2,
          arrowcolor: this.AverageAllColor,
          ay: -100,
          ax: 10,
          bgcolor: '#ffffff',
          font: {
            family: this.font,
            size: this.AverageAllFontSize,
            color: this.AverageAllFontColor
          }
        }
      ],
      shapes: [
      {
        type: 'path',
        layer: 'above',
        path: this.makePath2(),
        fillcolor: 'rgba(0, 0, 255, 0.5)', // Semi-transparent blue fill
        line: { color: 'blue' }
      },
      {
        type: 'path',
        layer: 'above',
        path: this.makePath(),
        fillcolor: 'rgba(255, 0, 0, 0.5)', // Semi-transparent red fill
        line: { color: 'red' }
      },
      ...this.makeProjectedShapes(),
      {
        type: 'line',
        layer: 'above',
        x0: this.xmin - 5,
        y0: this.yValsAvgAll.toFixed(1),
        // for data
        // x1: this.xmax + 5,
        // for projection example
        x1: 2095,
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
        // x1: this.xmax + 5,
        x1: 2095,
        y1: this.yRange[0],
        line: {
          color: this.zeroLineColor,
          width: this.zerolinewidth
        }
      }
    ]
    };
  }

  // layout  when year is a bar
  layoutYearBar() {
    return {
      displayModeBar: false,
      showlegend: this.showLegend,
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
        x: this.chartTitleX
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
        dtick: this.dtick,
        tick0: 0,
        tickangle: this.textAngle,
        tickformat: '',
        tickprefix: '',
        nticks: this.periodGroups,
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
          text: this.yAxisText,
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
          hovermode: 'x',
          plot_bgcolor: this.chartBackgroundColor,
          paper_bgcolor: this.chartBackgroundColor
        }
      },
      annotations: [
      // {
      //   xref: 'x',
      //   yref: 'y',
      //   x: this.xmax + 1,
      //   xanchor: 'left',
      //   y: this.yRange[0] + 0.33,
      //   yanchor: 'top',
      //   text: 'Data Source X',
      //   showarrow: false,
      //   font: {
      //     family: this.font,
      //     size: this.AverageAllFontSize,
      //     color: this.AverageAllFontColor
      //   }
      // },
        {
          xref: 'x',
          yref: 'y',
          x: this.xmax + 2.5,
          y: this.yValsAvgAll.toFixed(1),
          text: `Average ${this.yValsAvgAll.toFixed(1)} ${this.averageTextUnits}`,
          showarrow: true,
          arrowhead: 7,
          arrowsize: 2,
          arrowwidth: 2,
          arrowcolor: this.AverageAllColor,
          ay: -100,
          ax: 35,
          bgcolor: '#ffffff',
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
