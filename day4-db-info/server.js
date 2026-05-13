const app = require('./src/app');
const connectDb = require('./src/config/db');

const startServer = async () => {
    await connectDb();

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
};

startServer();