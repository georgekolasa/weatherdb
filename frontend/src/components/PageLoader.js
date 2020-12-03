import React from 'react';
import { Spin } from 'antd';
import { useStore } from '../stores';
import CenteredDiv from './CenteredDiv';

// This is the spinner/loader that will be used when the global loading state changes
export default function PageLoader() {
  const loading = useStore((state) => state.loading);

  return (
    <CenteredDiv>
      <Spin size="large" spinning={loading} />
    </CenteredDiv>
  );
}

export function AlwaysOnLoader() {
  return (
    <CenteredDiv>
      <Spin size="large" spinning={true} />
    </CenteredDiv>
  );
}

export function ControlledLoader({ loading }) {
  return (
    <CenteredDiv>
      <Spin size="large" spinning={loading} />
    </CenteredDiv>
  );
}
