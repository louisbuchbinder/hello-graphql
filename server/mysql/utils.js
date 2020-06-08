const { promisify } = require('util');
const mysql = require('mysql');
const config = {
  host: 'mysql.local',
  user: 'root',
  ssl: {
    rejectUnauthorized: false
  },
  password: 'password',
  database: 'sample',
};

const query = function (sql, replacements, callback) {
  if (typeof replacements === 'function') {
    callback = replacements;
    replacements = [];
  }

  const connection = mysql.createConnection(config);

  connection.connect();
  connection.query(sql, replacements, callback);
  connection.end(); 
};

module.exports.query = promisify(query);
