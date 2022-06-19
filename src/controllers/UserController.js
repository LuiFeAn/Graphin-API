const UserRepository = require("../repositories/UserRepository");

class UserController {

    async index(req,res){

        const {username} = req.query;

        if(username){

            try{

                const users = await UserRepository.getUsersByName(
                    username,
                )

                return res.json(
                    users,
                ).status(200);

            }catch(err){

                res.json({
                    err
                }).status(400);

            }

        }

    }

    async show(req,res){

        const {id} = req.params;

        if(id){

            try{

                const user = await UserRepository.getUserByNameOrId(
                    id,
                );


                res.json(
                    user
                ).status(200);

            }catch(err){

                return res.json({
                    err,
                }).status(400);

            }
            
        }

    }

    async store(req,res){

        const {name,email,password} = req.body;

        try{

            const [userExists] = await UserRepository.findByEmail(email);

            if(userExists) return res.json({
                msg:"Este email já está em uso !"
            }
            ).status(400);
            
            await UserRepository.create(
                name,
                email,
                password
            );

            return res.json({
                msg:"USUÁRIO CRIADO COM SUCESSO !!"
            }).status(200);

        }catch(err){

            return res.json(err).status(400);

        }

    }

    async update(req,res){
        
        const {email,password,userbio} = req.body;
        const {file} = req;
        const {user_id} = req.decode;

        if(email && password && userbio){

            try{

                const findOne = await UserRepository.findByReq(user_id);
                await UserRepository.update(username || findOne[0].user_name,email || findOne[0].user_email, password || findOne[0].user_password,userbio || findOne[0].user_bio,req.decode.user_id);
                return res.json({
                    error:"Informações atualizadas com sucesso!"
                }
                ).status(200);
    
            }catch(err){
    
                return res.json(err).status(400);
    
            }

        }
       
        if(file){

            const {file} = req;
            const {user_id} = req.decode;

            try{

                await UserRepository.updateUserPhoto(
                    file.path,
                    user_id
                );

                res.json({
                    msg:"Foto De Perfil Atualizada !"
                }).status(200);

            }catch(err){

                return res.json(err).status(400);

            }
        }

    }
}

module.exports = new UserController();