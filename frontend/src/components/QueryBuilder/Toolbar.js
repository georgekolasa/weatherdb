import { Button } from 'antd';
import React, { useState } from 'react';
import './styles/Toolbar.css';
import useQuery from '../../util/useQuery';
import DownloadModal from '../DownloadModal';
import { useStore } from '../../stores';

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
      <DownloadModal />
    </div>
  );
}
