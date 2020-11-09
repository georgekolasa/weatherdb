const oracledb = require('oracledb');

// I think this creates a new connection on EACH require,
// which will significantly slow down the connection...

// TODO: we need to figure out a way to share a connection properly,
// more like a pool

const connection = oracledb.getConnection({
  user: process.env.NODE_ORACLEDB_USER,
  password: process.env.NODE_ORACLEDB_PASSWORD,
  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING,
  externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
});

module.exports = connection;
