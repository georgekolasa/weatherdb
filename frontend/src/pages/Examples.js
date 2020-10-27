import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  DatePicker,
  Space,
  notification,
  Modal,
  Switch,
  Select,
  Table,
} from 'antd';

import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

export default function Examples() {
  const [visible, setVisible] = useState(false);

  async function ping(e) {
    e.preventDefault();

    const res = await axios.get('/pingme').catch((error) => {
      console.log(error.response);
    });

    if (res && res.data) {
      alert(JSON.stringify(res.data));
    } else {
      alert('Error: maybe express server is not running?');
    }
  }

  function createNotification() {
    notification.open({
      message: 'Notification Title',
      description:
        'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
      duration: 0,
    });
  }

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div>
      <Title>Testing out some of Ant Design's components</Title>
      <Paragraph>
        I'm just going to throw a BUNCH of components in this page to see how
        they look
      </Paragraph>
      <Modal
        title="Woah, cool modal!"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
      <Space direction="vertical" size={12}>
        <Button onClick={ping}>ping the server</Button>

        <RangePicker />

        <Button type="primary" onClick={() => setVisible(true)}>
          Display a centered modal
        </Button>

        <Button type="default" onClick={createNotification}>
          Create Notification
        </Button>

        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />

        <Select defaultValue="lucy" style={{ width: 120 }}>
          <Select.Option value="jack">Jack</Select.Option>
          <Select.Option value="lucy">Lucy</Select.Option>
          <Select.Option value="disabled" disabled>
            Disabled
          </Select.Option>
          <Select.Option value="Yiminghe">yiminghe</Select.Option>
        </Select>
      </Space>
      <div
        style={{
          maxWidth: '60vw',
          marginTop: '4rem',
        }}
      >
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
}
