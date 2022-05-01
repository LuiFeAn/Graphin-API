const jwt = require("jsonwebtoken");

const VerifyJwt = (req,res,next) => {

    const token = req.headers['authorization'];

    if(token){

        jwt.verify(token,"secret",(err,decode)=>{
            if(err) return res.status(500).json({error:"Not Found"});
            req.decode = decode;
            next();
        });

    }else{

        res.status(401).json({error:"Nenhum token foi enviado!"});

    }

}

module.exports = VerifyJwt;;