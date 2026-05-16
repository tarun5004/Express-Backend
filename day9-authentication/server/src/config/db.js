let mongoose = require('mongoose');


let connectDB = async () => {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to the database successfully: ${connection.connection.host}`);
    } catch (error) {
        console.log("Error connecting to the database: ", error);
        throw error;
    }
}

module.exports = connectDB;
