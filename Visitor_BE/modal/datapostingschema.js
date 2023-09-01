const mongoose = require('mongoose')
const schema = mongoose.Schema


const Dataposting = new schema({
    adminmail:{type:String},
    email: { type: String },
    name: { type: String },
    towhom:{type:String},
    address: { type: String },
    number:{type:String},
    entrytime:{type:String},
    exittime:{type:String},
    comments:{type:String},
    reason: { type: String },
})


module.exports=mongoose.model('Datatable',Dataposting)