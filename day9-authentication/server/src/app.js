let express = require('express');
let authRoutes = require('./router/auth.routes');

app.use(express.json());
app.use('/api/auth', authRoutes);


let app = express();


module.exports = app;