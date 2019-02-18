var mongoose = require('mongoose');
// Setup schema
var messageSchema = mongoose.Schema({
   content: {type: String,require : true},
   createdAt: {type: Date, default: Date.now},
   displayAt: {type: Date, require:true},
   hiddenAt: {type: Date,require:true },
   user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'user'
   },
   device : {
      type : mongoose.Schema.Types.String,
      ref : 'device'
   }
});
// Export reponse model
var Reponse = module.exports = mongoose.model('message', messageSchema);
module.exports.get = function (callback, limit) {
   Reponse.find(callback).limit(limit);
}
