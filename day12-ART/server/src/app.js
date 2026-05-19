let express = require('express');
let app = express();
let cookieParser = require('cookie-parser');
let authRoutes = require('./routes/auth.routes');
let postsRoutes = require('./routes/posts.routes');

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);



module.exports = app;
