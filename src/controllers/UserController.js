const UserRepository = require("../repositories/UserRepository");
const jwt = require("jsonwebtoken");

class UserController {

    async index(req,res){
    
        const {email,password} = req.body;

        if(email && password){

            const user = await UserRepository.findByEmailAndPassword(email,password);
        
            if(user.length > 0){

                const token = jwt.sign({user_id:user[0].user_id,user_name:user[0].username},"secret",{expiresIn:"10h"});
                return res.status(200).json({token,auth:true});

            }else{

                return res.json({error:"Usuário ou senha incorreto(s) !"});
            }

        }



        if(req.decode.user_id){
            
            const user = await UserRepository.findByReq(req.decode.user_id);

            if(user.length > 0){

                return res.status(200).json(user);
            }
            else{

                return res.status(404);
            }

        }


    }

    async show(req,res){

        const {name} = req.params;
        
        if(name){

            const users = await UserRepository.getUserByName(name);

            if(users.length < 0){

                return res.status(404);

            }

            res.json(users);

        }

    }

    async store(req,res){

        const {name,email,password} = req.body;

        if(name && email && password){

            const userExists = await UserRepository.findByEmail(email);

            if(userExists.length > 0){

                return res.json({msg:"Este email já está em uso !"});

            }

            const create = await UserRepository.create(name,email,password);
            return res.json({msg:create});

        }

    }

    async update(req,res){

        const {email,password,userbio} = req.body;

        if(email && password && userbio){
            
            const findOne = await UserRepository.findByReq(req.decode.user_id);

            const updated = await UserRepository.update(username || findOne[0].user_name,email || findOne[0].user_email, password || findOne[0].user_password,userbio || findOne[0].user_bio,req.decode.user_id);

            if(!updated){
            
                return res.json({error:"Não foi possível atualizar as informações !"});

            }
        
            res.json({error:"Informações atualizadas com sucesso!"});

        }
       
        if(req.file){

            const updatePic = await UserRepository.updateUserPhoto(req.file.path,req.decode.user_id);

            if(!updatePic){
                return res.status(400);
            }

            res.status(200);

        }

    }
}

module.exports = new UserController();