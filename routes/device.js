let router = require('express').Router();
// Import form controller
var deviceController = require('../controller/device');
// form routes
router.route('/devices')
    .get(deviceController.index)
    .post(deviceController.new);
router.route('/devices/:device_id')
    .get(deviceController.view)
router.route('/devices/:device_id')
    .delete(deviceController.delete)  
router.route('/devices/:device_id/:device_name')
    .put(deviceController.update)     
// Export API routes
module.exports = router;