'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('../services/register');
const login = require('../services/login');
const config = require('../config/config.json');
const User = require('../models/user');
const Device = require('../models/device');



exports.signin = function (req, res) {

    const credentials = auth(req);

    if (!credentials) {
        res.status(400).json({message: credentials});
	console.log(req);
    } else {

        login.loginUser(credentials.name, credentials.pass)

            .then(result => {

                const token = jwt.sign(result, config.secret, {expiresIn: 1440});

                res.status(result.status).json({message: result.message, token: token});

            })

            .catch(err => res.status(err.status).json({message: err.message}));
    }

};


exports.signup = function (req, res) {

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const username = req.body.username;

    if (!email || !password || !email.trim() || !password.trim()|| !name || !username || !name.trim() || !username.trim()) {

        res.status(400).json({message: 'Invalid Request !'});

    } else {

        register.registerUser(email,username , name, password)

            .then(result => {

                res.setHeader('Location', '/signup/' + username);
                res.status(result.status).json({message: result.message})
            })

            .catch(err => res.status(err.status).json({message: err.message}));
    }

};
//Assign Device to user

exports.assign = function (req, res)
{
    User.findOne({ username: req.params.username }, function (err, user) {
        if (err)
            res.send(err)

        user.devices.push(req.params.device_id)

        Device.findById(req.params.device_id,function(err,device){

            if(err)
                res.send(err);
            device.users.push(user);    
            user.devices.push(device);  
            device.save(function(err){
                if (err)
                    res.send(err)
            });  
        });


        user.save(function(err){
            if (err)
                res.send(err)
                res.json({ message: 'The device has been assigned successfully to '+req.params.username });
            })
    });
}
// Get users
exports.index = function (req, res) {
    User
    .find({})
    .populate({path: 'devices', populate: {path: 'messages'}})
    .exec(function (err, reponse) {
        if (err){
            console.log('error'+err)
        }
        res.send(reponse );
});
};
