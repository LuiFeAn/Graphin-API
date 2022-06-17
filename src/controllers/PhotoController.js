const PhotoRepository = require("../repositories/PhotoRepository");

class PhotoController{
    
    async index(req,res){


    }

    async show(req,res){

        const {id} = req.params;


        if(id){

            try{

                const photos = await PhotoRepository.getPhotoById(
                    id,
                );
    
                return res.json(photos);

            }catch(err){

                return res.json({
                    err,
                }).status(400);

            }
        }


    }
    async store(req,res){

        const {file} = req;

        const {user_id} = req.decode;

        if(file){
            
            const photo = await PhotoRepository.addPhoto(file.path,user_id);

            if(!photo){
                
                return res.status(400).json({error:"Upload não realizado !"});
            }
           
            if(!!photo){
                console.log("Foto Adicionada!");
                return res.json({msg:"Foto Adicionada Com Sucesso!"});
            }

        }
    }
    update(req,res){

    }
    delete(req,res){

    }
}

module.exports = new PhotoController();