
var base64Img = require('base64-img');
var Jimp = require('jimp');
var fs = require('fs');
var jpeg = require('jpeg-js');
const converter = require('image_to_epaper_converter');

var sprintf = require("sprintf-js").sprintf;


// Handle index actions
exports.index =  function (req, res) {
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
    siteType: 'html'
  }
    ;



  //   converter.convert({
  //     source_file: "images/messages/toSendIMG.png",
  //     target_folder: "images/active",
  //     target_text_filename: "picture.txt",
  //     target_cpp_filename: "picture",
  //     cpp_variable_name: "PICTURE",
  //     tasks: [ "binary", "hexadecimal", "hexadecimal_cpp" ],
  //     display: {
  //         "width": 128,
  //         "height":  296,
  //         "fitmode": "center",
  //         "colormode": "inverted"
  //     }
  // });

  // var data = fs.readFileSync('images/active/ext.txt', 'utf8'); 
  // //data.slice(0,1) 
  // res.json(data.slice(2,data.length-2))


  // console.log(web3.toHex(rawImageData) );


  Message.find({ device: req.body.device })
    .populate({ path: 'user' })
    .sort({ displayAt: 'descending' })
    .exec(async function (err, message) {
      if (err)
        res.send(err);
      else {
        var dateNow = new Date(new Date().toISOString());
        messages = message.filter(function (e, i) {

          var displayAt = new Date(e.displayAt);
          var hiddenAt = new Date(e.hiddenAt);


          if ((dateNow >= displayAt && dateNow <= hiddenAt))
            return e

        })
        //  res.json(
        //       messages
        //  );


       

      }




      async.map(messages, function(msg, callback) {
        var textToDisplay = n.content
        var date = Date.now();
         webshot('<html ><body style="background-color: #ffffff;"><div align="center"><i><b>Message</b> :' + textToDisplay + '</i></div><div align="center"><i><b> User</b> : Haffez<br /></i></div></body></html>', 'images/messages/hello_world1.png', options, function (err) {
          // screenshot now saved to hello_world.png

          var width = 298, height = 128;

           Jimp.read("images/messages/hello_world1.png", function (err, image) {

            var path = "images/active/toSendIMG" + n._id + ".bmp"
            image.rotate(90).write(path);

            listImages.concat("toSendIMG" + n._id + ".bmp" )
            // res.json({pathimg:"toSendIMG"+n._id+".bmp"});
            // console.log(n)

            return ({name:n})

          }
          )
        })

    }, function(err, results) {
        // results is an array of names
        console.log(listImages)
    });




    Promise.all(messages.map(function(msg) { 
      return getItem(msg).then(function(result) { 



        




      });
  })).then(function(results) {
      // results is an array of names

 res.json(results);    })
    })








};


