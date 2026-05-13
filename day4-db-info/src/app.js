const express = require('express');
const userModel = require('./models/user.model');

const app = express();

app.use(express.json());

app.post('/create-user', async (req, res) => {
    try {
        let { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        let newUser = await userModel.create({
            name,
            email,
            mobile,
            password
        });

        return res.status(201).json({
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

app.get('/users', async (req, res) => {
    try {
        let users = await userModel.find();

        return res.status(200).json({
            message: "Users retrieved successfully",
            users
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving users",
            error: error.message
        });
    }
});

app.get('/users/:id', async (req, res) => {
    let {id} = req.params;
    let user = await userModel.findById(id);

    if (!user) {
        return res.status(404).json ({
            message: "User not found"
        })
    }   else {        
        return res.status(200).json({
            message: "User retrieved successfully",
            user
        })
    }
})

app.put(['/user/update/:id', '/users/update/:id'], async (req, res) => {
    try {
        let { name, email, mobile, password } = req.body;
        let { id } = req.params;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        let updatedUser = await userModel.findByIdAndUpdate(
            id,
            {
                name,
                email,
                mobile,
                password
            },
            {
                new: true
            }
        );

        // User not found
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {
        // console.error('Error updating user:', error);

        return res.status(500).json({
            message: "Error updating user",
            error: error.message
        });
    }
});

app.delete(['/user/delete/:id', '/users/delete/:id'], async (req, res) => {
    try {
        let {id} = req.params;
        let deleteduser = await userModel.findByIdAndDelete(id);

        if (!deleteduser) {
            return res.status(404).json({
                message: "User not found"
            });
        }else {
            return res.status(200).json({
                message: "User deleted successfully",
                user: deleteduser
            });
        }
    } catch (error) {
        // console.error('Error deleting user:', error);

        return res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
})
module.exports = app;
