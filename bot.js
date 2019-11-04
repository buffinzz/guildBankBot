const Discord = require('discord.js');
const fs=require(‘fs’); 

let commands = require("./commands.js");


const client = new Discord.Client();

 

client.on('ready', () => {
    fs.writeFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, process.env.GOOGLE_CONFIG, (err) => {});
    console.log('preinstall');
    console.log('I am ready!');
    

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret