//dependencies
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
//Coonect to mlab
mongoose.connect('mongodb://root:root123@ds055722.mlab.com:55722/register')
  .then(() => console.log('Connected to mongoDB'))
  .catch(err => console.error("Could not connect to mongoDB", err));




//routes
const form = require('./routes/form');
const reponse = require('./routes/reponse');
const question = require('./routes/question');
const auth = require('./routes/auth');

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


app.use('/api', form);
app.use('/api', reponse);
app.use('/api', question);
app.use('/api', auth);


var port = process.env.PORT || 8080;

var listen = app.listen(port);
console.log('The App runs on port ' + port);

