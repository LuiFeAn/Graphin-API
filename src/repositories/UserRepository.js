const ExecuteQuery = require("../helpers/ExecuteQuery");

class UserRepository{

    async findByEmailAndPassword(email,password){

         
        const query = `SELECT * FROM users
        WHERE user_email = ? AND user_password = ?`;
        return await ExecuteQuery(query,[email,password]);

    }

    async findById(id){

        const query = `SELECT * FROM users
        WHERE user_id = ?`;
        return await ExecuteQuery(query,[id]);

    }

    async findByEmail(email){

        const query = `SELECT user_name
        FROM users
        WHERE user_email = ?`;
        return await ExecuteQuery(query,[email]);

    }

    async getUsersByName(name){

        const query = "SELECT user_id,user_name,user_pic FROM users WHERE user_name LIKE ?";
        return await ExecuteQuery(query,[`%${name}%`]);
        
    }

     async getUserByNameOrId(user){

        const query = "SELECT user_id,user_name,user_bio,user_pic FROM users WHERE user_name = ? OR user_id = ?";
        return await ExecuteQuery(query,[user]);

    }

    async getUserById(name){

        const query = "SELECT user_id, user_name,user_bio,user_pic FROM users WHERE user_name LIKE ?";
        return await ExecuteQuery(query,[`%${name}%`]);

    }

    async create(username,email,password){
        
        const query = `INSERT INTO users
        (user_name,user_email,user_password) VALUES (?,?,?)`;
        ExecuteQuery(query,[username,email,password]);

    }

    async update(username,useremail,userpassword,userbio,userid){
        
        const query = "UPDATE users SET user_name = ?, user_email = ?, user_password = ?, user_bio = ? WHERE user_id = ?";
        ExecuteQuery(query,[username,useremail,userpassword,userbio,userid]);

    }

    async updateUserPhoto(photo,userid){

        const query = `UPDATE users SET user_pic = ? WHERE user_id = ?`
        ExecuteQuery(query,[photo,userid]);
        
    }
}

module.exports = new UserRepository();