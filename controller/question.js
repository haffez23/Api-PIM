Question = require('../models/question');

// Handle index actions
exports.index = function (req, res) {
    Question.get(function (err, forms) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(
            forms
            );
    });
};
// Handle create form actions
exports.new = function (req, res) {
    var question = new Question();
    question.question = req.body.question;
    question._id = req.body._id;

// save the form and check for errors
    question.save(function (err) {

         if (err)
             res.json(err);
        res.json({
            message: 'New question created!',
            data: question
        });
    });
};
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

// Handle delete form
exports.delete = function (req, res) {
    Form.remove({
        _id: req.params.form_id
    }, function (err, form) {
        if (err)
            res.send(err);
    });
}
