import { Button } from 'antd';
import React from 'react';
import './styles/Toolbar.css';
import useQuery from '../../util/useQuery';
import DownloadModal from '../DownloadModal';

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
      <DownloadModal />
    </div>
  );
}
