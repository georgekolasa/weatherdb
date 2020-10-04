const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// TODO add body parser and stuff
async function bootstrap() {
  app.listen(port, () => console.log(`Express listening on ${port}`));

  // test route
  app.get("/pingme", (req, res) => {
    res.send("Woah, thanks for the ping");
  });
}

bootstrap();
