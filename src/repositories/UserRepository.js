const mysql = require("../database");

class UserRepository{

    findByEmailAndPassword(email,password){

        return new Promise((resolve,reject)=>{
            
            const query = `SELECT * FROM users
            WHERE user_email = ? AND user_password = ?`;
            mysql.query(query,[email,password],(err,user)=>{

            if(err) return reject(err)
            resolve(user);

        });
        })

    }

    findByReq(id){

        return new Promise((resolve,reject)=>{

            const query = `SELECT * FROM users
            WHERE user_id = ?`;
            mysql.query(query,[id],(err,user)=>{

                if(err) return reject(err);
                resolve(user);

            })

        })
    }

    findByEmail(email){

        return new Promise((resolve,reject)=>{

            const query = `SELECT user_name
            FROM users
            WHERE user_email = ?`;

            mysql.query(query,[email],(err,re)=>{
                
                if(err) return reject();

                return resolve(re);
                
            })

        })

    }

    getUserByName(name){

        return new Promise((resolve,reject)=>{

            const query = "SELECT user_name,user_bio,user_pic FROM users WHERE user_name LIKE ?";

            mysql.query(query,[`%${name}%`],(err,users)=>{
                
                if(err) return reject(err);

                resolve(users);

            })
            
        })

    }

    create(username,email,password){
        
        return new Promise((resolve,reject)=>{

            const query = `INSERT INTO users
            (user_name,user_email,user_password) VALUES (?,?,?)`;

            mysql.query(query,[username,email,password],(err)=>{
                

                if(err) return reject("Não foi possível realizar o cadastro!");

                resolve("Cadastrado com sucesso!");

            })

        })

    }

    update(username,useremail,userpassword,userbio,userid){
        
        return new Promise((resolve,reject)=>{

            const query = "UPDATE users SET user_name = ?, user_email = ?, user_password = ?, user_bio = ? WHERE user_id = ?";

            mysql.query(query,[username,useremail,userpassword,userbio,userid],(err)=>{

                if(err) reject(false);

                resolve(true);

            });

        })

    }

    updateUserPhoto(photo,userid){

        return new Promise((resolve,reject)=>{
            const query = `UPDATE users SET user_pic = ? WHERE user_id = ?`

            mysql.query(query,[photo,userid],(err,up)=>{
                if(err) return reject(false);
                resolve(true);
            })
        })

    }
}

module.exports = new UserRepository();