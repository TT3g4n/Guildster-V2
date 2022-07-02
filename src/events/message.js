const { MessageEmbed, Message } = require("discord.js");
const { bot } = require("../index");
/**
 * @param {Message} msg
 */
// When we recieve a message.
function onMessage(msg) {
  // TEMPORARY
  bot.prefixes.set("753481557964095518", "*");
  // TEMPORARY
  // If DM, send help message.
  try {
    if (!msg.guildId) {
      msg.author.send({ embeds: [bot.helpEmbed] });
      return;
    }
    if (msg.author.bot) return;
  } catch (e) {
    e;
    return;
  }
  // Set the prefix variable
  const prefix = bot.prefixes.get(msg.guildId);
  // Check for prefix of that server, and if it doesn't match the server id, stop.
  if (!msg.content.startsWith(prefix)) return;
  // Set the variables needed.
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  // Check if the command exists.
  const command =
    bot.commands.get(cmd) ||
    bot.commands.find((c) => c.aliases && c.aliases.includes(cmd));
  if (!command) return;
  try {
    command.run(msg, args);
  } catch (e) {
    console.log("\n", e);
  }
}

module.exports = onMessage;
