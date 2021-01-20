export default class SandboxDataControl {
  constructor(props) {
    this.config = [
      {
        value: 'AK',
        region: 'State',
        defaultPeriod: '1950-current',
        inValidClimateVariables: [{
          climatevariable: '1inch',
          period: '1900-current'
        },
        {
          climatevariable: '2inch',
          period: '1900-current'
        },
        {
          climatevariable: '3inch',
          period: '1900-current'
        },
        {
          climatevariable: '4inch',
          period: '1900-current'
        }],
        inValidPeriods: [{}]
      },
      {
        value: 'AL',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'AZ',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'AR',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'CA',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'CO',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'CT',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'DE',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'FL',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'GA',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'HI',
        region: 'State',
        defaultPeriod: '1950-current',
        inValidClimateVariables: [{
          climatevariable: '1inch',
          period: '1900-current'
        },
        {
          climatevariable: '2inch',
          period: '1900-current'
        },
        {
          climatevariable: '3inch',
          period: '1900-current'
        },
        {
          climatevariable: '4inch',
          period: '1900-current'
        }],
        inValidPeriods: [{}]
      },
      {
        value: 'ID',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'IL',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'IN',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'IA',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'KS',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'KY',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'LA',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'ME',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'MD',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'MA',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'MI',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'MN',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'MS',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'MO',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'MT',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'NE',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'NV',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'NH',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'NJ',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'NM',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'NY',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'NC',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'ND',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'OH',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'OK',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'OR',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'PA',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'PR',
        region: 'State',
        defaultPeriod: '1950-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'RI',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'SC',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'SD',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'TN',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'TX',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'UT',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'VT',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'VA',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'VI',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'WA',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'WV',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'WI',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'WY',
        region: 'State',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'National',
        region: 'National',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'Northeast',
        region: 'Regional',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'Southeast',
        region: 'Regional',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'Midwest',
        region: 'Regional',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'Northern Great Plains',
        region: 'Regional',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'Northwest',
        region: 'Regional',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'Southwest',
        region: 'Regional',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'Southern Great Plains',
        region: 'Regional',
        defaultPeriod: '1900-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'Alaska',
        region: 'Regional',
        defaultPeriod: '1950-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'Hawaii',
        region: 'Regional',
        defaultPeriod: '1950-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      },
      {
        value: 'Puerto Rico',
        region: 'Regional',
        defaultPeriod: '1950-current',
        inValidClimateVariables: [{}],
        inValidPeriods: [{}]
      }
    ];
  }

  // check if location + time peroid has data
  getDefaultPeriod(props) {
    const { locationLimit } = props;
    if (!locationLimit) return [{}];
    // limit config based on location
    const config = this.config.filter((data) => data.value === locationLimit);
    return config[0].defaultPeriod;
  }

  // check invalid variables so we can exclude them if needed
  getInValidClimateVariables(props) {
    const { locationLimit } = props;
    if (!locationLimit) return [{}];

    // limit config based on location
    const config = this.config.filter((data) => data.value === locationLimit);
    return config[0].inValidClimateVariables;
  }

  // check invalid pariods so we can exclude them if needed
  getInValidPeriods(props) {
    const { locationLimit } = props;
    if (!locationLimit) return [{}];

    // limit config based on location
    const config = this.config.filter((data) => data.value === locationLimit);
    return config[0].inValidPeriods;
  }
}
