Device = require('../models/device');
User = require ('../models/user');
// Handle index actions
exports.index = function (req, res) {
    Device
    .find({})
    .populate({path: 'users'})
    .exec(function (err, reponse) {
        if (err){
            console.log('error'+err)
        }
        res.send(reponse );
});
};
// Handle create form actions
exports.new = function (req, res) {
    var device = new Device();
    
    device._id = req.body._id;
    device.name = req.body.name;
    device.code = req.body.code;

// save the form and check for errors
    device.save(function (err) {

         if (err)
             res.json(err);
         else{
            res.json({
                message: 'New Device created!',
                data: device
            });
         }    
       
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
    Device.remove({
        _id: req.params.device_id
    }, function (err, device) {
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
    Device
    .findOne({_id:req.params.device_id})
    .exec(function (err,device){
        device.name = req.params.device_name
        device.save(function(err){
            if(err){
                res.json({
                    message : "Error"
                })
                
            }
            else{
                res.json({
                    message : "Update device name",
                    data : device
                })
            }
        })
    })
}
