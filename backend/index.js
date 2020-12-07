const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
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

  app.post('/api/select', validateQuery, async (req, res) => {
    const { query } = req.body;
    console.log('query is', query);
    if (!connection) {
      res.status(504).send('Connection to the Database has been lost!');
    } else {
      try {
        let queryResponse = await connection.execute(query);

        const { metaData, rows } = queryResponse;
        console.log('RAW ROWS:', rows);

        const cols = metaData.map((col) => col.name);

        const ret = [cols, ...rows];

        console.log('RETURN VALUE:', ret);

        res.send(ret);
      } catch (error) {
        console.log(error);
        res.status(500).send(error);
      }
    }
  });

  app.post('/api/count', async (req, res) => {
    const { query } = req.body;
    if (!connection) {
      res.status(504).send('Connection to the Database has been lost!');
    } else {
      try {
        let queryResponse = await connection.execute(query);

        console.log(queryResponse);
        const { metaData, rows } = queryResponse;

        const cols = metaData.map((col) => col.name);

        const countRow = rows[0];

        let counts = {};
        for (let i = 0; i < cols.length; i++) {
          counts[cols[i].toLowerCase()] = countRow[i];
        }

        res.send(counts);
      } catch (error) {
        console.log(error);
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
