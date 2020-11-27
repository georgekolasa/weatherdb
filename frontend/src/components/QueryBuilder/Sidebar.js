import React from 'react';
import QueryForm from './QueryForm';
import { Button, Typography } from 'antd';
import './styles/Sidebar.css';

const { Title } = Typography;

function SidebarFooter() {
  return (
    <div className="sidebar-footer">
      <div className="content">
        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <Title level={4}>What would you like to know?</Title>

      <QueryForm />

      <SidebarFooter />
    </div>
  );
}
