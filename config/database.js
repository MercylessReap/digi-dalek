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

/*
con.query('SELECT * FROM test WHERE id = :id AND name = :name',
        { id: 1337, name: 'Frylock' },
        function(err, rows) {
  if (err)
    throw err;
  console.dir(rows);
});

*/