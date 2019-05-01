
var base64Img = require('base64-img');
var Jimp = require('jimp');
var fs = require('fs');
var jpeg = require('jpeg-js');
const converter = require('image_to_epaper_converter');

var sprintf=require("sprintf-js").sprintf;


// Handle index actions
exports.index = function (req, res) {
  var webshot = require('webshot');
  var web3 = require('web3');
  var options = {
    screenSize: {
      width: 296
    , height: 128
    }
  , shotSize: {
      width: 296
    , height: 128
    }
  , userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
      + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
  
  ,
  siteType:'html'
  }
  ;

    webshot('<html ><body style="background-color: #ffffff;"><div align="center"><i><b>Message</b> :Je suis en r&eacute;union</i></div><div align="center"><i><b> User</b> : Haffez<br /></i></div></body></html>', 'images/messages/hello_world.png', options, function(err) {
      // screenshot now saved to hello_world.png

      var width = 298, height = 128;

      Jimp.read("images/messages/hello_world.png", function (err, image) {
     
        image.rotate(90).write("images/messages/toSendIMG.png");
        
        converter.convert({
          source_file: "images/messages/toSendIMG.png",
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
      //data.slice(0,1) 
      res.json(data.slice(2,data.length-2))
    

       // console.log(web3.toHex(rawImageData) );

      })
    });





};



// ////////////
// var webshot = require('webshot');
// var fs      = require('fs');
 
// var renderStream = webshot('google.com');
// var file = fs.createWriteStream('google.png', {encoding: 'binary'});
 
// renderStream.on('data', function(data) {
//   file.write(data.toString('binary'), 'binary');
// });

// An example showing how to take a screenshot of a site's mobile version:

// var webshot = require('webshot');
 
// var options = {
//   screenSize: {
//     width: 320
//   , height: 480
//   }
// , shotSize: {
//     width: 320
//   , height: 'all'
//   }
// , userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
//     + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
// };
 

// webshot('flickr.com', 'flickr.jpeg', options, function(err) {
//   // screenshot now saved to flickr.jpeg
// });



