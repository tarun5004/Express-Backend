let mongoose = require('mongoose');

let connectDB = async () => {
    try {
        await Promise.race([
            mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 10000
            }),
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error('MongoDB connection timed out after 10 seconds'));
                }, 10000);
            })
        ]);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;
