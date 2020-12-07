import create from 'zustand';

const defaultState = {
  queryData: null,
  query: null,
  chartType: null,
  loading: false,
  chartOptions: null,
};

export const useStore = create((set) => ({
  // STORE VARIABLES

  queryData: null,
  query: null,
  chartType: null,
  loading: false,
  chartOptions: null,

  // END STORE VARIABLES

  // STORE ACTIONS
  setQueryData: (queryData) =>
    set((state) => ({ ...state, queryData: queryData })),
  setQuery: (query) => set((state) => ({ ...state, query: query })),
  setChartOptions: (chartOptions) =>
    set((state) => ({ ...state, chartOptions: chartOptions })),
  setChartType: (chartType) =>
    set((state) => ({ ...state, chartType: chartType })),

  clear: () => set(() => defaultState),

  // it will toggle by default, if you pass in a new status then it will just take
  // that instead of toggling
  toggleLoading: (newStatus) =>
    set((state) => ({
      ...state,
      loading: newStatus !== undefined ? newStatus : !state.loading,
    })),

  // END STORE ACTIONS
}));
