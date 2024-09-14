const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');
const os = require('os');
const moment = require('moment'); // Make sure to install moment: npm install moment

const defaultEnvVariables = [
    { key: 'ALIVE_IMG', value: 'https://telegra.ph/file/94055e3a7e18f50199374.jpg' },
    { 
        key: 'ALIVE_MSG', 
        value: `*✨ 𝗜'𝗺 𝗔𝗹𝗶𝘃𝗲 𝗡𝗼𝘄! ♥*\n\n
        *🧠 𝗔𝗜 𝗔𝘀𝘀𝗶𝘀𝘁𝗮𝗻𝘁 𝗥𝗲𝗮𝗱𝘆 ⤵*\n\n
        𝐔𝐬𝐞: *.ai (Your question)*\n
        _Example: .ai Hey_\n\n
        *📊 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺:* ${os.platform().toUpperCase()}\n
        *🔋 𝗥𝗔𝗠 𝗨𝘀𝗮𝗴𝗲:* ${(os.totalmem() - os.freemem()) / (1024 * 1024)} MB / ${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB\n
        *⏳ 𝗧𝗶𝗺𝗲:* ${moment().format('MMMM Do YYYY, h:mm:ss A')}\n\n
        *💬 𝚂𝚝𝚊𝚢 𝚒𝚗 𝚃𝚘𝚞𝚌𝚑 ⤵*\n
        📱 *WhatsApp* - [Join Us](https://whatsapp.com/channel/0029ValK0gn4SpkP6iaXoj2y)\n
        📹 *YouTube* - [Subscribe](https://youtube.com/@dila_lk)\n
        🌐 *Web Site* - [Visit Here](https://dilalk.vercel.app)\n\n
        _Made with ❤️ by MRDILA_`
    },
    { key: 'PREFIX', value: '.' },
    { key: 'AUTO_READ_STATUS', value: 'true' },
    { key: 'MODE', value: 'public' },
    { key: 'AUTO_VOICE', value: 'false' },
    { key: 'AUTO_STICKER', value: 'false' },
    { key: 'AUTO_REPLY', value: 'false' },
    { key: 'AUTO_IMAGE', value: 'false' },
    { key: 'AUTO_VIDEO', value: 'false' },
    { key: 'AUTO_AI', value: 'false' },
];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
