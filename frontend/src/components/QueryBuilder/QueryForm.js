import React from 'react';
import { Select, Input, Form, Space } from 'antd';
import { useStore } from '../../stores';

import './styles/Form.css';

const { Option } = Select;

const fakeDatabaseColOptions = Array.from({ length: 5 }, (_, index) => (
  <Option key={String(index)}>{index}</Option>
));

export default function QueryForm() {
  // TODO: USE ME
  const setQueryData = useStore((state) => state.setQueryData);

  async function handleSumbit(e) {
    e.preventDefault();
    // this is where the query will need to be constructed,
    // or sent off to the helper functions that will each help build
    // some portion of the query...
    // once it is constructed, it will be posted to the server, and the return should
    // be interpretted based off status.
    // on sucess, store the data appropriately into the state management solution we
    // choose. notify of errors on faiures
    // ===========
    // outline:
    // toggle loading
    // check query
    // construct and send to server
    // get results
    // store results
    // toggle loading
  }

  return (
    <Form style={{ paddingTop: '1rem' }} handleSumbit={handleSumbit}>
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
