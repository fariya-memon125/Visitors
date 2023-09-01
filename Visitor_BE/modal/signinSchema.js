const mongoose = require('mongoose')
const schema = mongoose.Schema
const SignIn = new schema({
    name: { type: String },
    company: { type: String },
    email: { type: String },
    password: { type: String },
    resetToken: { type: String },
    expireToken: { type: Date },
    resetTokenUsername: { type: String },
    expireTokenUsername: { type: Date },
    resetTokenPic: { type: String },
    expireTokenPic: { type: Date },
    resetTokenAccount: { type: String },
    expireTokenAccount: { type: Date },
    active: { type: Boolean },
    imgSrc:{type: String},
    role:{type: String},
    roleStatus: { type: Boolean },
    branchlocation: { type: String },
    visited: { type: String },
    appointments: { type: String },
    adminmail: { type: String },
    
})
module.exports = mongoose.model("signIn", SignIn)