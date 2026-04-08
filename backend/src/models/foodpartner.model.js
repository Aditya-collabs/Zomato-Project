const mongoose = require("mongoose");

const foodpartnerSchmea = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    contactName:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true 
    },
    address:{
        type: String,
        required: true
    }
})

const foodPartnerModel = mongoose.model("foodpartner", foodpartnerSchmea) 

module.exports = foodPartnerModel;