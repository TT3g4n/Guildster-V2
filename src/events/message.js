const { bot } = require("../index");

// When we recieve a message.
function onMessage(msg) {
  // TEMPORARY
  bot.prefixes.set("753481557964095518", "*");
  // TEMPORARY
  // If DM, send help message.
  try {
    if (!msg.guildId) msg.author.send(bot.helpEmbed);
  } catch (e) {
    e;
    return;
  }
  // Check for prefix of that server, and if it doesn't match the server id, stop.
  if (!msg.content.startsWith(bot.prefixes.get(msg.guildId))) return;
  // Check if the command exists.
  const cmd = msg.content.split(bot.prefixes.get(msg.guildId))[1].toString();
  console.log(bot.commands)
  if(!bot.commands.find(cmd) || !bot.aliases[cmd]) return;
  console.log("poggers") 
}

module.exports = onMessage;
