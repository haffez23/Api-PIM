let router = require('express').Router();
// Import form controller
var messageController = require('../controller/message');
// form routes
router.route('/messages')
    .get(messageController.index)
    .post(messageController.new);
router.route('/messages/:messages_id')
    .get(messageController.view)

// Export API routes
module.exports = router;