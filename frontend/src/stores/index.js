import create from 'zustand';

// TODO: SET TABLE PREFIX

export const useStore = create((set) => ({
  // STORE VARIABLES

  queryData: null,
  query: `SELECT EXTRACT(YEAR FROM DATE_TAKEN), ROUND(AVG(VALUE),2)
  FROM GARMON.READING INNER JOIN
  GARMON.STATION USING(STATION_ID) 
  WHERE ELEMENT='TAVG' AND COUNTRY='UK'
  AND EXTRACT (YEAR FROM DATE_TAKEN) > 1974
  GROUP BY EXTRACT (YEAR FROM DATE_TAKEN)
  ORDER BY EXTRACT (YEAR FROM DATE_TAKEN)`,
  loading: false,
  chartOptions: {
    title: 'Average Daily Temperatures in the United Kingdom, 1975 - Present',
    hAxis: { title: 'Year', minValue: 1975},
    vAxis: { title: 'Temperature (0.1 C)' },
    trendlines: { 0: {}, color: 'orange' },
    legend: 'none',
  },
  chartConfig: {
    chartType: 'ScatterChart',
  },

  // END STORE VARIABLES

  // STORE ACTIONS
  setQueryData: (queryData) =>
    set((state) => ({ ...state, queryData: queryData })),

  // it will toggle by default, if you pass in a new status then it will just take
  // that instead of toggling
  toggleLoading: (newStatus) =>
    set((state) => ({
      ...state,
      loading: newStatus !== undefined ? newStatus : !state.loading,
    })),

  // END STORE ACTIONS
}));
