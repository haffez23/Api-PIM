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

		if(device.key !=""){
			Device.findById(device.key,function(err,device){

				if(err || device == null)
					reject({ status: 409, message: 'Error device not found' });

				else {    
				device.users.push(newUser); 
				console.log('Signup Device selected'+device)   
				newUser.devices.push(device);  
				device.save(function(err){
					if (err)
					reject({ status: 500, message: 'Internal Server Error !' });
					else {
					  newUser.save(function(err){
						if (err)
						reject({ status: 500, message: 'Internal Server Error !' });
						else {    
							resolve({ status: 201, message: 'User Registered Sucessfully !' })						}
						  })
					 }   
				});  
			  }
			});
		}
       else{
		newUser.save()

		.then(() => resolve({ status: 201, message: 'User Registered Sucessfully !' }))

		.catch(err => {

			if (err.code === 11000) {

				reject({ status: 409, message: 'User Already Registered !' });

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	   }

		
	});
