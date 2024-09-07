const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? 'TCRBUTSA#ymUgqvBjfVmnhV5MH0O07WrajEbOTjPcdYr4e35vG78' : process.env.SESSION_ID,
ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/a1519f1a766f7b0ed86e6.png",
ALIVE_MSG: process.env.ALIVE_MSG || "Hello, I am King-dizer-Md I am alive now...!",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
};
