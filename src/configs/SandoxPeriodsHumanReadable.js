const theDate = new Date();
const thisYear = (theDate.getFullYear() - 1);

const SandoxPeriodsHumanReadable = () => ([
  {
    value: '1900-current',
    pullDownText: `1900 - ${thisYear}`,
    range: [1900, thisYear],
    season: 'yearly'
  },
  {
    value: '1950-current',
    pullDownText: `1950 - ${thisYear}`,
    range: [1950, thisYear],
    season: 'yearly'
  },
  {
    value: '1895-current',
    pullDownText: `1895 - ${thisYear}`,
    range: [1895, thisYear],
    season: 'ann'
  },
  {
    value: '1895-current',
    pullDownText: `1895 - ${thisYear}`,
    range: [1895, thisYear],
    season: 'djf'
  },
  {
    value: '1895-current',
    pullDownText: `1895 - ${thisYear}`,
    range: [1895, thisYear],
    season: 'mam'
  },
  {
    value: '1895-current',
    pullDownText: `1895 - ${thisYear}`,
    range: [1895, thisYear],
    season: 'jja'
  },
  {
    value: '1895-current',
    pullDownText: `1895 - ${thisYear}`,
    range: [1895, thisYear],
    season: 'son'
  }
]);
export default SandoxPeriodsHumanReadable;
