var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'care_admin',
    password: '1320',
    database: 'care_system'
})

connection.connect()
var sqlres;
connection.query('SELECT * from c_user', function (err, rows, fields) {
    if (err) throw err

    sqlres = rows[1].nname;
})

connection.end()

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send(sqlres);
});

module.exports = router;