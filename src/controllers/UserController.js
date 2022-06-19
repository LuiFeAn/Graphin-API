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
        
        const {name,email,password,userbio} = req.body;
        const {file} = req;
        const {user_id} = req.decode;

        if(name || email || password || userbio){

            try{

                const [verifyEmail] = await UserRepository.findByEmail(email);

                if(verifyEmail) return res.json({
                    msg:'Email já existente ! por favor, insira um diferente.'
                }).status(400);

                const [user] = await UserRepository.findById(user_id);
                const {user_name,user_email,user_password,user_bio} = user;

                await UserRepository.update(
                    name ? name : user_name,
                    email ? email : user_email,
                    password ? password : user_password,
                    userbio ? userbio : user_bio,
                    user_id
                );

                return res.json({
                    msg:'Informações atualizadas com sucesso !'
                }).status(200);
    
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