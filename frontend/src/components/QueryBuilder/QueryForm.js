import React, { useState } from 'react';
import { Select, Form, Space, Button } from 'antd';
import { useStore } from '../../stores';
import { trendQueries, chartConfigs, trendNames, highlights } from '../../util/constants';
import shallow from 'zustand/shallow';
import './styles/Form.css';
import useQuery from '../../util/useQuery';
import createNotification from '../../util/createNotification';

export default function QueryForm() {
  const { selectQuery } = useQuery();

  const [selected, setSelected] = useState();

  const { clear, setChartOptions, setChartType, loading } = useStore(
    (state) => ({
      clear: state.clear,
      setChartType: state.setChartType,
      setChartOptions: state.setChartOptions,
      loading: state.loading,
    }),
    shallow
  );


  function handleChange(e) {
    const trendName = e;
    setSelected(trendName);
  }
  function showQuery() {
    const content = {
      message: 'SQL Query used for this trend',
      description: trendQueries[selected],
      duration: 0
    }
    createNotification(content);
  }

  function Highlights() {
    if (selected === undefined) {
      return <li>See key highlights of your trend!</li>
    }
    const highlight = highlights[selected];
    return highlight.map((highlight) => (
        <li>{highlight}</li>
      ))
  }

  async function handleSubmit() {
    if (selected) {
      clear();

      const trendName = selected;
      console.log(trendName);
      const chartType = chartConfigs[trendName].chartType;
      const chartOptions = chartConfigs[trendName].chartOptions;
      const query = trendQueries[trendName];

      await selectQuery(query);
      setChartType(chartType);
      setChartOptions(chartOptions);
    } else {
      createNotification({
        message: 'Error',
        description: 'Please select a trend to run',
      });
    }
  }

  return (
    <React.Fragment>
      <Form style={{ paddingTop: '1rem' }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <h4>Trends</h4>
            <Select
              onChange={handleChange}
              style={{ width: '100%' }}
              placeholder="Please select"
              value={selected}
            >
              {trendNames.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </Select>
          </div>
        </Space>
      </Form>
      <br></br>
      <br></br>
      <div className="highlights">
        <h4>
          Highlights
        </h4>
        <Highlights/>
      </div>
      <div className="sidebar-footer">
        <div className="content">
          <Button loading={loading} onClick={handleSubmit}>
            Run
          </Button>
          <Button onClick={showQuery}>
            See Query
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}
