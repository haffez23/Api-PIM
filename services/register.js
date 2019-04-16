'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');
const Device = require('../models/device');

exports.registerUser = (email,username,name, password,device) =>

	new Promise((resolve,reject) => {

	    const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		const newUser = new user({
			email: email,
			username:username,
			name: name,
			hashed_password: hash,
			created_at: new Date()
		});

		
       
		newUser.save()

		.then(() => resolve({ status: 201, message: 'User Registered Sucessfully !' }))

		.catch(err => {

			if (err.code === 11000) {

				reject({ status: 409, message: 'User Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	   

		
	});
