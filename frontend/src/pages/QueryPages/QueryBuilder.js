import React from 'react';
import Preview from '../../components/QueryBuilder/Preview';
import Sidebar from '../../components/QueryBuilder/Sidebar';
import ToolBar from '../../components/QueryBuilder/Toolbar';
import './styles/QueryBuilder.css';

export default function QueryBuilder() {
  return (
    <div className="query-builder-layout">
      <Sidebar />
      <div className="query-builder-central-layout">
        <ToolBar />
        <Preview />
      </div>
    </div>
  );
}
