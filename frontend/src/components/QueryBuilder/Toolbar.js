import { Button } from 'antd';
import React from 'react';
import './styles/Toolbar.css';

export default function ToolBar() {
  return (
    <div className="toolbar-layout">
      <Button className="toolbar-btn" size="large">
        See X Chart
      </Button>
      <Button className="toolbar-btn" size="large">
        Visualization 2
      </Button>
      <Button className="toolbar-btn" size="large">
        Something Else
      </Button>

      <Button className="toolbar-btn" size="large">
        Download
      </Button>
    </div>
  );
}
