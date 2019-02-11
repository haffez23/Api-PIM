var mongoose = require('mongoose');

// Setup schema
var formSchema = mongoose.Schema({
     _id: {
         auto : false,
         type : String
    },
    code_de_beneficiaire: {
        type: String,
        primaryKey: true
    },
    date_de_naissance: {type:Date},
    date_entretien: {type:Date},
    id: {type : Number},
    lieu_entretien: {type : String},
    nom_prenom_educateur: {type : String},
    prenom_du_beneficiaire: {type : String},
    statut: {type : String},
    reponses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reponse'
      }]
});
// Export form model
var Form = module.exports = mongoose.model('form', formSchema);
module.exports.get = function (callback, limit) {
    Form.find(callback).limit(limit);
}