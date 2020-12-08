import React, { useState } from 'react';
import { Select, Form, Space, Button } from 'antd';
import { useStore } from '../../stores';
import {
  trendQueries,
  chartConfigs,
  trendNames,
  highlights,
  trendDateRanges,
} from '../../util/constants';
import shallow from 'zustand/shallow';
import './styles/Form.css';
import useQuery from '../../util/useQuery';
import createNotification from '../../util/createNotification';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export default function QueryForm() {
  const { selectQuery } = useQuery();

  const [selected, setSelected] = useState();
  const [dateRange, setDateRange] = useState();

  const { hasData, clear, setChartOptions, setChartType, loading } = useStore(
    (state) => ({
      hasData: !!state.queryData,
      clear: state.clear,
      setChartType: state.setChartType,
      setChartOptions: state.setChartOptions,
      loading: state.loading,
    }),
    shallow
  );

  function handleDateRangeChange(e) {
    setDateRange(e);
  }

  function getQueryInteractable(trend) {
    if (trend && trendDateRanges[trend]) {
      return (
        <div>
          <h4>Year Range</h4>
          <RangePicker
            name="date-picker"
            onChange={handleDateRangeChange}
            value={dateRange}
            picker="year"
          />
        </div>
      );
    } else {
      return null;
    }
  }

  function handleClear() {
    setSelected();
    setDateRange();

    if (hasData) {
      clear();
    }
  }

  function handleChange(e) {
    const trendName = e;
    setDateRange(trendDateRanges[trendName]);
    setSelected(trendName);
  }
  function showQuery() {
    if (!selected || (!dateRange && selected !== 'TREND2')) {
      return;
    }

    const content = {
      message: 'SQL Query used for this trend',
      description: dateRange
        ? trendQueries[selected](
            dateRange[0].format('YYYY'),
            dateRange[1].format('YYYY')
          )
        : trendQueries[selected](),
      duration: 0,
    };
    createNotification(content);
  }

  function Highlights() {
    if (selected === undefined) {
      return <li>See key highlights of your trend!</li>;
    }
    const highlight = highlights[selected];
    return highlight.map((highlight, index) => (
      <li key={index}>{highlight}</li>
    ));
  }

  async function handleSubmit() {
    if (selected) {
      clear();

      const trendName = selected;
      console.log(trendName);
      const chartType = chartConfigs[trendName].chartType;
      const chartOptions = chartConfigs[trendName].chartOptions;

      let query = '';

      if (dateRange) {
        query = trendQueries[trendName](
          dateRange[0].format('YYYY'),
          dateRange[1].format('YYYY')
        );
      } else {
        query = trendQueries[trendName]();
      }

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
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </div>

          {selected && getQueryInteractable(selected)}

          {!hasData && selected && (
            <b>Click 'Run' to send the query to the server!</b>
          )}
        </Space>
      </Form>
      <br></br>
      <div className="highlights">
        <h4>Highlights</h4>
        <Highlights />
      </div>
      <div className="sidebar-footer">
        <div className="content">
          <div>
            <Button onClick={showQuery} disabled={!selected}>
              See Query
            </Button>
            <Button loading={loading} onClick={handleSubmit}>
              Run
            </Button>
          </div>
          <Button disabled={!selected || loading} onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}
