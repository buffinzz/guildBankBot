const Discord = require('discord.js');
require("./credentials.js");

let google = require('googleapis');
let privatekey = require(process.env.GOOGLE_FILE);


const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');
    

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});

 
// configure a JWT auth client
let jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/calendar']);
//authenticate request
jwtClient.authorize(function (err, tokens) {
if (err) {
console.log(err);
return;
} else {
console.log("Successfully connected!");
}
});
// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret