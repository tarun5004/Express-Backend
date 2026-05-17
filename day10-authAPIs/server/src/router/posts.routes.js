let express = require('express');
let router = express.Router();
let { postsController } = require('../controller/post.controller');
let authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware, postsController);




module.exports = router;
