var mongoose = require('mongoose');
// Setup schema
var reponseSchema = mongoose.Schema({
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'question' },
    reponse: {type: String}
});
// Export reponse model
var Reponse = module.exports = mongoose.model('reponse', reponseSchema);
module.exports.get = function (callback, limit) {
   Reponse.find(callback).limit(limit);
}
