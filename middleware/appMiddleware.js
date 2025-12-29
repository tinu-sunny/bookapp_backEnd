const appMiddleware=(req,res,next)=>{
    console.log("inside the app middleware");
    next()
    
}

module.exports = appMiddleware