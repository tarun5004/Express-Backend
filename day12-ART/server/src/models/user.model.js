let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/],
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
}, 
{ 
    timestamps: true 

});

UserSchema.pre('save', function(next){
    if (!this.isModified('password')) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

UserSchema.methods.generateAuthToken = function(){
    let token = jwt.sign({
        id: this._id,
        role: this.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: '1h'
    })

    return token;
}


let User = mongoose.model('User-ART', UserSchema);

module.exports = User;
