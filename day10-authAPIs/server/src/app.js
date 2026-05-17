let express = require('express');
let authRoutes = require('./router/auth.routes');
let postRoutes = require('./router/posts.routes');
let app = express();
let cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);



module.exports = app;
