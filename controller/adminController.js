const user = require('../models/userModel')


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