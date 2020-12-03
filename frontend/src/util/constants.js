export const trendQueries = {
  TREND1: `SELECT EXTRACT(YEAR FROM DATE_TAKEN),
  ROUND(AVG(VALUE),2) FROM GARMON.READING 
  INNER JOIN GARMON.STATION USING(STATION_ID) 
  WHERE ELEMENT='TAVG' AND COUNTRY='UK'
  AND EXTRACT (YEAR FROM DATE_TAKEN) > 2000
  GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
  ORDER BY EXTRACT (YEAR FROM DATE_TAKEN)`,
  TREND2: ``,
  TREND3: ``,
  TREND4: ``,
  TREND5: ``,
  TREND6: ``,
  TEST_TREND: `SELECT EXTRACT(YEAR FROM DATE_TAKEN),
  ROUND(AVG(VALUE),2) FROM GARMON.READING 
  INNER JOIN GARMON.STATION USING(STATION_ID) 
  WHERE ELEMENT='TAVG' AND COUNTRY='UK'
  AND EXTRACT (YEAR FROM DATE_TAKEN) > 1974
  GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
  ORDER BY EXTRACT (YEAR FROM DATE_TAKEN)`,
};

export const chartConfigs = {
  TREND1: {
    chartType: 'ScatterChart',
    chartOptions: {
      title: 'Average Daily Temperatures in the United Kingdom, 1990 - Present',
      hAxis: { format: '####', title: 'Year', minValue: 1990 },
      vAxis: { title: 'Temperature (0.1 C)' },
      trendlines: { 0: { type: 'linear', color: 'red' } },
      legend: 'none',
    },
  },
  TREND2: { chartType: '', chartOptions: {} },
  TREND3: { chartType: '', chartOptions: {} },
  TREND4: { chartType: '', chartOptions: {} },
  TREND5: { chartType: '', chartOptions: {} },
  TREND6: { chartType: '', chartOptions: {} },
  TEST_TREND: {
    chartType: 'ScatterChart',
    chartOptions: {
      title: 'Average Daily Temperatures in the United Kingdom, 1975 - Present',
      hAxis: { format: '####', title: 'Year', minValue: 1975 },
      vAxis: { title: 'Temperature (0.1 C)' },
      trendlines: { 0: { type: 'linear', color: 'orange' } },
      legend: 'none',
    },
  },
};

export const trendNames = [
  { label: 'Trend 1 name', value: 'TREND1' },
  { label: 'Trend 2 name', value: 'TREND2' },
  { label: 'Trend 3 name', value: 'TREND3' },
  { label: 'Trend 4 name', value: 'TREND4' },
  { label: 'Trend 5 name', value: 'TREND5' },
  { label: 'Trend 6 name', value: 'TREND6' },
  {
    label: 'Average daily temperatures in the United Kingdom',
    value: 'TEST_TREND',
  },
];

export const highlights = {
  TREND1: [

  ],
  TREND2: [

  ],
  TREND3: [

  ],
  TREND4: [

  ],
  TREND5: [
    
  ],
  TREND6: [

  ],
  TEST_TREND: [
    'Cool thing about this trend',
    'Another cool thing about this trend',
    'Maybe even another cool thing!',
    'The Polar Bears are dying. The ice caps are melting. Humans are depleting all the natural resources.'
  ]
};