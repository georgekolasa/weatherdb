import React from 'react';
import { useStore } from '../../stores';
import shallow from 'zustand/shallow';
import { Chart } from 'react-google-charts';
import PageLoader from '../PageLoader';
import './Visualization.css';

export default function Visualization() {
  const { data, loading, chartConfig, chartOptions} = useStore(
    (state) => ({
      data: state.queryData,
      loading: state.loading,
      chartConfig: state.chartConfig,
      chartOptions: state.chartOptions,
    }),
    shallow
  );

  const { chartType } = chartConfig;

  return (
    <div className="preview-layout">
      {(data || loading) && (
        <Chart data={data} chartType={chartType} options={chartOptions} loading={<PageLoader />} />
      )}

      {!data && !loading && <div>Make a query to get started!</div>}
    </div>
  );
}
