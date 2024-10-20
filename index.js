const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers
} = require('@whiskeysockets/baileys');

const express = require("express");
const fs = require("fs");
const P = require("pino");
const config = require("./config");
const { File } = require("megajs");
const { getBuffer, sms } = require("./lib/functions");
const connectDB = require('./lib/mongodb');
const { readEnv } = require('./lib/database');
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;
const ownerNumber = ['+94712335744'];

//===================SESSION-AUTH============================
async function initializeSession() {
  if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
    if (!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!');
    const sessdata = config.SESSION_ID;
    const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);

    return new Promise((resolve, reject) => {
      filer.download((err, data) => {
        if (err) return reject(err);
        fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, (writeErr) => {
          if (writeErr) return reject(writeErr);
          console.log("Session downloaded ✅");
          resolve();
        });
      });
    });
  }
}

//=============================================

async function connectToWA() {
  // Connect to MongoDB
  await connectDB();

  // Load configurations
  const config = await readEnv();
  const prefix = config.PREFIX;

  console.log("Connecting to WhatsApp bot 🧬...");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/');
  const { version } = await fetchLatestBaileysVersion();

  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version
  });

  conn.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
        await connectToWA();
      }
    } else if (connection === 'open') {
      console.log('😼 Installing plugins...');
      fs.readdirSync("./plugins/").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() === ".js") {
          require("./plugins/" + plugin);
        }
      });
      console.log('Plugins installed successfully ✅');
      console.log('Bot connected to WhatsApp ✅');

      const welcomeMessage = `𝗛𝗲𝘆 𝗼𝘄𝗻𝗲𝗿,\n\n𝗜'𝗺 𝗼𝗻𝗹𝗶𝗻𝗲 𝗻𝗼𝘄 𝗮𝗻𝗱 𝗿𝗲𝗮𝗱𝘆 𝘁𝗼 𝗮𝘀𝘀𝗶𝘀𝘁 𝘆𝗼𝘂 𝘄𝗶𝘁𝗵 𝗮𝗻𝘆𝘁𝗵𝗶𝗻𝗴 𝘆𝗼𝘂 𝗻𝗲𝗲𝗱. 🚀`;

      // Ensure you are using the correct format for sending the message
      try {
        await conn.sendMessage(jidNormalizedUser(ownerNumber[0]), {
          image: { url: 'https://telegra.ph/file/94055e3a7e18f50199374.jpg' },
          caption: welcomeMessage
        });
        console.log("Welcome message sent successfully ✅");
      } catch (error) {
        console.error("Error sending welcome message:", error);
      }
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

    const reply = (text) => {
      conn.sendMessage(from, { text }, { quoted: mek });
    };

    // Command handling code here...
  });
}

// Initialize session and then start connecting to WhatsApp
initializeSession()
  .then(() => {
    setTimeout(connectToWA, 4000);
  })
  .catch(err => {
    console.error("Error initializing session:", err);
  });

// Express server setup
app.get("/", (req, res) => {
  res.send("Hey, the bot is up and running✅");
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
