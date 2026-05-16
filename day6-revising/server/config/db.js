let mongoose = require('mongoose');

let connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, );
    } catch (error) {
        console.log("Error connecting to the database:", error);
    }
}

module.exports = connectDB;