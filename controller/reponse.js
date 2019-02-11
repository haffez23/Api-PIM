const Reponse = require('../models/reponse');



// Handle index actions
exports.index = function (req, res) {
    Reponse.get(function (err, donors) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "donors retrieved successfully",
            data: donors
        });
    });
};