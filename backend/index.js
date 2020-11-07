const express = require('express');
const bodyParser = require('body-parser');
const pingme = require('./endpoints/pingme');
const oracledb = require('oracledb');
const dbConfig = require('./config/db');

require('dotenv').config();

const port = process.env.PORT || 5000;

async function bootstrap() {
  let connection;

  // TODO: I am not working, the dbConfig needs to be
  // properly configured, which it is currently not. The connection logic itself
  // is good, however.
  try {
    connection = await oracledb.getConnection(dbConfig);
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
