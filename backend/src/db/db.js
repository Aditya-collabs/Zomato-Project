//Connecting the server to Database

const mongoose = require('mongoose');


function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("MongoDB Connected")
    })
    .catch((error)=>{
        console.log("MongoDB Connected error",error);
    });
    
}

module.exports = connectDB;   