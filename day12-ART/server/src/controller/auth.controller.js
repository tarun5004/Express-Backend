const User = require('../models/user.model');
let bcrypt = require('bcrypt');

let registerController = async (req, res) => {
    try {
        let { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Name, email and password are required'
            });
        }

        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        let newUser = await User.create({
            name,
            email,
            password,
            role: role || 'user'
        });

        let token = newUser.generateAuthToken();

        res.cookie('token', token, {
            httpOnly: true
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
            token
        });
    } catch (error) {
        return res.status(500).json({
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

        let isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        let token = user.generateAuthToken();

        res.cookie('token', token, {
            httpOnly: true
        });

        return res.status(200).json({
            message: 'Login successful',
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
