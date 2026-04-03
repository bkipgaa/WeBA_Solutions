const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
require('dotenv').config();

const backupDatabase = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, '../backups');
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const backupFile = path.join(backupDir, `backup-${timestamp}.gz`);
  
  const mongodump = `mongodump --uri="${process.env.MONGODB_URI}" --archive="${backupFile}" --gzip`;
  
  exec(mongodump, (error, stdout, stderr) => {
    if (error) {
      console.error('Backup failed:', error);
      return;
    }
    console.log(`✅ Database backed up to: ${backupFile}`);
  });
};

backupDatabase();