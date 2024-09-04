const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "HF1UQADa#XZS9YQGF7_ZG0Qm2ltEEopjKExAN-k1SNOniYaT1-os",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS === undefined ? 'true' : process.env.AUTO_READ_STATUS,    
MONGODB: process.env.MONGODB || "mongodb://mongo:YwaWQTJTuUHeFHPSoTZvLunISgkvYvsE@autorack.proxy.rlwy.net:12762"
};
