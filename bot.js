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
const readline = require('readline');


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
fs.writeFile(`${__dirname}/credentials.json`, JSON.stringify(process.env.GOOGLE_FILE), (err) => {
    if (err) throw err;
    console.log('Saved!');
});
//const creds = JSON.stringify(process.env.GOOGLE_FILE);
// Load client secrets from a local file.
fs.readFile(`${__dirname}/credentials.json`, (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
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
 
// async function main () {
//     fs.writeFile('credentials.json', process.env.GOOGLE_CREDS, (err) => {
//         if (err) throw err;
//         console.log('Saved!');
//     });
//     //const key = require('credentials.json')
//   // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
//   // environment variables.
// //   const auth = new google.auth.GoogleAuth({
// //     // Scopes can be specified either as an array or as a single, space-delimited string.
// //     scopes: ['https://www.googleapis.com/auth/calendar']
// //   });
// //   const authClient = await auth.getClient();
 
// //   // obtain the current project Id
// //   const project = await auth.getProjectId();
// //const scopes = 'https://www.googleapis.com/auth/calendar'
// const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// const jwt = new google.auth.JWT(
//   process.env.GOOGLE_CLIENT_EMAIL,
//   null,
//   process.env.GOOGLE_PRIVATE_KEY,
//   SCOPES
// );
// const calendar = google.calendar({version: 'v3', jwt});
//     calendar.events.list({
//       calendarId: process.env.GOOGLE_CAL_ID,
//       timeMin: (new Date()).toISOString(),
//       maxResults: 10,
//       singleEvents: true,
//       orderBy: 'startTime',
//     }, (err, res) => {
//       if (err) return console.log('The API returned an error: ' + err);
//       const events = res.data.items;
//       if (events.length) {
//         console.log('Upcoming 10 events:');
//         events.map((event, i) => {
//           const start = event.start.dateTime || event.start.date;
//           console.log(`${start} - ${event.summary}`);
//         });
//       } else {
//         console.log('No upcoming events found.');
//       }
//     });
// }

// main().catch(console.error);
// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret