import React from 'react';
import { Select, Form, Space} from 'antd';
import { useStore } from '../../stores';
import { trendQueries, chartConfigs, trendNames } from '../../util/constants';
import shallow from 'zustand/shallow';
import './styles/Form.css';

export default function QueryForm() {
  const { chartOptions, chartType } = useStore(
    (state) => ({
      chartType: state.chartType,
      chartOptions: state.chartOptions,
    }),
    shallow
  );

  function onSubmit(data) {
    console.log(data);
  }
  
  //TODO: set query and chart options in state based on input

  return (
    <Form style={{ paddingTop: '1rem' }} onSubmit={onSubmit}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <h4>Trends</h4>
          <Select
            style={{ width: '100%' }}
            placeholder="Please select"
            options={trendNames}
          >
          </Select>
        </div>
      </Space>
    </Form>
  );
}
