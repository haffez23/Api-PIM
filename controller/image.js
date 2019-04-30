
var base64Img = require('base64-img');
var Jimp = require('jimp');
var fs = require('fs');
var jpeg = require('jpeg-js');
const converter = require('image_to_epaper_converter');
// Handle index actions
exports.index = function (req, res) {
  var webshot = require('webshot');
  var web3 = require('web3');
  var options = {
    screenSize: {
      width: 128
    , height: 296
    }
  , shotSize: {
      width: 128
    , height: 296
    }
  , userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
      + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
  
  ,
  siteType:'html'
  }
  ;

    webshot('<html ><body style="background-color: #ffffff;">Hello World</body></html>', 'images/messages/hello_world.png', options, function(err) {
      // screenshot now saved to hello_world.png

      var width = 298, height = 128;

      Jimp.read("images/messages/hello_world.png", function (err, image) {
     
        
        converter.convert({
          source_file: "images/messages/hello_world.png",
          target_folder: "images/active",
          target_text_filename: "picture.txt",
          target_cpp_filename: "picture",
          cpp_variable_name: "PICTURE",
          tasks: [ "binary", "hexadecimal", "hexadecimal_cpp" ],
          display: {
              "width": 128,
              "height":  296,
              "fitmode": "center",
              "colormode": "inverted"
          }
      });

      var data = fs.readFileSync('images/active/ext.txt', 'utf8');  
          res.send(data)

       // console.log(web3.toHex(rawImageData) );

      })
    });





};





