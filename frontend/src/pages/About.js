import React from 'react';
import Header from '../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import LazyHero from 'react-lazy-hero';
import './About.css';
import { Button, Space, Typography, Row, Col, Divider, Card } from 'antd';
import { LineChartOutlined, GlobalOutlined } from '@ant-design/icons';
import ExampleQuery from '../components/ExampleQuery';

const style = { background: '#0092ff', padding: '8px 0' };

export default function Home() {
  const navigate = useNavigate();
  const handleClick = () => {};

  return (
    <div>
      <Header />

      <LazyHero
        opacity={0.4}
        minHeight={'50vh'}
        parallaxOffset={100}
        style={{ overflow: 'hidden' }}
        imageSrc="https://www.mercurynews.com/wp-content/uploads/2020/08/SJM-L-LIGHTNING-0817-11.jpg"
      >
        <h1 className="mainTitle">About WeatherDB</h1>
        <Space direction="horizontal" size="medium"></Space>
      </LazyHero>

      <Typography.Title className="subheader">
        What is WeatherDB?
      </Typography.Title>

      <div className="container">
        <p>
          WeatherDB is an interactive tool for visualizing real world weather
          data. All of WeatherDB's data is sourced from NOAA's Daily
          Climatological Survey, a record of daily weather recordings from over
          115,000 weather stations around the globe.
        </p>
      </div>
      <br></br>
      <ExampleQuery />
      <br></br>
      <br></br>
      <div className="container">
        <p>
          With WeatherDB, you can finally achieve an accurate portayal of
          climate trends. From temperature to wind speed and even weather
          phenomena, WeatherDB brings the data to you, allowing you to customize
          your data selection and visualization.
        </p>
      </div>
      <br></br>
      <div className="container">
        <p>
          New to WeatherDB, highlights! You can now see highlights from your
          trend, including meta-analysis of the data and other key features. The
          highlights only focus on the important topics, so you can gain an
          accurate understanding of the trend instantly.
        </p>
      </div>
      <br></br>

      <Typography.Title className="subheader">
        How did we upload the data?
      </Typography.Title>
      <div className="container" style={{ flexDirection: 'column' }}>
        <img
          style={{ borderRadius: '0.325rem', marginBottom: '2rem' }}
          src={require('../assets/carbon.svg')}
        />

        <p>
          NOAA releases all of their data in .dly files, which are fixed length
          blocks of data without any delimeters. Characters within
          pre-structured ranges represent various different fields, and we
          developed multiple Python scripts to parse the .dly files,
          line-by-line, into class entity representations. We would then
          construct SQL INSERT queries for each of these objects
        </p>
      </div>
      {/* look at this: https://undraw.co/illustrations */}
      <div className="container" style={{ marginTop: '2rem' }}>
        <Button href="/query">Try WeatherDB today!</Button>
      </div>
      <br></br>
      <br></br>

      <div className="container">
        <Typography.Title>Powered by</Typography.Title>
      </div>
      <br></br>
      <div className="container">
        <Card
          bordered={false}
          style={{ width: 200 }}
          cover={
            <img
              className="logo"
              alt="react-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"
            />
          }
        ></Card>
        <Card
          bordered={false}
          style={{ width: 200 }}
          cover={
            <img
              className="logo"
              alt="oracle-logo"
              src="https://www.baaer.eu/wp-content/uploads/2018/07/Slide1.jpg"
            />
          }
        ></Card>
        <Card
          bordered={false}
          style={{ width: 200 }}
          cover={
            <img
              className="logo"
              alt="google-chart-logo"
              src="https://charitydigitalmarketplace.org/wp-content/uploads/2018/03/kBBKohva_400x400.jpg"
            />
          }
        ></Card>

        {/* look at this: https://undraw.co/illustrations */}
      </div>
    </div>
  );
}
