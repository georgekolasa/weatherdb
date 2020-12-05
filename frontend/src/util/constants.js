export const trendQueries = {
  TREND1: `SELECT * FROM 
  (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "Max Temp, 0.1 C"
  FROM GARMON.READING INNER JOIN GARMON.STATION USING (STATION_ID)
  WHERE ELEMENT='TMAX' AND STATE='FL'
  GROUP BY EXTRACT(YEAR FROM DATE_TAKEN))
  INNER JOIN
  (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "Min Temp, 0.1 C"
  FROM GARMON.READING INNER JOIN GARMON.STATION USING (STATION_ID)
  WHERE ELEMENT='TMIN' AND STATE='FL'
  GROUP BY EXTRACT(YEAR FROM DATE_TAKEN))
  USING (YEAR)
  INNER JOIN
  (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "Avg total sunshine, minutes"
  FROM GARMON.READING INNER JOIN GARMON.STATION USING (STATION_ID)
  WHERE ELEMENT='TSUN' AND STATE='FL'
  GROUP BY EXTRACT(YEAR FROM DATE_TAKEN))
  USING (YEAR) 
  WHERE YEAR > 1964
  ORDER BY YEAR ASC`,

  TREND2: `SELECT NAME, "Median Max Temp", "Average Latitude", REGION_NAME, "Average Precipitation"
  FROM (SELECT MEDIAN(VALUE) AS "Median Max Temp", COUNTRY
  FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID)
  WHERE ELEMENT = 'TMAX' GROUP BY COUNTRY
  ) INNER JOIN (
  SELECT ROUND(AVG(VALUE), 2) AS "Average Precipitation", COUNTRY
  FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID)
  WHERE ELEMENT = 'PRCP' GROUP BY COUNTRY
  ) USING (COUNTRY) INNER JOIN (
  SELECT ABS(ROUND(MEDIAN(LATITUDE), 2)) AS "Average Latitude", COUNTRY
  FROM GARMON.STATION GROUP BY COUNTRY) 
  USING (COUNTRY) INNER JOIN 
  (SELECT NAME, REGION_NAME, REGION, COUNTRY 
  FROM GARMON.COUNTRY INNER JOIN GARMON.REGION USING (REGION)) 
  USING (COUNTRY)`,

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

  TREND6: `SELECT EXTRACT(YEAR FROM DATE_TAKEN), ROUND(AVG(VALUE), 2)
  FROM READING WHERE ELEMENT = 'TSUN' GROUP BY EXTRACT(YEAR FROM DATE_TAKEN) ORDER BY EXTRACT (YEAR FROM DATE_TAKEN) ASC`,

  TEST_TREND: `SELECT * FROM GARMON.REGION`,
};

export const chartConfigs = {
  TREND1: {
    chartType: 'ScatterChart',
    chartOptions: {
      title:
        'Average Daily Sunshine, Maximum and Minimum Daily Temperatures in Florida, 1965-present',
      hAxis: { format: '####', title: 'Year', minValue: 1990 },
      vAxis: { title: 'Temperature (0.1 C)' },
      trendlines: {
        0: { type: 'linear', color: 'blue' },
        1: { type: 'linear', color: 'red' },
        2: { type: 'linear', color: 'orange' },
      },
      legend: { position: 'top' },
    },
  },
  TREND2: {
    chartType: 'BubbleChart',
    chartOptions: {
      title:
        'Correlation between Median Maximum Temperatures, Average daily precipitation, and Latitude of countries by region',
      hAxis: { format: '####', title: 'Median Max Temp (0.1 C)' },
      vAxis: { title: 'Latitude (Absolute value)' },
      sizeAxis: { minSize: 4, maxSize: 12 },
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
      title:
        'Correlation between average temperature, maximum temperature, and snow depth',
      hAxis: { title: 'Average Temperature' },
      trendlines: {
        0: { type: 'linear', color: 'blue' },
        1: { type: 'linear', color: 'red' },
      },
    },
  },
  TEST_TREND: {
    chartType: 'BubbleChart',
    chartOptions: {
      title:
        'Correlation between Median Maximum Temperatures, Average daily precipitation, and Latitude of countries by region',
      hAxis: { format: '####', title: 'Median Max Temp' },
      vAxis: { title: 'Latitude (Absolute value)' },
      trendlines: { 0: { type: 'linear', color: 'orange' } },
      sizeAxis: { minSize: 4, maxSize: 12 },
    },
  },
};

export const trendNames = [
  { label: 'Florida average temperatures and sunshine', value: 'TREND1' },
  {
    label: 'Correlation Temperatures, precipitation, and latitude',
    value: 'TREND2',
  },
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
    "Since 1965, Florida's daily highs and lows have been getting warmer.",
    'Since 1965, Florida is experiencing less sunshine per day, on average.',
    'This data was analyzed from 9,143,924 readings taken at 1,744 Florida weather stations.',
  ],
  TREND2: [
    'This visualisation explores the correlation between precipitation, temperature, and latitude.',
    'Countries are grouped into regions according to the United Nations geoscheme.',
    'The size of each point represents the average daily precipitation of that country.',
    'Precipitation includes rain, snow, hail, drizzle, sleet, and freezing rain.',
  ],
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
