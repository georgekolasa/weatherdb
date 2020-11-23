import React from 'react';
import Sidebar from '../../components/QueryBuilder/Sidebar';
import ToolBar from '../../components/QueryBuilder/Toolbar';
import Visualization from '../../components/Visualization/Visualization';
import './styles/QueryBuilder.css';

export default function QueryBuilder() {
  return (
    <div className="query-builder-layout">
      <Sidebar />
      <div className="query-builder-central-layout">
        <ToolBar />
        <Visualization />
      </div>
    </div>
  );
}
