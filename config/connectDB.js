const mongoose = require ('mongoose')
const config = require ('config')
const connect =()=>{
    mongoose.connect(config.get("MONGO_URI"), { useNewUrlParser: true , useUnifiedTopology: true  })
    .then(()=>console.log("connected"))
    .catch((err)=>console.log("failed"))
}

module.exports = connect