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

router.route('/:username/devices')
		.get(authController.devicesByUser)
router.route('/users')
		.get(authController.devicesByUser)
router.route('/:username/messages')
		.get(authController.messagesByUser)
router.route('/users')
	.get(authController.index)
router.route('/user/forgot_password')
//  .get(authController.render_forgot_password_template)
	.post(authController.forgot_password);
router.route('/user/reset_password')
    .get(authController.render_reset_password_template)
	.post(authController.reset_password);









// Export API routes
module.exports = router;
