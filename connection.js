const mySQL = require('mysql');

const db = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "20@hmeD02",
    database:"assigndb",
});

  // Connect to the database
  db.connect((err)=> {
    if (err) throw err; {
        console.log("connected to mySQL!!")
    }
  });
  module.exports = db;