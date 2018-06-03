var express = require('express')
var router = express.Router()
var beaches = require('../../../controllers/api/v1/beachController')

/* GET beaches listing. */
router.get('/', beaches.index)
router.get('/regions/macro', beaches.macroRegions)
router.get('/regions/micro', beaches.microRegions)
router.get('/:beachId', beaches.read)

module.exports = router
