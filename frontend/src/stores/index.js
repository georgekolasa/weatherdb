import create from 'zustand';

export const useStore = create((set) => ({
  // STORE VARIABLES

  queryData: null,
  loading: false,
  chartOptions: {
    title: 'Average Temperature in the United Kingdom, 1975 - Present',
    hAxis: {title: 'Year', format: '####', minValue: 1975, maxValue: 2020},
    vAxis: {title: 'Temperature in 0.1 C'},
    trendlines: {0: {}, color: 'orange'},
    legend: 'none'
    },
  chartConfig: {
    chartType: 'ScatterChart'
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
