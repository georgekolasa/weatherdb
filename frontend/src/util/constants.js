export const trendQueries = {
  TREND1: `SELECT * FROM 
  (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(MEDIAN(VALUE), 2) AS "Max Temp, 0.1 C"
  FROM GARMON.READING INNER JOIN GARMON.STATION USING (STATION_ID)
  WHERE ELEMENT='TMAX' AND STATE='FL'
  GROUP BY EXTRACT(YEAR FROM DATE_TAKEN))
  INNER JOIN
  (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(MEDIAN(VALUE), 2) AS "Min Temp, 0.1 C"
  FROM GARMON.READING INNER JOIN GARMON.STATION USING (STATION_ID)
  WHERE ELEMENT='TMIN' AND STATE='FL'
  GROUP BY EXTRACT(YEAR FROM DATE_TAKEN))
  USING (YEAR)
  INNER JOIN
  (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(MEDIAN(VALUE), 2) AS "Avg total sunshine, minutes"
  FROM GARMON.READING INNER JOIN GARMON.STATION USING (STATION_ID)
  WHERE ELEMENT='TSUN' AND STATE='FL'
  GROUP BY EXTRACT(YEAR FROM DATE_TAKEN))
  USING (YEAR) 
  WHERE YEAR > 1964
  ORDER BY YEAR ASC`,

  TREND2: `SELECT NAME, "Median Max Temp", "Average Precipitation", REGION_NAME, "Average Latitude"
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

  TREND3: `SELECT * FROM
  (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "Europe"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID) INNER JOIN GARMON.COUNTRY USING (COUNTRY)
    WHERE ELEMENT = 'PRCP' AND REGION IN ('NE', 'WE', 'SE', 'EE')
    GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
    ORDER BY YEAR ASC)
    INNER JOIN
    (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "North America"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID) INNER JOIN GARMON.COUNTRY USING (COUNTRY)
    WHERE ELEMENT = 'PRCP' AND REGION = 'NM'
    GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
    ORDER BY YEAR ASC)
    USING (YEAR) INNER JOIN
    (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "Central/Eastern Asia"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID) INNER JOIN GARMON.COUNTRY USING (COUNTRY)
    WHERE ELEMENT = 'PRCP' AND REGION IN ('EA', 'CA', 'SEA')
    GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
    ORDER BY YEAR ASC)
    USING (YEAR) INNER JOIN
    (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "Central/South America"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID) INNER JOIN GARMON.COUNTRY USING (COUNTRY)
    WHERE ELEMENT = 'PRCP' AND REGION IN ('CM', 'SM')
    GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
    ORDER BY YEAR ASC)
    USING (YEAR) INNER JOIN
    (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "Northern Africa/Southwest Asia"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID) INNER JOIN GARMON.COUNTRY USING (COUNTRY)
    WHERE ELEMENT = 'PRCP' AND REGION IN ('WA', 'NF')
    GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
    ORDER BY YEAR ASC)
    USING (YEAR) INNER JOIN
    (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "Global"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID) INNER JOIN GARMON.COUNTRY USING (COUNTRY)
    WHERE ELEMENT = 'PRCP'
    GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
    ORDER BY YEAR ASC)
    USING (YEAR)`,

  TREND4: `SELECT * FROM
  (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "Europe"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID) INNER JOIN GARMON.COUNTRY USING (COUNTRY)
    WHERE ELEMENT = 'TMAX' AND REGION IN ('NE', 'WE', 'SE', 'EE')
    GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
    ORDER BY YEAR ASC)
    INNER JOIN
    (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "North America"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID) INNER JOIN GARMON.COUNTRY USING (COUNTRY)
    WHERE ELEMENT = 'TMAX' AND REGION = 'NM'
    GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
    ORDER BY YEAR ASC)
    USING (YEAR) INNER JOIN
    (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "Central/Eastern Asia"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID) INNER JOIN GARMON.COUNTRY USING (COUNTRY)
    WHERE ELEMENT = 'TMAX' AND REGION IN ('EA', 'CA', 'SEA')
    GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
    ORDER BY YEAR ASC)
    USING (YEAR) INNER JOIN
    (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "Central/South America"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID) INNER JOIN GARMON.COUNTRY USING (COUNTRY)
    WHERE ELEMENT = 'TMAX' AND REGION IN ('CM', 'SM')
    GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
    ORDER BY YEAR ASC)
    USING (YEAR) INNER JOIN
    (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "Northern Africa/Southwest Asia"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID) INNER JOIN GARMON.COUNTRY USING (COUNTRY)
    WHERE ELEMENT = 'TMAX' AND REGION IN ('WA', 'NF')
    GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
    ORDER BY YEAR ASC)
    USING (YEAR) INNER JOIN
    (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE), 2) AS "Global"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID) INNER JOIN GARMON.COUNTRY USING (COUNTRY)
    WHERE ELEMENT = 'TMAX'
    GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
    ORDER BY YEAR ASC)
    USING (YEAR)`,

  TREND5: `SELECT "Year", "TSUN" FROM (SELECT AVG(VALUE) "TSUN", EXTRACT(YEAR FROM DATE_TAKEN) "Year"
  FROM GARMON.STATION JOIN GARMON.READING ON GARMON.READING.STATION_ID = GARMON.STATION.STATION_ID
  WHERE ELEMENT = 'TSUN'
  AND EXTRACT(YEAR FROM DATE_TAKEN) <= 2018 AND EXTRACT(YEAR FROM DATE_TAKEN) >= 1995 
  AND country = 'US'
  GROUP BY EXTRACT(YEAR FROM DATE_TAKEN)
  ORDER BY EXTRACT(YEAR FROM DATE_TAKEN))`, // TODO: FIXME: BROKEN, I changed to TSUN so it is functional

  TREND6: `SELECT EXTRACT(YEAR FROM DATE_TAKEN), ROUND(AVG(VALUE), 2)
  FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID)
  WHERE ELEMENT = 'SNWD'
  GROUP BY EXTRACT(YEAR FROM DATE_TAKEN)
  ORDER BY EXTRACT(YEAR FROM DATE_TAKEN) ASC`,

  TEST_TREND: `SELECT "Max Temperature", "Snowfall", "Snowdepth" FROM (
    SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE)) as "Max Temperature", COUNTRY
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID)
    WHERE ELEMENT = 'TMAX' AND EXTRACT(MONTH FROM DATE_TAKEN) IN (12, 1, 2) AND COUNTRY='IC'
    GROUP BY EXTRACT(YEAR FROM DATE_TAKEN), COUNTRY
  ) INNER JOIN (
      SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, SUM(VALUE) as "Snowfall", COUNTRY
      FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID)
      WHERE ELEMENT = 'SNOW' AND EXTRACT(MONTH FROM DATE_TAKEN) IN (12, 1, 2) AND COUNTRY='IC'
      GROUP BY EXTRACT(YEAR FROM DATE_TAKEN), COUNTRY
  ) USING (YEAR, COUNTRY) INNER JOIN (
      SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE)) as "Snowdepth", COUNTRY
      FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID)
      WHERE ELEMENT = 'SNWD' AND EXTRACT(MONTH FROM DATE_TAKEN) IN (12, 1, 2) AND COUNTRY='IC'
      GROUP BY EXTRACT(YEAR FROM DATE_TAKEN), COUNTRY
  ) USING (YEAR, COUNTRY)`,

  TEST_TREND_OLD: `SELECT * FROM 
  (SELECT EXTRACT(YEAR FROM DATE_TAKEN) "Year", AVG(VALUE) "Temperature"
  FROM GARMON.STATION JOIN GARMON.READING ON GARMON.READING.STATION_ID = GARMON.STATION.STATION_ID
  WHERE ELEMENT = 'TMAX' 
  AND EXTRACT(MONTH FROM DATE_TAKEN) >= '01' AND EXTRACT(MONTH FROM DATE_TAKEN) <= '03' 
  AND EXTRACT(YEAR FROM DATE_TAKEN) <= '2020' AND EXTRACT(YEAR FROM DATE_TAKEN) >= '2015' 
  GROUP BY EXTRACT(YEAR FROM DATE_TAKEN)
  ORDER BY EXTRACT(YEAR FROM DATE_TAKEN))`, // BROKEN
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
      vAxis: { title: 'Average Daily Precipitation (0.1 mm)' },
      sizeAxis: { minSize: 4, maxSize: 10 },
    },
  },
  TREND3: {
    chartType: 'ScatterChart',
    chartOptions: {
      title: 'Average Annual Precipitation, by Region',
      hAxis: { title: 'Year', format: '####' },
      vAxis: {
        title: 'Average Precipitation (0.1 mm daily)',
        viewWindow: { max: 85 },
      },
      pointSize: 4,
      colors: ['blue', 'red', 'orange', 'green', 'purple', 'LightCoral'],
      trendlines: {
        0: { type: 'linear', color: 'blue' },
        1: { type: 'linear', color: 'red' },
        2: { type: 'linear', color: 'orange' },
        3: { type: 'linear', color: 'green' },
        4: { type: 'linear', color: 'purple' },
        5: { type: 'linear', color: 'LightCoral' },
      },
    },
  },
  TREND4: {
    chartType: 'ScatterChart',
    chartOptions: {
      title: 'Median Daily Maximum Temperature, by Region',
      hAxis: { format: '####', title: 'Year' },
      vAxis: { title: 'Temperature (0.1 C)', viewWindow: { min: 100 } },
      pointSize: 4,
      colors: ['blue', 'red', 'orange', 'green', 'purple', 'LightCoral'],
      trendlines: {
        0: { type: 'linear', color: 'blue' },
        1: { type: 'linear', color: 'red' },
        2: { type: 'linear', color: 'orange' },
        3: { type: 'linear', color: 'green' },
        4: { type: 'linear', color: 'purple' },
        5: { type: 'linear', color: 'LightCoral' },
      },
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
      title: 'Average snow depth of X country(s) over the years',
      hAxis: { format: '####', title: 'Year' },
      vAxis: { title: 'Temperature (0.1 C)' },
      trendlines: { 0: { type: 'linear', color: 'red' } },
    },
  },
  TEST_TREND: {
    chartType: 'ScatterChart',
    chartOptions: {
      title:
        'Correlation of Average Max Temperatures and Snowfall/Snowdepth in Iceland',
      hAxis: { format: '####', title: 'Average Max Temperature (0.1 C)' },
      vAxis: { title: 'Depth/Fall (unit)' },
      trendlines: {
        0: { type: 'linear', color: 'orange' },
        1: { type: 'linear', color: 'blue' },
      },
    },
  },
};

export const trendNames = [
  { label: 'Florida average temperatures and sunshine', value: 'TREND1' },
  {
    label: 'Correlation Temperatures, precipitation, and latitude',
    value: 'TREND2',
  },
  {
    label: 'Regional Annual Precipitation',
    value: 'TREND3',
  },
  {
    label: 'Median Temperatures by Region',
    value: 'TREND4',
  },
  {
    label: 'Average wind speed of X country(s) over X years',
    value: 'TREND5',
  },
  {
    label: 'Average snow depth of X country(s) over the years',
    value: 'TREND6',
  },
  {
    label: 'Average Max Temperatures and Snowfall/Snowdepth',
    value: 'TEST_TREND',
  },
];

export const highlights = {
  TREND1: [
    "Since 1965, Florida's daily highs and lows have been getting warmer.",
    'Since 1965, Florida is experiencing more sunshine per day, on average.',
    'This data was analyzed from 9,143,924 readings taken at 1,744 Florida weather stations.',
  ],
  TREND2: [
    'This visualisation explores the correlation between precipitation, temperature, and latitude.',
    'Countries are grouped into regions according to the United Nations geoscheme.',
    'The size of each point represents the distance from the equator',
    'Precipitation includes rain, snow, hail, drizzle, sleet, and freezing rain.',
  ],
  TREND3: [
    'This visualisation shows how precipitation is changing in various regions.',
    'Countries are grouped into regions according to the United Nations geoscheme.',
    'While most areas show an increase in precipitation, some are receiving less precipitation each year, on average.',
    'Precipitation includes rain, snow, hail, drizzle, sleet, and freezing rain.',
  ],
  TREND4: [
    'This visualisation shows how the median maximum daily temperature is changing in various regions.',
    'Countries are grouped into regions according to the United Nations geoscheme.',
    'While most areas show an increase in median maximum daily temperature, some are receiving less precipitation each year, on average.',
    'The median was chosen to be more reflective of trends, and to reduce skew from outliers.',
  ],
  TREND5: [],
  TREND6: [],
  TEST_TREND: [
    'This visualization shows how the trends between snowfall and snowdepth are correlated in the context of average max temperatures.',
    'As the average max temperature increases, snowfall and snowdepth decreases',
    'This data is only representing Iceland, which is why the temperature cap is not very high in relation to other trend queries',
  ],
};
