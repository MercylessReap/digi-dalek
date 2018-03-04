var mysql = require('mariasql');

var con = new mysql ({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_pass,
  db: process.env.db_name
  });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


con.query('SELECT * FROM Europe ',
  function(err, rows) {
    if (err)
      throw err;
    console.log(rows);
});

