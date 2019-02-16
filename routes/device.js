let router = require('express').Router();
// Import form controller
var deviceController = require('../controller/device');
// form routes
router.route('/devices')
    .get(deviceController.index)
    .post(deviceController.new);
router.route('/devices/:question_id')
    .get(deviceController.view)

// Export API routes
module.exports = router;