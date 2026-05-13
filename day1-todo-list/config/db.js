let mongoose = require('mongoose');

let connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/todo-list');
        console.log('Connected to the database successfully');

    }catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = connectDb;

