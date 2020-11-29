import React from 'react';
import { Select, Form, Space} from 'antd';
import { useStore } from '../../stores';
import { trendQueries, chartConfigs, trendNames } from '../../util/constants';
import shallow from 'zustand/shallow';
import './styles/Form.css';

export default function QueryForm() {
  const { setQuery, setChartOptions, setChartType } = useStore(
    (state) => ({
      setChartType: state.setChartType,
      setChartOptions: state.setChartOptions,
      setQuery: state.setQuery
    }),
    shallow
  );

  function handleChange(e) {
    const trendName = e;
    const chartType = chartConfigs[trendName].chartType;
    const chartOptions = chartConfigs[trendName].chartOptions;
    const query = trendQueries[trendName];
    setChartType(chartType);
    setChartOptions(chartOptions);
    setQuery(query);
  }
  
  //TODO: set query and chart options in state based on input

  return (
    <Form style={{ paddingTop: '1rem' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <h4>Trends</h4>
          <Select
          onChange = {handleChange}
          style={{ width: '100%' }}
          placeholder="Please select">
            {trendNames.map((option) => (
              <option value = {option.value}>{option.label}</option>
            ))}
          </Select>
        </div>
      </Space>
    </Form>
  );
}
