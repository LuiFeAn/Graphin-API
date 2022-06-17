const { promise } = require("../database");
const mysql = require("../database");

class PhotoRepository{

    getPhotoById(username){
        return new Promise((resolve)=>{
            const query = "SELECT * FROM photos WHERE user_id = ?";
            mysql.query(query,[username],(err,user)=>{
                if(err) return resolve(err);
                resolve(user);
            })
        })
    }

    getUserPhotosById(userid){

        return new Promise((resolve)=>{
            const query = `SELECT * FROM photos WHERE user_id = ?`;
            mysql.query(query,[userid],(err,re)=>{
                if(err) return resolve(false);
                resolve(re);
            })
        })
    }

    addPhoto(photo,userid){
        return new Promise((resolve)=>{
            const query = `INSERT INTO photos (user_photo,user_id) VALUES (?,?)`;
            mysql.query(query,[photo,userid],(err,re)=>{
                if(err) resolve(false)
                resolve(true);
            })
            
        })
    }
}

module.exports = new PhotoRepository();