const theDate = new Date();
const thisYear = (theDate.getFullYear() - 1);

const SandoxSeasonsHumanReadable = () => ([
  {
    value: 'yearly',
    pullDownText: 'Yearly Thresholds (Jan - Dec)'
  },
  {
    value: 'ann',
    pullDownText: 'Annually (Jan - Dec)'
  },
  {
    value: 'djf',
    pullDownText: 'Winter (Dec, Jan, Feb)'
  },
  {
    value: 'mam',
    pullDownText: 'Spring (Mar, Apr, May)'
  },
  {
    value: 'jja',
    pullDownText: 'Summer (Jun, Jul, Aug)'
  },
  {
    value: 'son',
    pullDownText: 'Fall (Sep, Oct, Nov)'
  }
]);
export default SandoxSeasonsHumanReadable;
