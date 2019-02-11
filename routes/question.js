let router = require('express').Router();
// Import form controller
var questionController = require('../controller/question');
// form routes
router.route('/questions')
    .get(questionController.index)
    .post(questionController.new);
router.route('/question/:question_id')
    .get(questionController.view)

// Export API routes
module.exports = router;