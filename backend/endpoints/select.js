module.exports = async function select(req, res) {
  const TABLE_PREFIX = process.env.DB_OWNER_USER;

  // await require so the promise gets resolved
  const connection = await require('../config/db');

  if (!connection) {
    res.status(504).send('Connection to the Database has been lost!');
  } else {
    try {
      let testResponse = await connection.execute(
        `SELECT * FROM ${TABLE_PREFIX}.STATION WHERE ROWNUM < 20`
      );
      res.send(testResponse.rows);
    } catch (error) {
      res.status(500).send(error);
    }
  }
};
