'use strict';
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	name 			: String,
  username	: {type: String, unique: true},
	email		: {type: String, unique: true},
	hashed_password	: String,
	created_at		: String,
	temp_password	: String,
	temp_password_time: String

});


// Export reponse model
var Reponse = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
	Reponse.find(callback).limit(limit);
}
