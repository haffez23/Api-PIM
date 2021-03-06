'use strict';
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	name 			: String,
  	username	: {type: String, unique: true},
	email		: {type: String, unique: true},
	hashed_password	: String,
	created_at		: {type:Date,default:Date.now},
	temp_password	: String,
	temp_password_time: String,
	devices : [{
		type : mongoose.Schema.Types.String,
		ref : 'device'
	}],
	messages : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'message'
	}],
	reset_password_token: {type: String},
	reset_password_expires: {type: Date}	
});
// Export reponse model
var Reponse = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
	Reponse.find(callback).limit(limit);
}
