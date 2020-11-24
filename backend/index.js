const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const pingme = require('./endpoints/pingme');
const select = require('./endpoints/select');
const validateQuery = require('./middleware/validateQuery');

require('dotenv').config();

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const connection = await oracledb.getConnection({
    user: process.env.NODE_ORACLEDB_USER,
    password: process.env.NODE_ORACLEDB_PASSWORD,
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING,
    externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
  });

  app.listen(port, () =>
    console.log(`Express server listening to http://localhost:${port}`)
  );

  app.get('/pingme', pingme);

  app.post('/api/select', validateQuery, async (req, res) => {
    const TABLE_PREFIX = process.env.DB_OWNER_USER;

    if (!connection) {
      res.status(504).send('Connection to the Database has been lost!');
    } else {
      try {
        let testResponse = await connection.execute(
          `SELECT EXTRACT (YEAR FROM DATE_TAKEN), ROUND(AVG(VALUE), 2)
          FROM ${TABLE_PREFIX}.READING 
          INNER JOIN ${TABLE_PREFIX}.STATION USING (STATION_ID)
          WHERE ELEMENT='TAVG' AND COUNTRY='UK'
          AND EXTRACT (YEAR FROM DATE_TAKEN) > 1974
          GROUP BY EXTRACT (YEAR FROM DATE_TAKEN) 
          ORDER BY EXTRACT (YEAR FROM DATE_TAKEN) ASC`
        );
        console.log(testResponse);

        const { metaData, rows } = testResponse;
        const cols = metaData.map((col) => col.name);

        const ret = [cols, ...rows];

        res.send(ret);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  });

  // EXAMPLE WITH MIDDLEWARE
  // app.get('/pingme', validateQuery, pingme);

  // statically serves react built html pages when production mode
  if (process.env.NODE_ENV === 'production') {
    const root = require('path').join(__dirname, '..', 'frontend', 'build');
    app.use(express.static(root));
    app.get('*', (req, res) => {
      res.sendFile('index.html', { root });
    });
  }
}

bootstrap();

/**
 * 1). tuples uploaded: done
 * 2). connection established between node + oracle: done
 * 3). make the connection between react and node, therefore connecting oracle with frontend: done
 */
