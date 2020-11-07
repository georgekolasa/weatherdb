import React from 'react';
import { Spin } from 'antd';
import { useStore } from '../stores';

// This is the spinner/loader that will be used when the global loading state changes
export default function PageLoader() {
  const loading = useStore((state) => state.loading);

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div style={{ position: 'relative' }}>
        <Spin size="large" spinning={loading} />
      </div>
    </div>
  );
}
