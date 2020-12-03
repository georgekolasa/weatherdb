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
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <br></br>
      <ExampleQuery />
      <br></br>
      <br></br>
      <div className="container">
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt utl abore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur?
        </p>
      </div>
      {/* look at this: https://undraw.co/illustrations */}

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
              alt="world"
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
              alt="world"
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
              alt="google-chart"
              src="https://charitydigitalmarketplace.org/wp-content/uploads/2018/03/kBBKohva_400x400.jpg"
            />
          }
        ></Card>

        {/* look at this: https://undraw.co/illustrations */}
      </div>
    </div>
  );
}
