import React from 'react';
import { Select, Input, Form, Space, Button} from 'antd';
import { useStore } from '../../stores';

import './styles/Form.css';

const { Option } = Select;

const fakeDatabaseColOptions = Array.from({ length: 5 }, (_, index) => (
  <Option key={String(index)}>{index}</Option>
));

export default function QueryForm() {
  // TODO: USE ME
  const setQueryData = useStore((state) => state.setQueryData);

  const onSubmit = (data) => {
    console.log(data);
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
          <Input name='Chart Type'/>
        </div>
        <div>
          <h4>Country</h4>
          <Input name='Country'/>
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
