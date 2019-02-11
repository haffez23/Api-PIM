'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('../services/register');
const login = require('../services/login');
const config = require('../config/config.json');



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
