const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "The name is a mandatory field!"],
    },
    age: {
        type:String,
        required: [true, "The age is a mandatory field!"],
    },
    email: {
        type:String,
        lowercase: true,
        required: [true, "The e-mail is a mandatory field!"],
        unique: true
    }
});

// Model out of schema
const User = mongoose.model("User", userSchema, "Users");

module.exports = User;