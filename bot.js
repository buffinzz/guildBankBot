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
//const compute = google.compute('v1');
 
async function main () {
    fs.writeFile('credentials.json', process.env.GOOGLE_CREDS, (err) => {
        if (err) throw err;
        console.log('Saved!');
    });
    const key = require('./credentials.json')
  // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  // environment variables.
//   const auth = new google.auth.GoogleAuth({
//     // Scopes can be specified either as an array or as a single, space-delimited string.
//     scopes: ['https://www.googleapis.com/auth/calendar']
//   });
//   const authClient = await auth.getClient();
 
//   // obtain the current project Id
//   const project = await auth.getProjectId();
//const scopes = 'https://www.googleapis.com/auth/calendar'
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const jwt = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY,
  SCOPES
);
const calendar = google.calendar({version: 'v3', jwt});
    calendar.events.list({
      calendarId: process.env.GOOGLE_CAL_ID,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    });
}

main().catch(console.error);
// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret