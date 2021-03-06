import moment from 'moment';

export const trendQueries = {
  TREND1: (yearFrom, yearTo) => `SELECT * FROM 
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
  WHERE YEAR > ${yearFrom ? yearFrom : '1964'} AND YEAR < ${
    yearTo ? yearTo : '2021'
  }
  ORDER BY YEAR ASC`,

  TREND2: (
    yearFrom,
    yearTo
  ) => `SELECT NAME, "Median Max Temp", "Average Precipitation", REGION_NAME, "Average Latitude"
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

  TREND3: (yearFrom, yearTo) => `SELECT * FROM
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
    USING (YEAR)
    WHERE YEAR > ${yearFrom ? yearFrom : '1964'} AND YEAR < ${
    yearTo ? yearTo : '2021'
  }`,

  TREND4: (yearFrom, yearTo) => `SELECT * FROM
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
    USING (YEAR)
    WHERE YEAR > ${yearFrom ? yearFrom : '1770'} AND YEAR < ${
    yearTo ? yearTo : '2021'
  }`,

  TREND5: (yearFrom, yearTo) => `SELECT * FROM 
  (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(MEDIAN(VALUE)) AS "Spring"
  FROM GARMON.READING INNER JOIN GARMON.STATION USING (STATION_ID)
  INNER JOIN GARMON.COUNTRY USING (COUNTRY)
  WHERE ELEMENT='TMAX' AND EXTRACT(YEAR FROM DATE_TAKEN) > 1900 AND 
  EXTRACT(MONTH FROM DATE_TAKEN) IN (3,4,5) AND region != 'EE' AND region != 'NE'
  GROUP BY EXTRACT(YEAR FROM DATE_TAKEN))
  INNER JOIN
  (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(MEDIAN(VALUE)) AS "Summer"
  FROM GARMON.READING INNER JOIN GARMON.STATION USING (STATION_ID)
  INNER JOIN GARMON.COUNTRY USING (COUNTRY)
  WHERE ELEMENT='TMAX' AND EXTRACT(YEAR FROM DATE_TAKEN) > 1900 AND 
  EXTRACT(MONTH FROM DATE_TAKEN) IN (6,7,8) AND region != 'EE' AND region != 'NE'
  GROUP BY EXTRACT(YEAR FROM DATE_TAKEN))
  USING (YEAR)
  INNER JOIN
  (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(MEDIAN(VALUE)) AS "Fall"
  FROM GARMON.READING INNER JOIN GARMON.STATION USING (STATION_ID)
  INNER JOIN GARMON.COUNTRY USING (COUNTRY)
  WHERE ELEMENT='TMAX' AND EXTRACT(YEAR FROM DATE_TAKEN) > 1900 AND 
  EXTRACT(MONTH FROM DATE_TAKEN) IN (9,10,11) AND region != 'EE' AND region != 'NE'
  GROUP BY EXTRACT(YEAR FROM DATE_TAKEN))
  USING (YEAR) 
  INNER JOIN
  (SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(MEDIAN(VALUE)) AS "Winter"
  FROM GARMON.READING INNER JOIN GARMON.STATION USING (STATION_ID)
  INNER JOIN GARMON.COUNTRY USING (COUNTRY)
  WHERE ELEMENT='TMAX' AND EXTRACT(YEAR FROM DATE_TAKEN) > 1900 AND 
  EXTRACT(MONTH FROM DATE_TAKEN) IN (12,1,2) AND region != 'EE' AND region != 'NE'
  GROUP BY EXTRACT(YEAR FROM DATE_TAKEN))
  USING (YEAR)
  WHERE YEAR > ${yearFrom ? yearFrom : '1964'} AND YEAR < ${
    yearTo ? yearTo : '2021'
  }
  ORDER BY YEAR ASC`,

  TREND6: (yearFrom, yearTo) => `SELECT YEAR, "NumSnowDays" FROM (
    SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE)) as "Average Temperature"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID)
    WHERE ELEMENT = 'TMAX'
    GROUP BY EXTRACT(YEAR FROM DATE_TAKEN)
  ) INNER JOIN (
    SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, COUNT(*) as "NumSnowDays"
    FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID)
    WHERE ELEMENT = 'SNOW' AND VALUE > 0
    GROUP BY EXTRACT(YEAR FROM DATE_TAKEN)
  ) USING (YEAR)
  WHERE YEAR > ${yearFrom ? yearFrom : '1950'} AND YEAR < ${
    yearTo ? yearTo : '2021'
  }
  ORDER BY YEAR ASC
  `, // TODO

  TREND7: (
    yearFrom,
    yearTo
  ) => `SELECT "Max Temperature", "Snowfall", "Snowdepth" FROM (
    SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR,
    ROUND(AVG(VALUE)) as "Max Temperature", COUNTRY
    FROM GARMON.STATION INNER JOIN GARMON.READING
    USING (STATION_ID) INNER JOIN GARMON.COUNTRY USING (COUNTRY)
    WHERE ELEMENT = 'TMAX'
    AND EXTRACT(MONTH FROM DATE_TAKEN) IN (10,11,12, 1, 2,3,4)
    AND COUNTRY IN ('IC', 'NO', 'SW', 'FI')
    GROUP BY EXTRACT(YEAR FROM DATE_TAKEN), COUNTRY
  ) INNER JOIN (
      SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR,
      SUM(VALUE) as "Snowfall", COUNTRY
      FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID)
      INNER JOIN GARMON.COUNTRY USING (COUNTRY)
      WHERE ELEMENT = 'SNOW' AND EXTRACT(MONTH FROM DATE_TAKEN) IN (10,11,12, 1, 2,3,4)
      AND COUNTRY IN ('IC', 'NO', 'SW', 'FI')
      GROUP BY EXTRACT(YEAR FROM DATE_TAKEN), COUNTRY
  ) USING (YEAR, COUNTRY) INNER JOIN (
      SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR,
      ROUND(AVG(VALUE))*10 as "Snowdepth", COUNTRY
      FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID)
      INNER JOIN GARMON.COUNTRY USING (COUNTRY)
      WHERE ELEMENT = 'SNWD'
      AND EXTRACT(MONTH FROM DATE_TAKEN) IN (10,11,12, 1, 2,3,4)
      AND COUNTRY IN ('IC', 'NO', 'SW', 'FI')
      GROUP BY EXTRACT(YEAR FROM DATE_TAKEN), COUNTRY
  ) USING (YEAR, COUNTRY)
  WHERE YEAR > ${yearFrom ? yearFrom : '1964'} AND YEAR < ${
    yearTo ? yearTo : '2021'
  }`,

  TREND8: (yearFrom, yearTo) =>
    `SELECT * FROM (
      SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, ROUND(AVG(VALUE)) as "Average Temperature"
      FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID)
      WHERE ELEMENT = 'TMAX'
      GROUP BY EXTRACT(YEAR FROM DATE_TAKEN)
    ) INNER JOIN (
      SELECT EXTRACT(YEAR FROM DATE_TAKEN) AS YEAR, SUM(VALUE) as "Average Hail"
      FROM GARMON.STATION INNER JOIN GARMON.READING USING (STATION_ID)
      WHERE ELEMENT = 'WT05'
      GROUP BY EXTRACT(YEAR FROM DATE_TAKEN)
    ) USING (YEAR)
    ORDER BY YEAR ASC`,
};

// TODO: alter me to take in params and return an object instead (see above)
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
      title: 'Average temperatures by season',
      hAxis: { format: '####', title: 'Year' },
      vAxis: { title: 'Temperature (0.1 C)', viewWindow: { min: 100 } },
      pointSize: 4,
      colors: ['blue', 'red', 'orange', 'green', 'purple', 'LightCoral'],
      trendlines: {
        0: { type: 'linear', color: 'blue' },
        1: { type: 'linear', color: 'red' },
        2: { type: 'linear', color: 'orange' },
        3: { type: 'linear', color: 'green' },
      },
    },
  },
  TREND6: {
    chartType: 'LineChart',
    chartOptions: {
      title: 'Trending Number of Snow Days',
      hAxis: { format: '####', title: 'Year' },
      vAxis: { title: 'Number of Days' },
      trendlines: { 0: { type: 'exponential', color: 'orange' } },
    },
  },
  TREND7: {
    chartType: 'ScatterChart',
    chartOptions: {
      title:
        'Correlation of Average Max Temperatures and Snowfall/Snowdepth in Northern Europe',
      hAxis: {
        format: '####',
        title: 'Average Max Temperature (0.1 C)',
        viewWindow: { min: 20 },
      },
      vAxis: { title: 'Depth/Fall (unit)', viewWindow: { max: 3000 } },
      trendlines: {
        0: { type: 'linear', color: 'blue' },
        1: { type: 'linear', color: 'red' },
      },
    },
  },
  TREND8: {
    chartType: 'ScatterChart',
    chartOptions: {
      title: 'Average Temperature vs. Hail Days',
      hAxis: {
        format: '####',
        title: 'Year',
        viewWindow: { min: 1964 },
      },
      vAxis: {
        title: 'Average Max Temperature (0.1 C) / Hail Days',
        viewWindow: { max: 300 },
      },
      // trendlines: {
      //   0: { type: 'linear', color: 'blue' },
      //   1: { type: 'linear', color: 'red' },
      // },
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
    label: 'Average temperatures by Season',
    value: 'TREND5',
  },
  {
    label: 'Trending Number of Snow Days',
    value: 'TREND6',
  },
  {
    label: 'Average Max Temperatures and Snowfall/Snowdepth',
    value: 'TREND7',
  },
  {
    label: 'Average Temperature vs. Hail Days',
    value: 'TREND8',
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
  TREND5: [
    'This trend explores how temperatures in each season are changing globally',
    'Since 1965, temperatures across the world and in all seasons have been on an upwards trend (getting warming)',
  ],
  TREND6: [
    'This visualization shows the trend of snow days since 1950',
    'There is an overall downward trend (fewer snow days), and a rather extensive spike from the mid 50s through the 60s',
  ],
  TREND7: [
    'This visualization shows how the trends between snowfall and snowdepth are correlated in the context of average max temperatures.',
    'As the average max temperature increases, snowfall and snowdepth decreases',
    'This data is only representing Northern Europe from October - April, which is why the temperature cap is not very high in relation to other trend queries',
  ],
  TREND8: [
    'This shows an interesting trend set between the average temperature and hail days (per year)',
    'We believe this to be an inconsistent trend, and perhaps if we had more storage in the database the additional data would revive this query',
  ],
};

export const trendDateRanges = {
  TREND1: [moment('1964', 'YYYY'), moment('2021', 'YYYY')],
  TREND3: [moment('1964', 'YYYY'), moment('2021', 'YYYY')],
  TREND4: [moment('1770', 'YYYY'), moment('2021', 'YYYY')],
  TREND5: [moment('1964', 'YYYY'), moment('2021', 'YYYY')],
  TREND6: [moment('1950', 'YYYY'), moment('2021', 'YYYY')],
  TREND7: [moment('1964', 'YYYY'), moment('2021', 'YYYY')],
};
