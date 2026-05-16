require('dotenv').config();
let connectDB = require('./src/config/db');
let app = require('./src/app');

let PORT = process.env.PORT || 4000;

let startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log('Server not started because database connection failed');
        process.exit(1);
    }
}

startServer();
