const mysql = require("../database");

function ExecuteQuery(query,values){

    return new Promise((resolve,reject) => {

        mysql.query(query,values,(err,result) => {
            if(err) return reject(err);
            return resolve(result);
        });

    })

}

module.exports = ExecuteQuery;