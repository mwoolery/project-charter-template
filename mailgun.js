
var api_key = '34ee4881c993f9cbbb157c7005263e39-4836d8f5-93b1e7a3';
var domain = 'https://app.mailgun.com/app/domains/sandboxa16b182489814caba2256e4c4d40ecda.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'Excited User <s531508@nwmissouri.edu>',
  to: 'saivankina@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};
 
mailgun.messages().send(data, function (error, body) {
    if (error){
        console.log(error)
    }
  console.log(body);
});