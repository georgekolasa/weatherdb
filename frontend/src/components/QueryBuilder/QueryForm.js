import React from 'react';
import { Select, Form, Space} from 'antd';
import { useStore } from '../../stores';
import { trendQueries, chartConfigs, trendNames } from '../../util/constants';
import shallow from 'zustand/shallow';
import './styles/Form.css';
import useQuery from '../../util/useQuery';


export default function QueryForm() {
  const { selectQuery } = useQuery(); 
  const { setQuery, setChartOptions, setChartType, toggleLoading} = useStore(
    (state) => ({
      setChartType: state.setChartType,
      setChartOptions: state.setChartOptions,
      setQuery: state.setQuery,
      toggleLoading: state.toggleLoading
    }),
    shallow
  );

  function handleChange(e) {
    //TODO toggle loading 
    const trendName = e;
    const chartType = chartConfigs[trendName].chartType;
    const chartOptions = chartConfigs[trendName].chartOptions;
    const query = trendQueries[trendName];
    setQuery(query);
    selectQuery();
    setChartType(chartType);
    setChartOptions(chartOptions);
  }
  
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
