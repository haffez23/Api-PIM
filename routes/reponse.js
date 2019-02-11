let router = require('express').Router();
// Import post controller
var reponseController = require('../controller/reponse');
// post routes
router.route('/reponse')
    .get(reponseController.index)
// Export API routes
module.exports = router;
