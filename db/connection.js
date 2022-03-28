const mysql = require('mysql');
module.exports = mysql.createConnection({
    host: "localhost",
    port: 3301,
  
    // Your username
    user: 'root',
  
    // Your password
    password: '1234',
    database: 'employee_db'
  });