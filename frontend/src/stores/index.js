import create from 'zustand';


export const useStore = create((set) => ({
  // STORE VARIABLES

  queryData: null,
  query: null,
  loading: false,
  chartOptions: {
    title: 'Title',
    hAxis: {},
    vAxis: {},
    trendlines: {},
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
