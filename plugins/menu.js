const config = require('../config');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');

// Function to generate message ID
function genMsgId() {
  const prefix = "3EB";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomText = prefix;

  for (let i = prefix.length; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }

  return randomText;
}

//---------------------------------------------------------------------------

cmd({
  pattern: "menu",
  react: "📂",
  alias: ["panel", "list", "commands"],
  desc: "Get bot's command list.",
  category: "main",
  use: '.menu',
  filename: __filename
},
  async (conn, mek, m, { from, pushname, reply }) => {
    try {
      let menuc1 = ``;
      for (let i = 0; i < commands.length; i++) {
        if (commands[i].category === 'main') {
          if (!commands[i].dontAddCommandList) {
            menuc1 += `*│►* .${commands[i].pattern}\n`;
          }
        }
      };

      let menumg = `*Hello👸* ${pushname}

*╭─     ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ*
*│🕵️‍♂️ 𝘙𝘶𝘯 𝘛𝘪𝘮𝘦 -* ${runtime(process.uptime())} 
*│🕵️‍♂️ 𝘙𝘢𝘮 𝘜𝘴𝘦 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*╰──────────●●►*
*👸 𝘿𝘐𝘡𝘌𝘙 𝘔𝘋 𝘾𝘰𝘮𝘮𝘢𝘯𝘥 𝘗𝘢𝘯𝘦𝘭*
*╭──────────●●►*
*│🧙‍♂️ MAIN COMMANDS*
*│   ───────*

${menuc1}*╰───────────●●►*

*•𝘿𝘐𝙕𝙀𝙍 𝙈𝘿 𝙈𝙐𝙇𝙏𝙄 𝘿𝙀𝙑𝙄𝘾𝙀•*`;

      // Sending the menu with the specified image
      await conn.sendMessage(from, { image: { url: 'https://telegra.ph/file/a1519f1a766f7b0ed86e6.png' }, caption: menumg }, { quoted: mek, messageId: genMsgId() });

      // Send voice message after sending the menu
      const audioUrl = 'https://github.com/zeusnew/DIZER-MD-V1/raw/main/alive.mp3';  // Your provided voice file URL
      await conn.sendMessage(from, { audio: { url: audioUrl }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });

    } catch (e) {
      reply('*Error !!*');
      console.error(e);
    }
  });
