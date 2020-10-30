export default class SandboxHumanReadable {
  constructor(props){
    this.climateVariableValue = props
    this.climateVariableValueNames = [
      {
        value: '1inch',
        pullDownText: 'Days with Precipitation Greater than 1 inch',
        chartTitle: 'Number of Days with Precipitation Greater than 1 inch'
      },
      {
        value: '2inch',
        pullDownText: 'Days with Precipitation Greater than 2 inches',
        chartTitle: 'Number of Days with Precipitation Greater than 2 inches'
      },
      {
        value: '3inch',
        pullDownText: 'Days with Precipitation Greater than 3 inches',
        chartTitle: 'Number of Days with Precipitation Greater than 3 inches'
      },
      {
        value: '4inch',
        pullDownText: 'Days with Precipitation Greater than 4 inches',
        chartTitle: 'Number of Days with Precipitation Greater than 4 inches'
      },
      {
        value: 'tmax0F',
        pullDownText: 'Days with Maximum Temperature Below 0°F',
        chartTitle: 'Number of Days with Maximum Temperature Below 0°F'
      },
      {
        value: 'tmax100F',
        pullDownText: 'Days with Maximum Temperature Above 100°F',
        chartTitle: 'Number of Days with Maximum Temperature Above 100°F'
      },
      {
        value: 'tmax32F',
        pullDownText: 'Days with Maximum Temperature Below 32°F',
        chartTitle: 'Number of Days with Maximum Temperature Below 32°F'
      },
      {
        value: 'tmax90F',
        pullDownText: 'Days with Maximum Temperature Above 100°F',
        chartTitle: 'Number of Days with Maximum Temperature Above 100°F'
      },
      {
        value: 'tmax95F',
        pullDownText: 'Days with Maximum Temperature Above 95°F',
        chartTitle: 'Number of Days with Maximum Temperature Above 95°F'
      },
      {
        value: 'tmin0F',
        pullDownText: 'Days with Minimum Temperature Below 0°F',
        chartTitle: 'Number of Days with Minimum Temperature Below 0°F'
      },
      {
        value: 'tmin32F',
        pullDownText: 'Days with Minimum Temperature Below 32°F',
        chartTitle: 'Number of Days with Minimum Temperature Below 32°F'
      },
      {
        value: 'tmin70F',
        pullDownText: 'Days with Minimum Temperature Above 70°F',
        chartTitle: 'Number of Days with Minimum Temperature Above 70°F'
      },
      {
        value: 'tmin75F',
        pullDownText: 'Days with Minimum Temperature Above 75°',
        chartTitle: 'Number of Days with Minimum Temperature Above 75°'
      },
      {
        value: 'tmin80F',
        pullDownText: 'Days with Minimum Temperature Above 80°F',
        chartTitle: 'Number of Days with Minimum Temperature Above 80°F'
      }
    ]

    this.LocationNames = [
      {
        value: 'AK',
        pullDownText: 'Alaska'
      },
      {
        value: 'AL',
        pullDownText: 'Aalabama'
      },
      {
        value: 'AZ',
        pullDownText: 'Arizona'
      },
      {
        value: 'AR',
        pullDownText: 'Arkansas'
      },
      {
        value: 'CA',
        pullDownText: 'California'
      },
      {
        value: 'CO',
        pullDownText: 'Colorado'
      },
      {
        value: 'CT',
        pullDownText: 'Connecticut'
      },
      {
        value: 'DE',
        pullDownText: 'Delaware'
      },
      {
        value: 'FL',
        pullDownText: 'Florida'
      },
      {
        value: 'GA',
        pullDownText: 'Georgia'
      },
      {
        value: 'HI',
        pullDownText: 'Hawai\'i'
      },
      {
        value: 'ID',
        pullDownText: 'Idaho'
      },
      {
        value: 'IL',
        pullDownText: 'Illinois'
      },
      {
        value: 'IN',
        pullDownText: 'Indiana'
      },
      {
        value: 'IA',
        pullDownText: 'Iowa'
      },
      {
        value: 'KS',
        pullDownText: 'Kansas'
      },
      {
        value: 'KY',
        pullDownText: 'Kentucky'
      },
      {
        value: 'LA',
        pullDownText: 'Louisiana'
      },
      {
        value: 'ME',
        pullDownText: 'Maine'
      },
      {
        value: 'MD',
        pullDownText: 'Maryland'
      },
      {
        value: 'MA',
        pullDownText: 'Massachusetts'
      },
      {
        value: 'MI',
        pullDownText: 'Michigan'
      },
      {
        value: 'MN',
        pullDownText: 'Minnesota'
      },
      {
        value: 'MS',
        pullDownText: 'Mississippi'
      },
      {
        value: 'MO',
        pullDownText: 'Missouri'
      },
      {
        value: 'MT',
        pullDownText: 'Montana'
      },
      {
        value: 'NE',
        pullDownText: 'Nebraska'
      },
      {
        value: 'NV',
        pullDownText: 'Nevada'
      },
      {
        value: 'NH',
        pullDownText: 'New Hampshire'
      },
      {
        value: 'NJ',
        pullDownText: 'New Jersey'
      },
      {
        value: 'NM',
        pullDownText: 'New Mexico'
      },
      {
        value: 'NY',
        pullDownText: 'New York'
      },
      {
        value: 'NC',
        pullDownText: 'North Carolina'
      },
      {
        value: 'ND',
        pullDownText: 'North Dakota'
      },
      {
        value: 'OH',
        pullDownText: 'Ohio'
      },
      {
        value: 'OK',
        pullDownText: 'Oklahoma'
      },
      {
        value: 'OR',
        pullDownText: 'Oregon'
      },
      {
        value: 'PA',
        pullDownText: 'Pennsylvania'
      },
      {
        value: 'PR',
        pullDownText: 'Puerto Rico'
      },
      {
        value: 'RI',
        pullDownText: 'Rhode Island'
      },
      {
        value: 'SC',
        pullDownText: 'South Carolina'
      },
      {
        value: 'SD',
        pullDownText: 'South Dakota'
      },
      {
        value: 'TN',
        pullDownText: 'Tennessee'
      },
      {
        value: 'TX',
        pullDownText: 'Texas'
      },
      {
        value: 'UT',
        pullDownText: 'Utah'
      },
      {
        value: 'VT',
        pullDownText: 'Vermont'
      },
      {
        value: 'VA',
        pullDownText: 'Virginia'
      },
      {
        value: 'VI',
        pullDownText: 'Virgin Islands'
      },
      {
        value: 'WA',
        pullDownText: 'Washington'
      },
      {
        value: 'WV',
        pullDownText: 'West Virginia'
      },
      {
        value: 'WI',
        pullDownText: 'Wisconsin'
      },
      {
        value: 'WY',
        pullDownText: 'Wyoming'
      },
      {
        value: 'National',
        pullDownText: 'National'
      },
      {
        value: 'Northeast',
        pullDownText: 'Northeast'
      },
      {
        value: 'Southeast',
        pullDownText: 'Southeast'
      },
      {
        value: 'Midwest',
        pullDownText: 'Midwest'
      },
      {
        value: 'Northern Great Plains',
        pullDownText: 'Northern Great Plains'
      },
      {
        value: 'Northwest',
        pullDownText: 'Northwest'
      },
      {
        value: 'Southwest',
        pullDownText: 'Southwest'
      },
      {
        value: 'Southern Great Plains',
        pullDownText: 'Southern Great Plains'
      },
      {
        value: 'Alaska',
        pullDownText: 'Alaska'
      },
      {
        value: 'Hawaii',
        pullDownText: 'Hawai\'i'
      },
      {
        value: 'Puerto Rico',
        pullDownText: 'Puerto Rico'
      }
    ]
  }

  getChartTitle (props) {
    if (!props.climatevariable) return ''
    const climateVariableValueNames = this.climateVariableValueNames;
    const newValue = climateVariableValueNames.filter(variables => variables.value === props.climatevariable);
    let chartTitle = newValue[0].chartTitle;
    if (props.region === 'national') chartTitle = `${chartTitle} (National)`;
    if (props.region === 'regional') chartTitle = `${chartTitle} (NCA Region ${props.titleLocation})`;
    if (props.region === 'state') chartTitle = `${chartTitle} (${props.titleLocation})`;
    return chartTitle;
  }

  getClimateVariablePullDownText (value) {
    if (!value) return ''
    const climateVariableValueNames = this.climateVariableValueNames;
    const newValue = climateVariableValueNames.filter(variables => variables.value === value);
    return newValue[0].pullDownText;
  }

  getLocationDownText (value) {
    if (!value) return ''
    const climateVariableValueNames = this.LocationNames;
    const newValue = climateVariableValueNames.filter(variables => variables.value.toUpperCase() === value.toUpperCase());
    let returnValue = value
    if (newValue[0]) returnValue = newValue[0].pullDownText
    return returnValue;
  }
}