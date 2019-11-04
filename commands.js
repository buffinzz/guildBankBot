const fs=require(‘fs’);
fs.writeFile('credentials.json', process.env.GOOGLE_CREDS, (err) => {});