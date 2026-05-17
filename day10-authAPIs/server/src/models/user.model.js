let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
        minlength: [10, 'Mobile number must be at least 10 characters long'],
        maxlength: [15, 'Mobile number must be at most 15 characters long']
    }
},
{
    timestamps: true
});

let User = mongoose.model('User', userSchema);

module.exports = User;