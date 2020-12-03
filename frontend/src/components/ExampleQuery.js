import { Button, Space, Statistic } from 'antd';
import React, { useState } from 'react';
import createNotification from '../util/createNotification';
import useQuery from '../util/useQuery';

export default function ExampleQuery() {
  const { countQueries } = useQuery();

  const [loading, setLoading] = useState(false);
  const [stations, setStations] = useState();
  const [readings, setReadings] = useState();
  const [countries, setCountries] = useState();
  const [states, setStates] = useState();
  const [queryString, setQueryString] = useState('');

  async function handleClick() {
    setLoading(true);

    const { response, query } = await countQueries();

    if (response.status === 200) {
      console.log(response);
      const { stations, readings, states, countries } = response.data;

      setStations(stations);
      setReadings(readings);
      setCountries(countries);
      setStates(states);

      setQueryString(query);
    } else {
      createNotification({
        message: 'Error Occurred!',
        description: 'Please check the logs to debug',
      });
    }

    setLoading(false);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="example-query-container">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button size="medium" onClick={handleClick} loading={loading}>
            See how many records are in WeatherDB!
          </Button>
        </div>
        {stations && readings && (
          <React.Fragment>
            <div className="example-chart-container">
              <Space size="large">
                <Statistic center title="Stations" value={stations} />
                <Statistic title="Readings" value={readings} />
                <Statistic title="Countries" value={countries} />
                <Statistic title="States" value={states} />
                <Statistic
                  title="Total"
                  value={stations + readings + countries + states}
                />
              </Space>
            </div>

            <div
              style={{
                maxWidth: '20rem',
                overflow: 'scroll',
                margin: '0 auto',
                paddingTop: '1rem',
              }}
            >
              <pre>Query used above:</pre>
              <code>{queryString}</code>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
