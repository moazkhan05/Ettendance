var express = require('express')
var app = express();
const sql = require('mssql');
const config = {
  user: 'maaz',
  password: '123',
  server: 'localhost',
  database: 'Ettendance',
  requestTimeout: 15000,
  stream: true,
  parseJSON:true,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    keepAlive: false,
    encrypt: true,
    enableArithAbort: true,
  },
};

app.get('/allRecord', function(req, res) {
  console.log('App.get called');
  var request = new sql.Request();
  request
    //.input('in', sql.NVarChar, 'cs161118')
    .query('select empId ,fullName,password from tblEmployee ', function(err, recordset) {
    if (err) {
      return console.error(err);
    }

   res.send(recordset);
   res.end();
  });
});

// only start the express app once the DB connection is established
sql.connect(config, (err, pool) => {
  if (err) {
    return console.error(err);
  }
  console.log('DB connection established - starting web server');
  const server = app.listen(3000, function() {
    console.log('Web server is running.....');
  });
  server.on('close', sql.close.bind(sql));
});
