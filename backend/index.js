const express = require('express');
const bodyParser = require('body-parser');
const pingme = require('./endpoints/pingme');
const select = require('./endpoints/select');

require('dotenv').config();

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.listen(port, () =>
    console.log(`Express server listening to http://localhost:${port}`)
  );

  // test route
  app.get('/pingme', pingme);

  app.post('/api/select', select);

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
