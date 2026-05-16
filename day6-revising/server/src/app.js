let express = require('express');
let app = express();
let listRoutes = require('../routes/list.routes');

app.use(express.json());
app.use('/api/list', listRoutes);




module.exports = app;
