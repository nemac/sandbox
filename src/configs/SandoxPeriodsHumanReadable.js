const theDate = new Date();
const thisYear = (theDate.getFullYear() - 1);

// Add warning text for the "Select a Time Period" info thing that 2006-2099 is still experimental.
const SandoxPeriodsHumanReadable = () => ([
  {
    value: 'current-2099',
    pullDownText: '2006—2099',
    range: [2006, 2099],
    season: 'yearly'
  },
  {
    value: '1950-current',
    pullDownText: `1950—${thisYear}`,
    range: [1950, thisYear],
    season: 'yearly'
  },
  {
    value: '1895-current',
    pullDownText: `1895—${thisYear}`,
    range: [1895, thisYear],
    season: 'ann'
  },
  {
    value: 'current-2099',
    pullDownText: '2006—2099',
    range: [2006, 2099],
    season: 'ann'
  },
  {
    value: '1895-current',
    pullDownText: `1895—${thisYear}`,
    range: [1895, thisYear],
    season: 'djf'
  },
  {
    value: '1895-current',
    pullDownText: `1895—${thisYear}`,
    range: [1895, thisYear],
    season: 'mam'
  },
  {
    value: '1895-current',
    pullDownText: `1895—${thisYear}`,
    range: [1895, thisYear],
    season: 'jja'
  },
  {
    value: '1895-current',
    pullDownText: `1895—${thisYear}`,
    range: [1895, thisYear],
    season: 'son'
  }
]);
export default SandoxPeriodsHumanReadable;
