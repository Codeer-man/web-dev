require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require("./routes/product.routes")

const app = express()

mongoose.connect(process.env.MONGODB_URI).then((data)=>{
    console.log("Connected to database")
    
}).catch((err) =>{
    console.log(err);
    process.exit(1)
})

const PORT = process.env.PORT || 3000

app.use('/api',productRoutes)

app.listen(PORT,()=>{
    console.log(`Connected to server http://localhost:${PORT}`);
    
})