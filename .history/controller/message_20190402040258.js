Message = require('../models/message');
User = require('../models/user');


// Handle index actions
// Handle index actions
exports.index = function (req, res) {
    Message
            .find({})
            .populate({path : 'user'})
            .sort({displayAt: 'descending'})
            .exec(function(err,messages){
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                res.json({
                    status: "success",
                    message: "Messages retrieved successfully",
                    data: messages
                });
            })
    
   
};
// Handle create form actions
exports.new = function (req, res) {
    var message = new Message();
    
    message.content = req.body.content;
    message.displayAt = req.body.displayAt;
    message.hiddenAt = req.body.hiddenAt;
    message.device = req.body.device_id;

    User.findOne({ username: req.body.username }, function (err, user) {
        if (err)
            res.json(err)
        else{
            console.log(user)
            message.user = user._id
            user.messages.push(message)
            user.save(function (err){
                if(err)
                    res.json(err)
                    else {
                        message.save(function (err) {

                            if (err)
                                res.json(err);
                                
                           res.json({
                               message: 'New Message created by '+req.body.username,
                               data: message
                           });
                       });
                    }
    
            })
        }    
       
    })


// save the form and check for errors
    
};
// save the form and check for errors


// Handle view message info
exports.view = function (req, res) {
    Message.find({device : req.params.device_id}, function (err, message) {
        if (err)
            res.send(err);
        else{
            var dateNow = new Date(new Date().toISOString());
            res.json({
                message: 'Message details loading..',
                numberOfMessages : message.length,
                data: message.filter(function(e,i){

                    var displayAt = new Date(e.displayAt);
                    var hiddenAt = new Date(e.hiddenAt);


                    if((dateNow >= displayAt && dateNow <= hiddenAt) )
                    return e

                })
            });
        }    
       
    });
};
// Handle view form info
exports.tri = function (req, res) {
    Form.find({lieu_entretien:req.body.lieu ,nom_prenom_educateur:req.body.nom})
        .populate({path: 'reponses', populate: {path: 'question'}})
        .exec(function (err, forms)
    {
        if (err){
            res.send(err);
            console.log(err);
        }
        res.json(
             forms
        );
        console.log(forms);
    });
};
// Handle delete form
exports.delete = function (req, res) {
    Message.remove({
        _id: req.params.message_id
    }, function (err, message) {
        if (err)
        res.send(err);
        else{
            res.json({
                message : "Removed"
            });

        }    
    });
}

exports.update = function (req,res){
    Message
    .findOne({_id:req.params.message_id,device : req.params.device_id})
    .exec(function (err,message){
        if(err)
            res.json(err)
        if(message==null)
          {  res.json({
                message : "Message Or Device not found"
            })
        } 
         else {
            message.content = req.body.content;
            message.displayAt = req.body.displayAt;
            message.hiddenAt = req.body.hiddenAt;
            message.device = req.body.device;

            message.save(function (err,newMessage){

                if(err){
                    res.json({
                    message : "failed to update message",
                    error : err
                    })
                }
                else{
                    res.json({
                        message : "Message Updated",
                        data :newMessage
                    })
                }
            })
         }   

    })
}