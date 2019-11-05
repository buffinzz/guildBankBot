const Discord = require('discord.js');
//require("./credentials.js");

const {google} = require('googleapis');

const client = new Discord.Client();

const fs=require('fs');


client.on('ready', () => {

    console.log('I am ready!');
    

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});

// const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     process.env.GOOGLE_REDIRECT_URL
//   );
// google.options({
//     auth: oauth2Client
// });
const compute = google.compute('v1');
 
async function main () {
    fs.writeFile('credentials.json', process.env.GOOGLE_FILE, (err) => {
        if (err) throw err;
        console.log('Saved!');
    });
  // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  // environment variables.
  const auth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ['https://www.googleapis.com/auth/compute']
  });
  const authClient = await auth.getClient();
 
  // obtain the current project Id
  const project = await auth.getProjectId();
 
  // Fetch the list of GCE zones within a project.
  const res = await compute.zones.list({ project, auth: authClient });
  console.log(res.data);
}
main().catch(console.error);
// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret