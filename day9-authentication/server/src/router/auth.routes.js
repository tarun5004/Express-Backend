let express = require('express');
let router = express.Router();

let { registerController } = require('../controller/auth.controller');

router.get('/register', registerController);




module.exports = router;