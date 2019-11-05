const fs=require('fs');

const path = process.env.GOOGLE_FILE;
const fs=require('fs');

const path = process.env.GOOGLE_FILE;

try {
    if (fs.existsSync(path)) {
      //file exists
      console.log('exists!')
    }
  } catch(err) {
    fs.writeFile(process.env.GOOGLE_FILE, process.env.GOOGLE_CREDS, (err) => {
        if (err) throw err;
        console.log('Saved!');
    });
  }

