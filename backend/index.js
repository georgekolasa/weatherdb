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

  if (process.env.NODE_ENV === 'production') {
    const root = require('path').join(__dirname, '..', 'frontend', 'build');
    app.use(express.static(root));
    app.get('*', (req, res) => {
      res.sendFile('index.html', { root });
    });
  }

  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '..', 'frontend/build/index.html'));
  // });
}

bootstrap();
