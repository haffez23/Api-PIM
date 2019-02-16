var mongoose = require('mongoose');
// Setup schema
var deviceSchema = mongoose.Schema({
   _id: {

      type: String
   },
   name: {type: String},
   code: {type: String},
   
});
// Export reponse model
var Reponse = module.exports = mongoose.model('device', deviceSchema);
module.exports.get = function (callback, limit) {
   Reponse.find(callback).limit(limit);
}
