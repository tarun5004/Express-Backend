let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth.middleware');
let { postsController } = require('../controller/post.controller');

router.get('/', authMiddleware, postsController);

module.exports = router;
