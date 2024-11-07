const { cmd, commands } = require('../command');
const os = require("os")
const {runtime} = require('../lib/functions')

cmd({
    pattern: "menu",
    alias: ["list"],
    desc: "menu the bot",
    react: "📃",
    category: "main"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let desc = `*👋 Hello ${pushname}*

*╭─ ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ*
*│🕵️‍♂️ 𝘙𝘶𝘯 𝘛𝘪𝘮𝘦 -* ${runtime(process.uptime())} 
*│🕵️‍♂️ 𝘙𝘢𝘮 𝘜𝘴𝘦 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*╰──────────●●►*
*👸 𝘿𝘐𝘡𝘌𝘙 𝘔𝘋 𝘾𝘰𝘮𝘮𝘢𝘯𝘥 𝘗𝘢𝘯𝘦𝘭*
*╭──────────●●►*
*│🧙‍♂️ MAIN COMMANDS*
*│   ───────*
*│⚜️ LIST MENU*
*│   ───────*
*│ 1  OWNER*
*│ 2  CONVERT*
*│ 3  AI*
*│ 4  SEARCH*
*│ 5  DOWNLOAD*
*│ 6  FUN*
*│ 7  MAIN*
*│ 8  GROUP*
*│ 9  OTHER*
*╰───────────●●►*

*🔢 Reply the Number you want to select*

*_CHANNEL_:*💻 https://whatsapp.com/channel/0029Vakgqww0wajyxDXisw2U

> 𝘿𝘐𝘡𝘌𝘙 𝘔𝘋 `;

 // Send voice message after sending the menu
      const audioUrl = 'https://github.com/zeusnew/DIZER-MD-V1/raw/main/alive.mp3';  // Your provided voice file URL
      await conn.sendMessage(from, { audio: { url: audioUrl }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });


 const vv = await conn.sendMessage(from, { image: { url: "https://telegra.ph/file/a1519f1a766f7b0ed86e6.png"}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        reply(`*◈╾──DIZER OWNER MENU──╼◈*

╭────────●●►
│ • *restart* 
╰──────────────────●●►

*_CHANNEL_:*💻 https://whatsapp.com/channel/0029Vakgqww0wajyxDXisw2U

> 𝘿𝘐𝘡𝘌𝘙 𝘔𝘋`);
                        break;
                    case '2':               
                        reply(`*◈╾──DIZER CONVERT MENU──╼◈*

╭────────●●►
│ • *convert* 
╰──────────────────●●►

*_CHANNEL_:*💻 https://whatsapp.com/channel/0029Vakgqww0wajyxDXisw2U

> DIZER MD`);
                        break;
                    case '3':               
                        reply(`*◈╾──DIZER AI MENU──╼◈*

╭────────●●►
│ • *ai* 
╰──────────────────●●►

*_CHANNEL_:*💻 https://whatsapp.com/channel/0029Vakgqww0wajyxDXisw2U

> DIZER MD`);
                        break;
                    case '4':               
                        reply(`*◈╾──DIZER SEARCH MENU──╼◈*

╭────────●●►
│ • *yts* 
╰──────────────────●●►
╭────────●●►
│ • *srepo* 
╰──────────────────●●►

*_CHANNEL_:*💻 https://whatsapp.com/channel/0029Vakgqww0wajyxDXisw2U

> DIZER MD`);
                        break;
                    case '5':               
                        reply(`*◈╾──DIZER DOWNLOAD MENU──╼◈*

╭────────●●►
│ • *apk* 
╰──────────────────●●►
╭────────●●►
│ • *twitter* 
╰──────────────────●●►
╭────────●●►
│ • *gdrive* 
╰──────────────────●●►
╭────────●●►
│ • *mediafire* 
╰──────────────────●●►
╭────────●●►
│ • *fb* 
╰──────────────────●●►
╭────────●●►
│ • *ig* 
╰──────────────────●●►
╭────────●●►
│ • *movie* 
╰──────────────────●●►
╭────────●●►
│ • *song* 
╰──────────────────●●►
╭────────●●►
│ • *video* 
╰──────────────────●●►
╭────────●●►
│ • *play/yt* 
╰──────────────────●●►
╭────────●●►
│ • *song2* 
╰──────────────────●●►
╭────────●●►
│ • *video2* 
╰──────────────────●●►
╭────────●●►
│ • *tiktok* 
╰──────────────────●●►
╭────────●●►
│ • *img* 
╰──────────────────●●►

*_CHANNEL_:*💻 https://whatsapp.com/channel/0029Vakgqww0wajyxDXisw2U

> DIZER MD`);
                        break;
                    case '7':               
                        reply(`*◈╾──DIZER MAIN MENU──╼◈*

╭────────●●►
│ • *alive* 
╰──────────────────●●►
╭────────●●►
│ • *about* 
╰──────────────────●●►
╭────────●●►
│ • *menu* 
╰──────────────────●●►
╭────────●●►
│ • *allmenu* 
╰──────────────────●●►
╭────────●●►
│ • *support* 
╰──────────────────●●►
╭────────●●►
│ • *system* 
╰──────────────────●●►
╭────────●●►
│ • *ping* 
╰──────────────────●●►
╭────────●●►
│ • *runtime* 
╰──────────────────●●►

*_CHANNEL_:*💻 https://whatsapp.com/channel/0029Vakgqww0wajyxDXisw2U

> DIZER MD`);
                        break;
                    case '8':               
                        reply(`*◈╾──DIZER GROUP MENU──╼◈*

╭────────●●►
│ • *promote* 
╰──────────────────●●►
╭────────●●►
│ • *demote* 
╰──────────────────●●►
╭────────●●►
│ • *kick* 
╰──────────────────●●►
╭────────●●►
│ • *add* 
╰──────────────────●●►
╭────────●●►
│ • *admins* 
╰──────────────────●●►
╭────────●●►
│ • *tagall* 
╰──────────────────●●►
╭────────●●►
│ • *getpic* 
╰──────────────────●●►
╭────────●●►
│ • *setwelcome* 
╰──────────────────●●►
╭────────●●►
│ • *setgoodbye* 
╰──────────────────●●►
╭────────●●►
│ • *admins* 
╰──────────────────●●►
╭────────●●►
│ • *gname* 
╰──────────────────●●►

*_CHANNEL_:*💻 https://whatsapp.com/channel/0029Vakgqww0wajyxDXisw2U

> DIZER MD`);
                       break;
                    case '6':               
                        reply(`*◈╾──DIZER FUN MENU──╼◈*

╭────────●●►
│ • *dog* 
╰──────────────────●●►
╭────────●●►
│ • *fact* 
╰──────────────────●●►
╭────────●●►
│ • *hack* 
╰──────────────────●●►
╭────────●●►
│ • *quote* 
╰──────────────────●●►

*💻 Github :* https://github.com/Navinofc44/QUEEN-CHOOTY-NELUMI-MD

> DIZER MD`);

                        break;
                    case '9':               
                        reply(`*◈╾──DIZER OTHER MENU──╼◈*

╭────────●●►
│ • *githubstalk* 
╰──────────────────●●►
╭────────●●►
│ • *trt* 
╰──────────────────●●►
╭────────●●►
│ • *weather* 
╰──────────────────●●►

*_CHANNEL_:*💻 https://whatsapp.com/channel/0029Vakgqww0wajyxDXisw2U

> DIZER MD`);

                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
