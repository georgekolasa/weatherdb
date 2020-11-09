const express = require('express');
const bodyParser = require('body-parser');
const pingme = require('./endpoints/pingme');
const oracledb = require('oracledb');

require('dotenv').config();

const port = process.env.PORT || 5000;

const TABLE_PREFIX = process.env.DB_OWNER_USER;

async function bootstrap() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: process.env.NODE_ORACLEDB_USER,
      password: process.env.NODE_ORACLEDB_PASSWORD,
      connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING,
      externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
    });

    console.log('CONNECTED TO ORACLE YEET');

    const tables = await connection.execute(
      'SELECT table_name FROM all_tables ORDER BY table_name'
    );

    const stations = await connection.execute(
      `SELECT * FROM ${TABLE_PREFIX}.STATION`
    );

    console.log('ALL AVAILABLE TABLES:', tables.rows);
    console.log('STATION TABLE:', stations.rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(port, () =>
    console.log(`Express server listening to http://localhost:${port}`)
  );

  // test route
  app.get('/pingme', pingme);

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
