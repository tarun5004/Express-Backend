let express = require('express');
let router = express.Router();

let { registerController,
    loginController
    } = require('../controller/auth.controller');

router.post('/register', registerController);
router.post('/login', loginController);




module.exports = router;
