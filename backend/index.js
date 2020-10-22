const express = require('express');
const bodyParser = require('body-parser');
const pingme = require('./endpoints/pingme');

const port = process.env.PORT || 5000;

require('dotenv').config();

async function bootstrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(port, () => console.log(`Express listening on ${port}`));

  // test route
  app.get('/pingme', pingme);

  // EXAMPLE WITH MIDDLEWARE
  // app.get('/pingme', validateQuery, pingme);
}

bootstrap();
