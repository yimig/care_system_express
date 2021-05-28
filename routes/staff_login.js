var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'care_admin',
    password: '1320',
    database: 'care_system'
})
var staff_id='';

let query = function( sql, values ) {
    // 返回一个 Promise
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
}

router.post('/', async function(req, res, next) {
    const rows = await query('SELECT * from c_staff where sname=? and password=?',[req.body.sname,req.body.password]);
    res.json({
        result:rows.length>0,
        sid:rows.length>0?rows[0].sid:''
    })
});

module.exports = router;