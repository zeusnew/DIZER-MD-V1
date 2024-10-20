const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers
} = require('@whiskeysockets/baileys');

const l = console.log;
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions');
const fs = require('fs');
const P = require('pino');
const config = require('./config');
const qrcode = require('qrcode-terminal');
const util = require('util');
const { sms, downloadMediaMessage } = require('./lib/msg');
const axios = require('axios');
const { File } = require('megajs');

const ownerNumber = ['+94712335744'];

//===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
  if (!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!');
  const sessdata = config.SESSION_ID;
  const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
  filer.download((err, data) => {
    if (err) throw err;
    fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, () => {
      console.log("Session downloaded ✅");
    });
  });
}

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

//=============================================

async function connectToWA() {

  // Connect to MongoDB
  const connectDB = require('./lib/mongodb');
  connectDB();
  
  const { readEnv } = require('./lib/database');
  const config = await readEnv();
  const prefix = config.PREFIX;

  console.log("Connecting wa bot 🧬...");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/');
  var { version } = await fetchLatestBaileysVersion();

  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version
  });

  conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else if (connection === 'open') {
      console.log('😼 Installing...');
      const path = require('path');
      fs.readdirSync("./plugins/").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() == ".js") {
          require("./plugins/" + plugin);
        }
      });
      console.log('Plugins installed successfully ✅');
      console.log('Bot connected to WhatsApp ✅');

      let up = `𝗛𝗲𝘆 ${name},\n\n𝗛𝗼𝗽𝗲 𝘆𝗼𝘂'𝗿𝗲 𝗵𝗮𝘃𝗶𝗻𝗴 𝗮 𝗴𝗿𝗲𝗮𝘁 𝗱𝗮𝘆!\n\n𝗜'𝗺 𝗼𝗻𝗹𝗶𝗻𝗲 𝗻𝗼𝘄 𝗮𝗻𝗱 𝗿𝗲𝗮𝗱𝘆 𝘁𝗼 𝗮𝘀𝘀𝗶𝘀𝘁 𝘆𝗼𝘂 𝘄𝗶𝘁𝗵 𝗮𝗻𝘆𝘁𝗵𝗶𝗻𝗴 𝘆𝗼𝘂 𝗻𝗲𝗲𝗱. 🚀\n\n𝗟𝗲𝘁'𝘀 𝗴𝗲𝘁 𝘀𝘁𝗮𝗿𝘁𝗲𝗱! 🤡`;

      conn.sendMessage(ownerNumber + "@s.whatsapp.net", {
        image: { url: 'https://telegra.ph/file/94055e3a7e18f50199374.jpg' },
        caption: up
      });
    }
  });

  conn.ev.on('creds.update', saveCreds);

  conn.ev.on('messages.upsert', async (mek) => {
    mek = mek.messages[0];
    if (!mek.message) return;
    mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;

    if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true") {
      await conn.readMessages([mek.key]);
    }

    const m = sms(conn, mek);
    const type = getContentType(mek.message);
    const from = mek.key.remoteJid;
    const body = (type === 'conversation') ? mek.message.conversation : '';
    const isCmd = body.startsWith(prefix);
    const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(' ');

    const reply = (teks) => {
      conn.sendMessage(from, { text: teks }, { quoted: mek });
    };

    // Command handling code here...

  });
}

app.get("/", (req, res) => {
  res.send("Hey, the bot is up and running✅");
});

app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));

setTimeout(() => {
  connectToWA();
}, 4000);
