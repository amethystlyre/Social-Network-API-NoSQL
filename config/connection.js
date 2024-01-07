const { connect, connection } = require('mongoose');

//Connect to DB
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialDB';

connect(connectionString);

module.exports = connection;