const fs=require('fs');

const path = process.env.GOOGLE_FILE;

fs.access(path, fs.F_OK, (err) => {
  if (err) {
    fs.writeFile(process.env.GOOGLE_FILE, process.env.GOOGLE_CREDS, (err) => {
        console.error(err)
    }
    );
    
  }

  //file exists
})

