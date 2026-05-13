const { default: mongoose } = require("mongoose");

let connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://Gaur5004:Gaur8858@cluster1.la5msuu.mongodb.net/Gaur5004")
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

module.exports = connectDb;