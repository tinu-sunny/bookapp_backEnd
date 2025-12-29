const jwt = require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("inside the jwt middleware");
    console.log(req.headers.authorization.slice(7));

    const token = req.headers.authorization.slice(7)

    try{
        const jwtVerification = jwt.verify(token,process.env.jwtkey)
        console.log(jwtVerification);
        
    }
    catch(err){
        res.status(402).json("authorization Error",err)
    }
    
    next()
    
}

module.exports = jwtMiddleware