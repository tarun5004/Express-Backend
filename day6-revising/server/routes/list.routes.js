let express = require('express');
let router = express.Router();
let {
    createlistcontroller,
    getAlllistcontroller,
    updateListcontroller,
    deleteListcontroller
} = require('../controller/list.controller');

router.post('/create', createlistcontroller);
router.get('/getall', getAlllistcontroller);
router.put('/update/:id', updateListcontroller);
router.delete('/delete/:id', deleteListcontroller);

module.exports = router;
