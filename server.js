const express = require('express')
const app = express()
const port =5000;
const connect = require ('./config/connectDB')
const router = require('./routes/person')

//database connection
connect()
app.use(express.json())
app.use("/user", router)
//Port 
app.listen(port,(error)=>{
    error ? console.log("Connection failed") : console.log(`Server in running on port ${port}`)
})
