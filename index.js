//dependencies
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
//Coonect to mlab
mongoose.connect('mongodb://root:root1234@ds131905.mlab.com:31905/smartphone')
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.error("Could not connect to mongoDB", err));

//routes
const auth = require('./routes/auth');
const device = require('./routes/device');
const message = require('./routes/message');
const image = require('./routes/image');

global.__basedir = __dirname;


if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log("Morgan enable ...");
}

app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api', auth);
app.use('/api', device);
app.use('/api', message);
app.use('/api', image);






var port = process.env.PORT || 8080;

var listen = app.listen(port);
console.log('The App runs on port ' + port);
