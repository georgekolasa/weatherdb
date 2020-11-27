export const CHART_TYPES = {
  SCATTER: 'ScatterChart',
};

export const TREND_TYPES = {
  LINEAR: {},
  EXPONENTIAL: { type: 'exponential', visibleInLegend: true },
  // POLYNOMIAL: {}, // kinda diff, bc you need a controlled degree field in the object
};

export const dbFields = [
  { label: 'LATITUDE', value: 'LATITUDE' },
  { label: 'LONGITUDE', value: 'LONGITUDE' },
];
