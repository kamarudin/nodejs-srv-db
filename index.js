var express = require('express')
var app = express()
var os = require('os')
mysql = require('mysql2'), // import mysql module
cors = require('cors'),
bodyParser = require('body-parser');
const date = require('date-and-time')
my_Count = 0

db = mysql.createConnection({
  host: 'mysql-ksdemo',
  port: '3306',
  user: 'ksdemo',
  password: 'ksdemo',
  database: 'ksdemodb'
})

app.get('/', function (req, res) {

  now  =  new Date();
  ts=date.format(now,'YYYY/MM/DD HH:mm:ss.SSS').toString();
  my_Host=os.hostname();
  my_Count = my_Count + 1;
  my_Msg = "Demo-0";

  res.setHeader('Content-Type', 'application/json');
  res.json({Timestamp: ts, Hostname: my_Host, Count: my_Count, Msg: my_Msg });

  let sql = `INSERT INTO mydata(host, count, msg, datetime) VALUES (?)`;
  let values = [
    my_Host,
    my_Count,
    my_Msg,
    ts
  ];
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
  })
}),
app.get('/list', function (rq, res) {
  let sql = `SELECT * FROM mydata`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Data lists retrieved successfully"
    })
  })

})

app.listen(8080, function () {
  console.log('Listening on port 8080...')
})
