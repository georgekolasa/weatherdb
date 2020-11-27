import React from 'react';
import { Select, Input, Form, Space, DatePicker, Checkbox } from 'antd';
import { useStore } from '../../stores';
import { CHART_TYPES, dbFields, countries } from '../../util/constants';
import shallow from 'zustand/shallow';
import './styles/Form.css';

const { RangePicker } = DatePicker;

const { Option } = Select;

const fakeDatabaseColOptions = Array.from({ length: 5 }, (_, index) => (
  <Option key={String(index)}>{index}</Option>
));

export default function QueryForm() {
  const { chartOptions, chartConfig } = useStore(
    (state) => ({
      chartConfig: state.chartConfig,
      chartOptions: state.chartOptions,
    }),
    shallow
  );

  function onSubmit(data) {
    console.log(data);
  }
  function toggleTrendline() {
    // TODO: implement me
  }
  function testDateChange(range) {
    if (range && Array.isArray(range)) {
      const from = range[0].format('YYYY-MM-DD');
      const to = range[1].format('YYYY-MM-DD');

      console.log(`${from}-${to}`);
      // TODO: STORE IN STATE OR JUST PUT SOMEWHERE TO BUILD QUERY
    } else {
      // RESET STATE FOR DATES
    }
  }

  //TODO: set chart options in state based on input
  // create query based on input

  return (
    <Form style={{ paddingTop: '1rem' }} onSubmit={onSubmit}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <h4>Fields</h4>
          <Select
            mode="multiple"
            // allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            // value = {}
            options={dbFields}
          >
            {fakeDatabaseColOptions}
          </Select>
        </div>
        <div>
          <h4>Countries</h4>
          <Select
            mode="multiple"
            // allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            // value = {}
            options={countries}
          >
          </Select>
        </div>
        <div>
          <h4>Date Range</h4>
          <RangePicker onChange={testDateChange} />
        </div>
        <Input.Group>
          <div>
            <h4>Latitude</h4>
            <Select style={{width: '50%'}}>
              <Option value='lessThan'>Less than</Option>
              <Option value='greaterThan'>Greater than</Option>
            </Select>
            <Input style={{width: '50%'}} placeholder='Enter Latitude'/>
          </div>
        </Input.Group>
        <Input.Group>
          <div>
            <h4>Longitude</h4>
            <Select style={{width: '50%'}}>
              <Option value='lessThan'>Less than</Option>
              <Option value='greaterThan'>Greater than</Option>
            </Select>
            <Input style={{width: '50%'}} placeholder='Enter Longitude'/>
          </div>
        </Input.Group>
        <div>
          <h4>Chart Type</h4>
          <Select
            style={{ width: '100%' }}
            options={Object.keys(CHART_TYPES).map((key) => {
              return { label: CHART_TYPES[key], value: CHART_TYPES[key] };
            })}
            name="Chart Type"
            value={chartConfig.chartType}
          />
        </div>

        <div>
          <Checkbox
            name = "Trendline"
            onChange={toggleTrendline}>
              Trendline
          </Checkbox>
        </div>
      </Space>
    </Form>
  );
}
