const mongoose = require("mongoose")

const UserModel = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "password is required"],
        unique: false
    },

}, { timestamps: true })

module.exports = mongoose.model("User", UserModel)