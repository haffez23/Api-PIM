let router = require('express').Router();
// Import form controller
var messageController = require('../controller/message');
// form routes
router.route('/messages')
    .get(messageController.index)
    .post(messageController.new);
router.route('/messages/:device_id')
    .get(messageController.view)
router.route('/messages/:message_id/:device_id/')
    .put(messageController.update)
// Export API routes
module.exports = router;