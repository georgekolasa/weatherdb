import React from 'react';
import { useStore } from '../../stores';
import shallow from 'zustand/shallow';
import { Chart } from 'react-google-charts';
import PageLoader, { AlwaysOnLoader } from '../PageLoader';
import './Visualization.css';
import CenteredDiv from '../CenteredDiv';
import useQuery from '../../util/useQuery';

export default function Visualization() {
  const { data, loading, chartType, chartOptions } = useStore(
    (state) => ({
      data: state.queryData,
      loading: state.loading,
      chartType: state.chartType,
      chartOptions: state.chartOptions,
    }),
    shallow
  );

  return (
    <div className="preview-layout">
      {data && (
        <Chart
          height="100%"
          width="100%"
          data={data}
          chartType={chartType}
          options={chartOptions}
          loader={<AlwaysOnLoader />}
        />
      )}

      <PageLoader />

      {!data && !loading && (
        <CenteredDiv>Make a query to get started!</CenteredDiv>
      )}
    </div>
  );
}
