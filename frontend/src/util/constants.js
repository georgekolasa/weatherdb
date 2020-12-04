export const trendQueries = {
  TREND1: `SELECT EXTRACT(YEAR FROM DATE_TAKEN),
  ROUND(AVG(VALUE),2) FROM GARMON.READING 
  INNER JOIN GARMON.STATION USING(STATION_ID) 
  WHERE ELEMENT='TAVG' AND COUNTRY='UK'
  AND EXTRACT (YEAR FROM DATE_TAKEN) > 2000
  GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
  ORDER BY EXTRACT (YEAR FROM DATE_TAKEN)`,
  TREND2: `SELECT country.name, avg(reading.value) "Temperature"
  FROM garmon.station 
  JOIN garmon.reading ON garmon.reading.station_id = garmon.station.station_id
  JOIN garmon.country ON garmon.country.country = garmon.station.country
  WHERE element = 'TAVG' 
  AND EXTRACT(YEAR from date_taken) <= '2020' AND EXTRACT(YEAR from date_taken) > '1996' 
  AND station.country = 'UK'
  GROUP BY country.name`, //FIXME
  TREND3: `SELECT avg(value) "Snow Depth", EXTRACT(YEAR from date_taken) "Year"
  FROM garmon.station JOIN garmon.reading ON garmon.reading.station_id = garmon.station.station_id
  WHERE element = 'SNWD' AND country = 'IC'
  GROUP BY EXTRACT(YEAR from date_taken)
  ORDER BY EXTRACT(YEAR from date_taken)`, //FIXME: flipped axis
  TREND4: `SELECT avg(value) "Temperature", EXTRACT(YEAR from date_taken) "Year"
  FROM garmon.station JOIN garmon.reading ON garmon.reading.station_id = garmon.station.station_id
  WHERE element = 'TAVG' 
  AND EXTRACT(MONTH from date_taken) >= '01' AND EXTRACT(MONTH from date_taken) <= '03' 
  AND EXTRACT(YEAR from date_taken) <= '2020' AND EXTRACT(YEAR from date_taken) >= '2015' 
  GROUP BY EXTRACT(YEAR from date_taken)
  ORDER BY EXTRACT(YEAR from date_taken)`, //FIXME: flipped axis
  TREND5: `SELECT avg(value) "Wind Speed", EXTRACT(YEAR from date_taken) "Year"
  FROM garmon.station JOIN garmon.reading ON garmon.reading.station_id = garmon.station.station_id
  WHERE element = 'AWND'
  AND EXTRACT(YEAR from date_taken) <= 2018 AND EXTRACT(YEAR from date_taken) >= 1995 
  AND country = 'US'
  GROUP BY EXTRACT(YEAR from date_taken)
  ORDER BY EXTRACT(YEAR from date_taken)`,
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
  TREND2: {
    chartType: 'ScatterChart',
    chartOptions: {
      title: 'Temperatures of x country(s) over past X years',
      hAxis: { format: '####', title: 'Year' },
      vAxis: { title: 'Temperature (0.1 C)' },
      trendlines: { 0: { type: 'linear', color: 'red' } },
    },
  },
  TREND3: {
    chartType: 'ScatterChart',
    chartOptions: {
      title: 'Average snow depth of X country(s) over the years',
      vAxis: { format: '####', title: 'Year' },
      hAxis: { title: 'Temperature (0.1 C)' },
      trendlines: { 0: { type: 'linear', color: 'red' } },
    },
  },
  TREND4: {
    chartType: 'ScatterChart',
    chartOptions: {
      title: 'Are seasons becoming more extreme over X period of time?',
      vAxis: { format: '####', title: 'Year' },
      hAxis: { title: 'Temperature (0.1 C)' },
      trendlines: { 0: { type: 'linear', color: 'red' } },
    },
  },
  TREND5: {
    chartType: 'ScatterChart',
    chartOptions: {
      title: 'Average wind speed of X country(s) over X years',
      vAxis: { format: '####', title: 'Year' },
      hAxis: { title: 'Temperature (0.1 C)' },
      trendlines: { 0: { type: 'linear', color: 'red' } },
    },
  },
  TREND6: {
    chartType: 'ScatterChart',
    chartOptions: {
      title: 'Average ratio of snow fall to snow depth over X years',
      vAxis: { format: '####', title: 'Year' },
      hAxis: { title: 'Temperature (0.1 C)' },
      trendlines: { 0: { type: 'linear', color: 'red' } },
    },
  },
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
  TREND1: [],
  TREND2: [],
  TREND3: [],
  TREND4: [],
  TREND5: [],
  TREND6: [],
  TEST_TREND: [
    'Cool thing about this trend',
    'Another cool thing about this trend',
    'Maybe even another cool thing!',
    'The Polar Bears are dying. The ice caps are melting. Humans are depleting all the natural resources.',
  ],
};
