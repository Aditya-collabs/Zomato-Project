const mongoose = require('mongoose');


const foodSchmea = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    video:{
        type: String, // string isliye q ki ham database me url store krtey hai
        required: true
    },
    description:{
        type: String,
    },
    foodPartner:{
        type: mongoose.Schema.Types.ObjectId, // is ka matlab hai ki is field me kisi doosre MongoDB document ka _id store hoga
        ref: "foodPartner" // aur ref batata hai ki wo ID kis model se related hai.
    },
    likeCount: {
        type: Number,
        default: 0
    }
})

const foodModel = mongoose.model("food",foodSchmea);


module.exports = foodModel;