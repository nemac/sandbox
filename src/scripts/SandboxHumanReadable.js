import SandoxPeriodsHumanReadable from '../configs/SandoxPeriodsHumanReadable';
import SandoxClimateVariableValueNamesHumanReadable from '../configs/SandoxClimateVariableValueNamesHumanReadable';
import SandoxLocationNamesHumanReadable from '../configs/SandoxLocationNamesHumanReadable';
import SandoxSeasonHumanReadable from '../configs/SandoxSeasonHumanReadable';

export default class SandboxHumanReadable {
  constructor(props) {
    this.climateVariableValue = props;
    this.peroids = SandoxPeriodsHumanReadable();
    this.climateVariableValueNames = SandoxClimateVariableValueNamesHumanReadable();
    this.LocationNames = SandoxLocationNamesHumanReadable();
    this.seasons = SandoxSeasonHumanReadable();
  }

  // creates chart title
  getChartTitle(props) {
    if (!props.climatevariable) return '';
    const climateVariableValueNames = this.climateVariableValueNames;
    const newValue = climateVariableValueNames.filter(
      (variables) => variables.value ===
        props.climatevariable && variables.season === props.chartDataSeason
    );
    let chartTitle = newValue[0].chartTitle;
    if (props.region === 'National') chartTitle = `${chartTitle} (National)`;
    if (props.region === 'Regional') chartTitle = `${chartTitle} (NCA Region ${props.titleLocation})`;
    if (props.region === 'State') chartTitle = `${chartTitle} (${props.titleLocation})`;
    return chartTitle;
  }

  // creates pulldown text for climate variables in a format that makes more
  // sense for a human rather than 1inch
  getClimateVariablePullDownText(value, season) {
    if (!value) return '';
    if (!season) return '';
    const climateVariableValueNames = this.climateVariableValueNames;

    // find matching climate variables
    const newValue = climateVariableValueNames.filter((variables) => {
      const returnValue = variables.value === value &&
        variables.season === season;
      return returnValue;
    });

    // if nothing found matching the climate variable then use the first climate variable
    // this happens when the season is changed between yearly and not yearly
    if (newValue.length === 0) {
      const defaultValue = climateVariableValueNames.filter((variables) => {
        const returnValue = variables.season === season;
        return returnValue;
      });
      return defaultValue[0].pullDownText;
    }

    return newValue[0].pullDownText;
  }

  // makes period pulldown text more consistent and readable
  getPeriodPullDownText(value, season) {
    if (!value) return '';
    if (!season) return '';
    const periodValueNames = this.peroids;
    // find matching periods
    const newValue = periodValueNames.filter((variables) => {
      const returnValue = variables.value === value &&
        variables.season === season;
      return returnValue;
    });

    // if nothing found matching the period then use the first period
    // this happens when the season is changed between yearly and not yearly
    if (newValue.length === 0) {
      const defaultValue = periodValueNames.filter((variables) => {
        const returnValue = variables.season === season;
        return returnValue;
      });
      return defaultValue[0].pullDownText;
    }
    return newValue[0].pullDownText;
  }

  // creates the range for the period bassed on whats actually in data files
  // this is used in the plotly charting library
  getPeriodRange(value) {
    if (!value) return '';
    const periodValueNames = this.peroids;
    const newValue = periodValueNames.filter(
      (variables) => variables.value === value
    );
    return newValue[0].range;
  }

  // creates pulldown text for season in a format that makes more
  // sense for a human rather than djf or winer december janruary february
  getSeasonPullDownText(value) {
    if (!value) return '';
    const seasonValueNames = this.seasons;
    const newValue = seasonValueNames.filter(
      (variables) => variables.value === value
    );
    return newValue[0].pullDownText;
  }

  // creates pulldown text for lcoation in a format that makes more
  // sense for a human rather than NC we show north carolina
  getLocationDownText(value) {
    if (!value) return '';
    const locationValueNames = this.LocationNames;
    const newValue = locationValueNames.filter(
      (variables) => variables.value.toUpperCase() === value.toUpperCase()
    );
    let returnValue = value;
    if (newValue[0]) returnValue = newValue[0].pullDownText;
    return returnValue;
  }
}
