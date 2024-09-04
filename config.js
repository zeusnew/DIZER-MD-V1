const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? 'qBVhTJCa#tKDA8myMfKGQfFtjlTObxvuJ00DVqDe8kI2Bn2z6lUU' : process.env.SESSION_ID,
ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/3c64b5608dd82d33dabe8.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "Hello, I am King-Kevin-Md I am alive now...!",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
};
