const user = require('../models/userModel')
const jwt = require('jsonwebtoken')
// registration logic

exports.userRegister = async (req,res)=>{
   try{
        
     const {username,email,password}=req.body

     const existingUser = await user.findOne({email})

     if(existingUser){
       res.status(402).json("user  existing")
        
     }

     else{
       
        const newUser = new user({username,email,password})
        await newUser.save()
        res.status(200).json({ message:"resgi",newUser})
        
     }

   }

   catch(err){
    console.log(err);
    
   }
}

// user login 


exports.userLogin = async (req,res)=>{
    
         const {email,password}=req.body

         const activeUser = await user.findOne({email})
    try{
         if(activeUser && activeUser.password !=password){
            
            res.status(401).json('password miss match')
         }
         else if(activeUser && activeUser.password ===password){
                  
            const token = jwt.sign({userMail:activeUser.email,role:activeUser.role},process.env.jwtkey)
            console.log(token);
            

            res.status(200).json({message:"logined",activeUser,token})
         }
         else{
            res.status(404).json('not vaild user')
         }


    }

    catch(err){
        console.log(err);
        
    }
}



exports.googleEmailLogin=async(req,res)=>{

   const{email,password,profile,username}=req.body

   try{
      const existingUser =await user.findOne({email})
      if(existingUser){
         const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.jwtkey)
            console.log(token);
               res.status(200).json({message:"logined",existingUser,token})
      }
      else{
          const newUser = new user({username,email,password,profile})
        await newUser.save()
           const token = jwt.sign({userMail:newUser.email,role:newUser.role},process.env.jwtkey)
            console.log(token);
        res.status(200).json({ message:"login",existingUser:newUser,token})
      }
   }
   catch(err){
      res.status(500).json(err)
   }
}




exports.viewactiveusers = async (req,res)=>{

  const {userMail} =req.payload
  console.log(userMail);

  const userdata = await user.findOne({email:userMail})

  if(userdata){
   res.status(200).json({message:"active user",userdata})
  }
else{
   res.status(403).json({message:"data not found"})
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