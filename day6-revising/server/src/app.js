let express = require('express');
let cors = require('cors');
let app = express();
let listRoutes = require('../routes/list.routes');

app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);
app.use(express.json());
app.use('/api/list', listRoutes);




module.exports = app;
