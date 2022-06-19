const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");
const PhotoRepository = require("../repositories/PhotoRepository");

class LoginController {

    async authenticated(req,res){

        const {decode} = req;

        if(decode){

            const {user_id} = decode;

            try{

                const [user] = await UserRepository.findById(
                    user_id
                );

                const photos = await PhotoRepository.getPhotoById(
                    user_id,
                );

                return res.json({
                    user,
                    photos,
                }).status(200);

            }catch(err){

                return res.json({
                    err
                }).status(400);

            }
            
        }
    }

    async authenticate(req,res){

        const {email,password} = req.body;

        if(email && password){

            try{

                const [user] = await UserRepository.findByEmailAndPassword(
                    email,
                    password
                );

                if(!user) return res.json({
                    error:"Usuário ou senha incorreto(s) !"
                }).status(400);
        
                const token = jwt.sign({
                    user_id:user.user_id,
                    user_name:user.username,
                },
                "secret",
                {
                    expiresIn:"10h"
                });
    
                return res.status(200).json({
                    token,
                    auth:true
                });
        
    
            }catch(err){
    
                return res.json({
                    err,
                });
    
            }

        }

        
    }

    

    

}

module.exports = new LoginController();