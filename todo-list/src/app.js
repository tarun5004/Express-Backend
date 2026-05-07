const express = require('express');
const app = express();

app.use(express.json());

let users = [];

// Add user
app.post('/users', (req, res) => {

    users.push(req.body);

    return res.status(201).json({
        message: 'User added successfully',
        users
    });
});

// Get all users
app.get('/users', (req, res) => {

    return res.status(200).json({
        message: 'Users retrieved successfully',
        users
    });
});

app.patch('/users/update/:index', (req, res) => {
    let {index} = req.params;
    let {age} = req.body;

    users[index].age = age;
    return res.status(200).json({
        message: 'User updated successfully',
        users
    });

})

app.delete('/users/delete/:index', (req, res) => {
    let {index} = req.params;

    delete users[index];
    return res.status(200).json({
        message: 'User deleted successfully',
        users,
        deletedUser
    });
})
module.exports = app;