import React from 'react';
import { Select, Input, Form, Space, Button } from 'antd';
import { useStore } from '../../stores';

import './styles/Form.css';
import { CHART_TYPES } from '../../util/constants';
import shallow from 'zustand/shallow';

const { Option } = Select;

const fakeDatabaseColOptions = Array.from({ length: 5 }, (_, index) => (
  <Option key={String(index)}>{index}</Option>
));

export default function QueryForm() {
  const { chartConfig, setQueryData } = useStore(
    (state) => ({
      setQueryData: state.setQueryData,
      chartConfig: state.chartConfig,
    }),
    shallow
  );

  const onSubmit = (data) => {
    console.log(data);
  };
  //TODO: set chart options in state based on input
  // create query based on input

  return (
    <Form style={{ paddingTop: '1rem' }} onSubmit={onSubmit}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <h4>Fields</h4>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={[]}
          >
            {fakeDatabaseColOptions}
          </Select>
        </div>
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
          <h4>Country</h4>
          <Input name="Country" />
        </div>
        <div>
          <h4>Something</h4>
          <Input />
        </div>
        <div>
          <h4>Something</h4>
          <Input />
        </div>
        <div>
          <h4>Something</h4>
          <Input />
        </div>
        <div>
          <h4>Something</h4>
          <Input />
        </div>
        <div>
          <h4>Something</h4>
          <Input />
        </div>
        <div>
          <h4>Something</h4>
          <Input />
        </div>
      </Space>
    </Form>
  );
}
