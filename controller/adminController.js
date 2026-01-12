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


exports.profileUpdate = async(req,res)=>{
    const {username,password,bio,profile}=req.body
    const {userMail , role}=req.payload 
     const UploadedProfile = req.file? req.file.filename:profile
     console.log(UploadedProfile);
     
    try{
       const update = await user.findOneAndUpdate({email:userMail},{$set:{username,password,bio,profile:UploadedProfile}},{new:true})
       await update.save()
       console.log(update);
       
       res.status(200).json({message:"updated",update})
    }
    catch(err){
        console.log(err);
        res.status(403).json({message:'err'+err})
        
    }
}