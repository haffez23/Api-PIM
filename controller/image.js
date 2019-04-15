
var base64Img = require('base64-img');
// Handle index actions
exports.index = function (req, res) {
    var webshot = require('webshot');

    webshot('<html><body>Hello World</body></html>', 'images/messages/hello_world.png', {siteType:'html'}, function(err) {
      // screenshot now saved to hello_world.png
      base64Img.base64('images/messages/hello_world.png', function(err, data) {


        res.send(data);
        
      })
    });
};