const mongoose = require('mongoose')
 


mongoose.connect(process.env.connectionstring).then(res=>{
    console.log("db connected");

    
})

.catch(err=>{
    console.log("error"+err);
    
})