let router = require('express').Router();
// Import form controller
var authController = require('../controller/auth');
// form routes
router.route('/signin')
	.post(authController.signin);
router.route('/signup')
	.post(authController.signup);
router.route('/user/:username/:device_id')
	.put(authController.assign)
router.route('/users')
	.get(authController.index)








// Export API routes
module.exports = router;
