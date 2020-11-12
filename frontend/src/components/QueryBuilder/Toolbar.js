import { Button, notification } from 'antd';
import React from 'react';
import axios from 'axios';
import './styles/Toolbar.css';

export default function ToolBar() {
  function createNotification(description) {
    notification.open({
      message: 'Notification Title',
      description,
      duration: 0,
    });
  }

  async function testQuery() {
    const response = await axios
      .post('/api/select')
      .catch((error) => error.response);

    if (response.status === 200) {
      createNotification(JSON.stringify(response.data));
    } else {
      createNotification('Uh oh, something went wrong');
    }

    console.log(response);
    // TODO: store in state
  }

  return (
    <div className="toolbar-layout">
      <Button className="toolbar-btn" size="large">
        See X Chart
      </Button>
      <Button className="toolbar-btn" size="large">
        Visualization 2
      </Button>
      <Button className="toolbar-btn" size="large" onClick={testQuery}>
        Test Select Query
      </Button>

      <Button className="toolbar-btn" size="large">
        Download
      </Button>
    </div>
  );
}
