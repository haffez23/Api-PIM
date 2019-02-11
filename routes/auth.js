let router = require('express').Router();
// Import form controller
var authController = require('../controller/auth');
// form routes
router.route('/signin')
	.post(authController.signin);
router.route('/signup')
	.post(authController.signup);



// Export API routes
module.exports = router;