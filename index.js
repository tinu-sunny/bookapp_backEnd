// import dotenv
// used to 
require('dotenv').config()

const express =require('express')

// import cors

const cors = require('cors')

require('./config/db')

const route = require('./router/route')
const appMiddleware = require('./middleware/appMiddleware')
const bookstore= express()



bookstore.use(cors())
bookstore.use(express.json())   
bookstore.use(appMiddleware) 
bookstore.use(route)
bookstore.use('/uploads',express.static('./uploads'))

bookstore.get('/',(req,res)=>{
    res.send('Welcome tho bookstore backend')
})

const PORT= 3000 || process.env.PORT 

bookstore.listen(PORT,()=>{
    console.log(` book srever  is runing in the port ${PORT}`);
    
})

