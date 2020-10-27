import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate('examples')}>See Examples Page</Button>
      <Button onClick={() => navigate('query')}>See Query Builder Page</Button>

      <p>todo: this will be the landing page</p>
      <p>
        todo: remove buttons above once a). examples page is removed and b).
        landing page made with link to query builder page
      </p>
    </div>
  );
}
