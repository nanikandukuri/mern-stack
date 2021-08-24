const mysql = require("mysql");
const config = {
  host: "remotemysql.com",
  port: 3306,
  user: "eW1zUJ8LHH",
  password: "pNiW3Tuko8",
  database: "eW1zUJ8LHH",
};

const connection = mysql.createConnection(config);

connection.connect((error) => {
  if (!error) {
    console.log("Database connected");
  } else {
    console.log("Database not connected");
  }
});

module.exports = connection;
