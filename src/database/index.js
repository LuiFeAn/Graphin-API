const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
})

db.getConnection((err)=>{
    if(err) return console.log(err);
    console.log("Conexão com o Banco De Dados estabelecida !");
})

module.exports = db;