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

  getChartTitle(props) {
    if (!props.climatevariable) return '';
    const climateVariableValueNames = this.climateVariableValueNames;
    const newValue = climateVariableValueNames.filter(
      (variables) => variables.value === props.climatevariable && variables.season === props.chartDataSeason
    );
    let chartTitle = newValue[0].chartTitle;
    if (props.region === 'National') chartTitle = `${chartTitle} (National)`;
    if (props.region === 'Regional') chartTitle = `${chartTitle} (NCA Region ${props.titleLocation})`;
    if (props.region === 'State') chartTitle = `${chartTitle} (${props.titleLocation})`;
    return chartTitle;
  }

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
      return defaultValue[0].pullDownText
    }

    return newValue[0].pullDownText;
  }

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
      return defaultValue[0].pullDownText
    }
    return newValue[0].pullDownText;
  }

  getPeriodRange(value) {
    if (!value) return '';
    const periodValueNames = this.peroids;
    const newValue = periodValueNames.filter(
      (variables) => variables.value === value
    );
    return newValue[0].range;
  }

  getSeasonPullDownText(value) {
    if (!value) return '';
    const seasonValueNames = this.seasons;
    const newValue = seasonValueNames.filter(
      (variables) => variables.value === value
    );
    return newValue[0].pullDownText;
  }


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
