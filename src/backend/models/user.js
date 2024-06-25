const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
         type: String, 
         default: null 
    },

    last_name: {
         type: String, 
         default: null 
    },
    email: {
         type: String, 
         default: null 
    },

    password: {
         type: String, 
         default: null 
    },

    token: {
         type: String 
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);