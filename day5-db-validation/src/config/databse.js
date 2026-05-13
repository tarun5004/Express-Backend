let mongoose = require('mongoose');

let connectDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");
    } catch (error) {
            console.log("error in connecting to DB", error);
    }
}

module.exports =  connectDB ;