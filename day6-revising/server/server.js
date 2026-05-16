require('dotenv').config(); // Load environment variables from .env file
let cors = require('cors');
const connectDB = require('./config/db');
let app = require('./src/app');

app.use(
    cors({
        origin: 'http://localhost:5173', // Allow requests from this origin
    })
)


connectDB(); // Connect to the database before starting the server

let PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});
