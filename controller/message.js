Message = require('../models/message');


// Handle index actions
// Handle index actions
exports.index = function (req, res) {
    Message.get(function (err, donors) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Messages retrieved successfully",
            data: donors
        });
    });
};
// Handle create form actions
exports.new = function (req, res) {
    var message = new Message();
    
    message._id = req.body._id;
    message.content = req.body.content;

// save the form and check for errors
    message.save(function (err) {

         if (err)
             res.json(err);
        res.json({
            message: 'New Device created!',
            data: message
        });
    });
};
// save the form and check for errors


// Handle view form info
exports.view = function (req, res) {
    Form.findById(req.params.form_id, function (err, form) {
        if (err)
            res.send(err);
        res.json({
            message: 'form details loading..',
            data: form
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
