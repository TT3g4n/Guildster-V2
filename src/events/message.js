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
}

module.exports = onMessage;
