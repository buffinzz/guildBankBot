const Discord = require('discord.js');
//require("./credentials.js");

const {google} = require('googleapis');



const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');
    

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );
google.options({
    auth: oauth2Client
});
// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret