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
          
        message.user = req.body.user
        user.messages.push(message)
        user.save(function (err){
            if(err)
                res.json(err)

        })
    })


// save the form and check for errors
    message.save(function (err) {

         if (err)
             res.json(err);
        res.json({
            message: 'New Message created by '+req.username,
            data: message
        });
    });
};
// save the form and check for errors


// Handle view message info
exports.view = function (req, res) {
    Message.find({device : req.params.device_id}, function (err, message) {
        if (err)
            res.send(err);
        res.json({
            message: 'Message details loading..',
            data: message
        });
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
        _id: req.params.form_id
    }, function (err, form) {
        if (err)
            res.send(err);
    });
}
