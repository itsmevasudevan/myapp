const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: { 
        type: String,
        required: [true,"Please add the UserName"],
    },
    email: {
        type: String,
        required: [true,"Please add the email address"],
        unique:[true,"Email address alrady taken"],
    },
    password: {
            type: String,
            required: [true, "Please enter the Password"],
    },

 }, {
        timestamps: true,
    }
 );

 module.exports = mongoose.model("User", userSchema)