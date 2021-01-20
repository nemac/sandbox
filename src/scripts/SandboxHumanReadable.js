import SandoxPeriodsHumanReadable from '../configs/SandoxPeriodsHumanReadable';
import SandoxClimateVariableValueNamesHumanReadable from '../configs/SandoxClimateVariableValueNamesHumanReadable';
import SandoxLocationNamesHumanReadable from '../configs/SandoxLocationNamesHumanReadable';

export default class SandboxHumanReadable {
  constructor(props) {
    this.climateVariableValue = props;
    this.peroids = SandoxPeriodsHumanReadable();
    this.climateVariableValueNames = SandoxClimateVariableValueNamesHumanReadable();
    this.LocationNames = SandoxLocationNamesHumanReadable();
  }

  getChartTitle(props) {
    if (!props.climatevariable) return '';
    const climateVariableValueNames = this.climateVariableValueNames;
    const newValue = climateVariableValueNames.filter(
      (variables) => variables.value === props.climatevariable
    );
    let chartTitle = newValue[0].chartTitle;
    if (props.region === 'National') chartTitle = `${chartTitle} (National)`;
    if (props.region === 'Regional') chartTitle = `${chartTitle} (NCA Region ${props.titleLocation})`;
    if (props.region === 'State') chartTitle = `${chartTitle} (${props.titleLocation})`;
    return chartTitle;
  }

  getClimateVariablePullDownText(value) {
    if (!value) return '';
    const climateVariableValueNames = this.climateVariableValueNames;
    const newValue = climateVariableValueNames.filter(
      (variables) => variables.value === value
    );
    return newValue[0].pullDownText;
  }

  getPeriodPullDownText(value) {
    if (!value) return '';
    const periodValueNames = this.peroids;
    const newValue = periodValueNames.filter(
      (variables) => variables.value === value
    );
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
