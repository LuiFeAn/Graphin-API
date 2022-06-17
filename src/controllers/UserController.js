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

            const userExists = await UserRepository.findByEmail(email);

            if(userExists.length > 0){
                return res.json({
                    msg:"Este email já está em uso !"}
                );
            }
            
            await UserRepository.create(
                name,
                email,
                password
            );

            return res.json({
                msg:"USUÁRIO CRIADO COM SUCESSO !!"
            });

        }catch(err){

            return res.json(err).status(400);

        }

    }

    async update(req,res){
        
        if(req.body.email && req.body.password && req.body.userbio){

            const {email,password,userbio} = req.body;
            const {user_id} = req.decode;

            try{

                const findOne = await UserRepository.findByReq(user_id);
                await UserRepository.update(username || findOne[0].user_name,email || findOne[0].user_email, password || findOne[0].user_password,userbio || findOne[0].user_bio,req.decode.user_id);
                res.json({
                    error:"Informações atualizadas com sucesso!"}
                );

            }catch(err){

                return res.json(err).status(400);

            }

        }
       
        if(req.file){

            const {file} = req;
            const {user_id} = req.decode;
            const updatePic = await UserRepository.updateUserPhoto(file.path,user_id);
            if(!updatePic){
                return res.status(400);
            }
            res.status(200).json({msg:"Foto De Perfil Atualizada !"});
        }

    }
}

module.exports = new UserController();