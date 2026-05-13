let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    password: String,
},
{
    timestamps: true,
});

let userModel = mongoose.model("users", userSchema);
module.exports = userModel;