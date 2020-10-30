export default class SandboxClimateVariable {
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
  }

  getChartTitle (value) {
    if (!value) return ''
    const climateVariableValueNames = this.climateVariableValueNames;
    const newValue = climateVariableValueNames.filter(variables => variables.value === value);
    return newValue[0].chartTitle;
  }

  getPullDownText (value) {
    if (!value) return ''
    const climateVariableValueNames = this.climateVariableValueNames;
    const newValue = climateVariableValueNames.filter(variables => variables.value === value);
    return newValue[0].pullDownText;
  }
}