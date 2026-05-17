const User = require("../models/user.model");
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');


let registerController = async (req, res) => {
    try {
        let { name, email, password, mobile } = req.body;

        if (!name || !email || !password || !mobile) {
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
    let hashedPassword = await bcrypt.hash(String(password), 10);

        let newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            mobile: String(mobile)
        });

        // authorization use JWT token and send to client for future use in protected routes
        
        let token = jwt.sign({
            id: newUser._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    )
        res.cookie('token', token, {
            httpOnly: true
        });


        return res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
            token
        });
    } catch (error) {
        return res.status(500).json
        ({
        message: 'Server error', 
        error: error.message
    });
    }
}

let loginController = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        let isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        let token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.cookie('token', token, {
            httpOnly: true
        });

        return res.status(200).json({
            message: 'User logged in successfully',
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports = {
    registerController,
    loginController
}
