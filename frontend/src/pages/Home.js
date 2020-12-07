import React from 'react';
import Header from '../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import LazyHero from 'react-lazy-hero';
import './Home.css';
import { Button, Space, Typography, Card } from 'antd';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      <LazyHero
        opacity={0.4}
        minHeight={'75vh'}
        parallaxOffset={100}
        style={{ overflow: 'hidden' }}
        imageSrc="https://s.hdnux.com/photos/75/45/75/16146241/3/rawImage.jpg"
      >
        <h1 className="mainTitle">WeatherDB</h1>
        <Space direction="horizontal" size="large">
          <Button size="large" onClick={() => navigate('query')}>
            Get Started
          </Button>
          <Button size="large" onClick={() => navigate('about')}>
            About
          </Button>
        </Space>
      </LazyHero>
      <div style={{ padding: '15px' }}>
        <Typography.Title className="subheader">
          What is WeatherDB?
        </Typography.Title>

        <div className="container">
          <Card
            bordered={false}
            style={{ width: 250 }}
            cover={
              <img
                alt="world"
                src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/environmental_study_skau.svg"
              />
            }
          >
            <Typography.Text>
              See trends in global warming through a variety of climatological
              indicators.
            </Typography.Text>
          </Card>

          <span className="vDivider"></span>

          <Card
            bordered={false}
            style={{ width: 250 }}
            cover={
              <img
                alt="world"
                src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/world_9iqb.svg"
              />
            }
          >
            <Typography.Text>
              Taken from thousands of datapoints and weather stations from
              across the globe.
            </Typography.Text>
          </Card>

          <span className="vDivider"></span>

          <Card
            bordered={false}
            style={{ width: 250 }}
            cover={
              <img
                alt="visualize-data"
                src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/setup_analytics_8qkl.svg"
              />
            }
          >
            <Typography.Text>
              Customize your visualization of the data with custom time ranges
              and custom parameters.
            </Typography.Text>
          </Card>

          {/* look at this: https://undraw.co/illustrations */}
        </div>

        <br></br>

        <h3>
          <i>
            Big thanks to NOAA for providing the climatological data necessary
            for WeatherDB. The link to their data{' '}
            <a href="https://www.ncdc.noaa.gov/cdo-web/datasets">
              can be found here.
            </a>
          </i>
        </h3>
      </div>
    </div>
  );
}
