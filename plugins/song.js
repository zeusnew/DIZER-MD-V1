const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

cmd({
    pattern: "song",
    desc: "🎶 Download Songs 🎶",
    category: "download",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, 
    botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, 
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        // Check if a search query (q) is provided
        if (!q) return reply("🚫 *Please provide a URL or song name!* 🚫");

        // Search YouTube for the query
        const search = await yts(q);
        const data = search.videos[0];
        
        // Check if any video was found
        if (!data) return reply("🚫 *No results found for your query.* 🚫");

        const url = data.url;
        
        // Create the description message
        let desc = `
🎶 *𝗗𝗜𝗭𝗘𝗥 𝗦𝗢𝗡𝗚 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥* 🎶

🎵 *𝗧𝗶𝘁𝗹𝗲:* ${data.title}
📝 *𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻:* ${data.description}
⏰ *𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻:* ${data.timestamp}
📅 *𝗨𝗽𝗹𝗼𝗮𝗱𝗲𝗱:* ${data.ago}
👀 *𝗩𝗶𝗲𝘄𝘀:* ${data.views.toLocaleString()}

🔗 *𝗟𝗶𝗻𝗸:* [Click Here](${url})

*💻 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝗗𝗜𝗭𝗘𝗥 💻*
`;

        // Send the description message with the video thumbnail
        const messagePrompt = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });
        
        // Prompt user for audio or document selection
        reply("🎉 To download, send:\n\n*1* for 🎶 *Audio File*\n*2* for 📄 *Document File*");

        // Listen for the user's response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply was for the previous message prompt
            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === messagePrompt.key.id) {
                if (selectedOption === "1" || selectedOption === "2") {
                    try {
                        // Download audio
                        const down = await fg.yta(url);
                        const downloadUrl = down.dl_url;

                        if (selectedOption === "1") {
                            // Send audio file
                            await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
                        } else if (selectedOption === "2") {
                            // Send document file
                            await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "💻 *𝗠𝗔𝗗𝗘 𝗕𝗬 𝗗𝗜𝗭𝗘𝗥* 💻" }, { quoted: mek });
                        }
                    } catch (error) {
                        console.log(error);
                        reply(`⚠️ *Error downloading file:* ${error}`);
                    }
                } else {
                    reply("🚫 Invalid option. Please reply with *1* for Audio or *2* for Document.");
                }
            }
        });
        
    } catch (e) {
        console.log(e);
        reply(`⚠️ *Error:* ${e}`);
    }
});
