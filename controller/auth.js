'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');

const register = require('../services/register');
const login = require('../services/login');
const config = require('../config/config.json');
const User = require('../models/user');
const Device = require('../models/device');
var async = require('async');
var crypto = require('crypto');
var path = require('path');
const bcrypt = require('bcryptjs');


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
    const device = req.body.device;


    if (!email || !password || !email.trim() || !password.trim()|| !name || !username || !name.trim() || !username.trim()) {

        res.status(400).json({message: 'Invalid Request !'});

    } else {

        register.registerUser(email,username , name, password,device)

            .then(result => {

                res.setHeader('Location', '/signup/' + username);
                res.status(result.status).json({message: result.message})
            })

            .catch(err => {res.send("Error"+err.message)});
    }

};
//Assign Device to user

exports.assign = function (req, res)
{
    User.findOne({ username: req.params.username }, function (err, user) {
        if (err || user == null)
            res.json({message:"Error user not found"})

        

       else {
        user.devices.push(req.params.device_id)

        Device.findById(req.params.device_id,function(err,device){

            if(err || device == null)
                res.json({message : "Error device not found"}); 
            else {    
            device.users.push(user);    
            user.devices.push(device);  
            device.save(function(err){
                if (err)
                    res.send(err)
                 else {
                  user.save(function(err){
                    if (err)
                        res.send(err)
                    else {    
                        res.json({ message: 'The device has been assigned successfully to '+req.params.username });
                    }
                      })
                 }   
            });  
          }
        });


       
          }
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
        res.send(reponse);
});
};
exports.update =  function (req , res){

  User.findById(req.params.user_id)
  .exec(function(err,rep){
      if (err)
      res.json({message:"User not found"})    

      else{
        rep.username = req.body.username,
        rep.name = req.body.name,
        rep.email = req.body.email,
        Device.findById(req.body.device,function(err,device){
          rep.devices.push(device)
          console.log(device)
          rep.save(function(err){
            if (err){
              res.send("Error to update user")
            }
            else{
              res.send("Update User success")

            }
          })
        });
        

      }
      
  })

}
exports.messagesByUser = function (req, res){
    User.findOne({username:req.params.username})
        .populate({ path : 'messages' })
        .exec(function(err,rep){
            if (err)
            res.json({message:"User not found"})    

            else    
            res.json(rep.messages)    
        })
}
exports.devicesByUser = function (req, res){
  User.findOne({username:req.params.username})
      .populate({path : 'devices' , populate : 'messages'})
      .exec(function(err,rep){
          if (err)
              res.send(err)
          else if(rep != null)    
          res.json(rep.devices)    
          else
          res.json(rep)    

      })
}
var  hbs = require('nodemailer-express-handlebars'),
        email =  'smartinterphone@yahoo.com',
        pass = 'haffez1234'
        var nodemailer = require('nodemailer');
        
        var smtpTransport = nodemailer.createTransport({
        service:  'Yahoo',
        auth: {
          user: email,
          pass: pass
        }
        });
        
        var handlebarsOptions = {
        viewEngine: 'handlebars',
        viewPath: path.resolve('./templates/'),
        extName: '.html'
        };
        
        smtpTransport.use('compile', hbs(handlebarsOptions));
exports.forgot_password = function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({
          email: req.body.email
        }).exec(function(err, user) {
          if (user) {
            done(err, user);
          } else {
            done('User not found.');
          }
        });
      },
      function(user, done) {
        // create the random token
        crypto.randomBytes(20, function(err, buffer) {
          var token = buffer.toString('hex');
          done(err, user, token);
        });
      },
      function(user, token, done) {
        User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function(err, new_user) {
          done(err, token, new_user);
        });
      },
      function(token, user, done) {
          console.log('TO EMAIL'+user.email)
        var data = {
          to: user.email,
          from: "smartinterphone@yahoo.com",
          template: 'forgot-password-email',
          subject: 'Password help has arrived!',
          context: {
            url: 'http://localhost:8080/api/user/reset_password?token=' + token,
            name: user.name
          }
        };
        

        smtpTransport.sendMail(data, function(err) {
          if (!err) {
            return res.json({ message: 'Kindly check your email for further instructions' });
          } else {
            return done(err);
          }
        });
      }
    ], function(err) {
      return res.status(422).json({ message: err });
    });
  };
  /**
 * Reset password
 */
exports.reset_password = function(req, res, next) {
    User.findOne({
      reset_password_token: req.body.token,
      reset_password_expires: {
        $gt: Date.now()
      }
    }).exec(function(err, user) {
      if (!err && user) {
        if (req.body.newPassword === req.body.verifyPassword) {
          user.hash_password = bcrypt.hashSync(req.body.newPassword, 10);
          user.reset_password_token = undefined;
          user.reset_password_expires = undefined;
          user.save(function(err) {
            if (err) {
              return res.status(422).send({
                message: err
              });
            } else {
              var data = {
                to: user.email,
                from: email,
                template: 'reset-password-email',
                subject: 'Password Reset Confirmation',
                context: {
                  name: user.name
                }
              };
  
              smtpTransport.sendMail(data, function(err) {
                if (!err) {
                  return res.json({ message: 'Password reset' });
                } else {
                  return res.send(err);
                }
              });
            }
          });
        } else {
          return res.status(422).send({
            message: 'Passwords do not match'
          });
        }
      } else {
        return res.status(400).send({
          message: 'Password reset token is invalid or has expired.'
        });
      }
    });
  };

  exports.render_reset_password_template = function(req, res) {
    return res.sendFile(path.resolve('../Api-PIM/templates/reset-password.html'));
  };