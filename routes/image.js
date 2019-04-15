let router = require('express').Router();
// Import form controller
var imageController = require('../controller/image');
// form routes
router.route('/image')
    .get(imageController.index)
module.exports = router;    