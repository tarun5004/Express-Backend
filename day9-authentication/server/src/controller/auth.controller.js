const User = require("../models/user.model");
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');

let registerController = (req, res) => {
    try {
        let { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

    let isExisted = await User.findOne({
        email,
    });
    if (isExisted){
        return res.status(400).json({
            message: 'User with this email already exists'
        })
    }

    // hash the password before saving to the database
    let hashedPassword = await bcrypt.hash(password, 10);

        let newUser = await User.create({
            name: username,
            email,
            password: hashedPassword,
            mobile: '1234567890' // Placeholder mobile number, you can modify this as needed
        });

        // authorization use JWT token and send to client for future use in protected routes
        
        let token = jwt.sign({
            id: newUser._id
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '1h'
        }
    )

        return res.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        return res.status(500).json
        ({
        message: 'Server error', 
        error: error.message
    });
    }
}

module.exports = {
    registerController
}