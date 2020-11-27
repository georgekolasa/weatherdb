export const CHART_TYPES = {
  SCATTER: 'ScatterChart',
  LINE: 'LineChart',
  CALENDAR: 'Calendar',
  BAR: 'BarChart'
};

export const TREND_TYPES = {
  LINEAR: {},
  EXPONENTIAL: { type: 'exponential', visibleInLegend: true },
  // POLYNOMIAL: {}, // kinda diff, bc you need a controlled degree field in the object
};

export const dbFields = [
  { label: 'Maximum Temperature', value: 'TMAX'},
  { label: 'Minimum Temperature', value: 'TMIN'},
  { label: 'Average Temperature', value: 'TAVG'},
  { label: 'Average Wind Speed', value: 'AWND'},
  { label: 'Tornadoes', value: 'WT10'},
  { label: 'Precipitation', value: 'PRCP'},
  { label: 'Snowfall', value: 'SNOW'},
  { label: 'Snow depth', value: 'SNWD'},
];

export const countries = [
  {label: 'United States', value: 'US'},
  {label: 'United Kingdom', value: 'UK'},
  {label: 'Antarctica', value: 'AY'},
  {label: 'Iceland', value: 'IC'},
  {label: 'Canada', value: 'CA'}
]
