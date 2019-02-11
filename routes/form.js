let router = require('express').Router();
// Import form controller
var formController = require('../controller/form');
// form routes
router.route('/forms')
    .get(formController.index)
    .post(formController.new);
router.route('/forms/tri')
    .post(formController.tri);


// Export API routes
module.exports = router;