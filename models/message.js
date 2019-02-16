var mongoose = require('mongoose');
// Setup schema
var messageSchema = mongoose.Schema({
   _id: {

      type: String
   },
   content: {type: String},
   createdAt: {type: Date, default: Date.now}   ,
});
// Export reponse model
var Reponse = module.exports = mongoose.model('message', messageSchema);
module.exports.get = function (callback, limit) {
   Reponse.find(callback).limit(limit);
}
