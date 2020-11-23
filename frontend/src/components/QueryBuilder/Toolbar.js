import { Button } from 'antd';
import React from 'react';
import axios from 'axios';
import './styles/Toolbar.css';
import useQuery from '../../util/useQuery';

export default function ToolBar() {
  const { testTrend } = useQuery();

  async function handleClick() {
    await testTrend();
  }

  return (
    <div className="toolbar-layout">
      <Button className="toolbar-btn" size="large">
        See X Chart
      </Button>
      <Button className="toolbar-btn" size="large">
        Visualization 2
      </Button>
      <Button className="toolbar-btn" size="large" onClick={handleClick}>
        Test Select Query
      </Button>
      <Button className="toolbar-btn" size="large">
        Download
      </Button>
    </div>
  );
}
