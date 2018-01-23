var express = require('express');
var router = express.Router();
var users = require('../../../controllers/api/v1/userController');

/* GET users listing. */
router.get('/', users.index);
router.get('/:userId', users.read);
router.post('/', users.create);
router.delete('/:userId', users.delete);

module.exports = router;
