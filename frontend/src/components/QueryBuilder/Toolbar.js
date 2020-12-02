import { Button } from 'antd';
import React, { useState } from 'react';
import './styles/Toolbar.css';
import useQuery from '../../util/useQuery';
import DownloadModal from '../DownloadModal';
import { useStore } from '../../stores';

export default function ToolBar() {

  return (
    <div className="toolbar-layout">

      <DownloadModal />
    </div>
  );
}
