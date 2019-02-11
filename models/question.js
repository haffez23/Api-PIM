var mongoose = require('mongoose');
// Setup schema
var questionSchema = mongoose.Schema({
   
    question: { type: String},
    _id: {
      type : String
   }
});
// Export question model
var Question = module.exports = mongoose.model('question', questionSchema);
module.exports.get = function (callback, limit) {
   Question.find(callback).limit(limit);
}
