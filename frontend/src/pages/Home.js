import React from 'react';
import Header from '../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Typography } from 'antd';
import LazyHero from 'react-lazy-hero';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      {/* options: http://react-lazy-hero.danielstefanovic.com/ */}
      <LazyHero
        opacity={0.4}
        minHeight={'75vh'}
        parallaxOffset={100}
        style={{ overflow: 'hidden' }}
        imageSrc="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2821&q=80"
      >
        <h1>Generic Startup Hype Headline</h1>
        <Space direction="horizontal" size="middle">
          <Button onClick={() => navigate('examples')}>
            See Examples Page
          </Button>
          <Button onClick={() => navigate('query')}>
            See Query Builder Page
          </Button>
        </Space>
      </LazyHero>

      <Typography.Title>What is WeatherDB?</Typography.Title>
      <Typography.Text>Currently, its very ugly.</Typography.Text>

      {/* look at this: https://undraw.co/illustrations */}
    </div>
  );
}
