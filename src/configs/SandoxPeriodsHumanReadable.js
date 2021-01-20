const theDate = new Date();
const thisYear = theDate.getFullYear();

const SandoxPeriodsHumanReadable = () => ([
  {
    value: '1900-current',
    pullDownText: `1900 - ${thisYear}`,
    range: [1900, thisYear]
  },
  {
    value: '1950-current',
    pullDownText: `1950 - ${thisYear}`,
    range: [1950, thisYear]
  }
]);
export default SandoxPeriodsHumanReadable;
