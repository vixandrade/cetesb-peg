var express = require('express');
var router = express.Router();
var regions = require('../../../controllers/api/v1/regionController');

/* GET regions listing. */
router.get('/', regions.index);
router.get('/:regionId', regions.read);
router.post('/', regions.create);
router.delete('/:regionId', regions.delete);

module.exports = router;
