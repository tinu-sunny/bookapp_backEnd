const user = require('../models/userModel')
const books = require('../models/bookModel')

exports.useradminview = async(req,res)=>{
    

     
    try{

 const userdata = await user.find({ role: { $ne: "admin" } })
      res.status(200).json({ message: "data", userdata })

      
    }

    catch(err){
        console.log(err);
        res.send("error"+err)
        
    }

}

exports.getBooks = async(req,res)=>{

  try{
    const allbooks = await books.find()
    res.status(200).json({message:"all boook details",allbooks}) 
  }
  catch(err){
    console.log(err);
    
    res.status(400).json("error",err)
  }
}