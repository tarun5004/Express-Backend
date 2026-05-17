let mongoose = require('mongoose');


let connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL is missing in .env');
        }

        let connection = await Promise.race([
            mongoose.connect(process.env.MONGO_URL, {
                serverSelectionTimeoutMS: 10000
            }),
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error('MongoDB connection timed out after 10 seconds'));
                }, 10000);
            })
        ]);

        console.log(`Connected to the database successfully: ${connection.connection.host}`);
    } catch (error) {
        console.log("Error connecting to the database: ", error);
        throw error;
    }
}

module.exports = connectDB;
