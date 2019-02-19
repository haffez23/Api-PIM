// Config Mail
var  hbs = require('nodemailer-express-handlebars'),
email = process.env.MAILER_EMAIL_ID || 'dev.smartinterphone@gmail.com',
pass = process.env.MAILER_PASSWORD || 'pimesprit2019'
nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
auth: {
  user: email,
  pass: pass
}
});

var handlebarsOptions = {
viewEngine: 'handlebars',
viewPath: path.resolve('./api/templates/'),
extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));