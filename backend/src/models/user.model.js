//yaha mongoose import kar rahe hain
const mongoose = require('mongoose');

//User ka Schema (blueprint) bana rahe hain
const userSchema = new mongoose.Schema({ //Schema mongoDB ka ek tool hai jo ki construct krta hai blue print aur 'new' ek naya object banane me madat krta hai
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
    }
}, {
    timestamps: true // timestamps mtlb ye batata hai ki aapka user kab create hua tha kab update hua tha ye chize database bata hai 
})  

//Schema se Model bana rahe hain
const userModel = mongoose.model("user", userSchema); // .model(), Mongoose ka method hai jo schema ko MongoDB collection se connect karke ek model banata hai, jiske through hum database me data create, read, update aur delete karte hain.

//Model ko export kar rahe hain
module.exports = userModel; 

/* 
Schema = blueprint
Model = worker
Collection = storage 
*/