const mognoose = require('mongoose')


const saveSchema = new mognoose.Schema({
    user: {
        type: mognoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    food: {
        type: mognoose.Schema.Types.ObjectId,
        ref: "food",
        required: true
    }
}, { 
    timestamps: true 
})


const saveModel = mognoose.model("save", saveSchema)

module.exports = saveModel;