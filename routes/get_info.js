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

function to_list(db_rows){
    res = []
    for (let i = 0; i < db_rows.length; i++) {
        res.push({
            id:db_rows[i].iid,
            avatar:db_rows[i].avatar,
            name:db_rows[i].nname,
            is_male:db_rows[i].gender,
            age:db_rows[i].birthday,
            height:db_rows[i].height,
            weight:db_rows[i].weight,
            is_allergic:db_rows[i].allergic,
            detail:db_rows[i].detail,
            prescription:db_rows[i].prescription
        })
    }
    return res;
}

router.post('/', async function(req, res, next) {
    const rows = await query('SELECT a.iid,a.detail,a.prescription,b.nname,b.gender,b.weight,b.height,b.birthday,b.allergic,b.avatar ' +
        'FROM (select * from c_info where sid=?) a join c_user b on a.uid=b.uid order by a.iid;',[req.body.sid]);
    if(req.body.iid>-1){
        await query('update c_info set prescription=? where iid=?',[req.body.content,req.body.iid]);
    }
    let send_list = to_list(rows);
    res.json(send_list);
});

module.exports = router;