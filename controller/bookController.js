const user = require('../models/bookModel')


exports.addbook = async (req,res)=>{
  try{  
    console.log("inside the function");
    res.send("req received...")}
    catch(err){
        console.log(err);
        
    }
    
}