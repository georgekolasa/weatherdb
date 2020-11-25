import { Button } from 'antd';
import React from 'react';
import axios from 'axios';
import './styles/Toolbar.css';
import useQuery from '../../util/useQuery';
import QueryForm from './QueryForm';

export default function ToolBar() {
  const { selectQuery } = useQuery();

  async function handleClick() {
    await selectQuery();
  }

  return (
    <div className="toolbar-layout">
      <Button className="toolbar-btn" size="large" onClick={handleClick}>
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
