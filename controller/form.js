Form = require('../models/form');
Reponse = require ('../models/reponse');
Question = require('../models/question');

// Handle index actions
exports.index = function (req, res) {
    Form
    .find({})
    .populate({path: 'reponses', populate: {path: 'question'}})
    .sort({date: 'ascending'})
    .exec(function (err, reponse) {
        if (err){
            console.log('error'+err)
        }
        res.send(reponse );
});
}
// Handle create form actions
exports.new = function (req, res) {
    var form = new Form();
    var arrayQuestion=[];
    form._id=req.body._id;
    form.code_de_beneficiaire = req.body.code_de_beneficiaire;
    form.statut = req.body.statut;
    form.date_de_naissance = req.body.date_de_naissance;
    form.date_entretien = req.body.date_entretien;
    form.lieu_entretien=req.body.lieu_entretien;
    form.prenom_du_beneficiaire=req.body.prenom_du_beneficiaire;
    form.nom_prenom_educateur=req.body.nom_prenom_educateur;



    for (var key in req.body.reponses) {
        let value = req.body.reponses[key];

        var reponse = new Reponse();
    
        var question = new Question();
        
        question._id=value.question._id;
        question.question=value.question.question;
        
            reponse.reponse = value.reponse;
            reponse.question=question
            console.log( `value for question._id ${key} is ${question._id}` )
            console.log( `value for question ${key} is ${reponse.question._id}` )


            console.log( `value for ${key} is ${value.reponse}` )
            console.log( `value for ${key} is ${value.question._id}` )
            console.log( `value original ${key} is ${question._id}` )
            console.log( `value original ${key} is ${question.question}` )
          
            form.reponses.push(reponse)
            arrayQuestion.push(question)
            reponse.save(function (err) {

                if (err)
                    res.json(err);
           });
      }


      var total = arrayQuestion.length
      , result = []
    ;
    
    function saveAll(){
      var doc = arrayQuestion.pop();



      Question.count({_id: doc._id}, function (err, exist){ 
        if(exist>0){
            result.push(exist);
        }
        else{
            doc.save(function(err, saved){
                if (err) throw err;//handle error
            
                result.push(saved[0]);
            
                if (--total) saveAll();
              })
        }
    });   
    }
    
     
           form.save(function (err) {

            if (err)
                res.json(err);
           res.json({
               message: 'New form created!',
               data: form
           });
           saveAll();

       });
      }




function savequestion(question){
    question.save(function (err) {
        if (err) console.error(err.stack)
        // Do not Check user info
   })
}
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
    Form.remove({
        _id: req.params.form_id
    }, function (err, form) {
        if (err)
            res.send(err);
    });
}
