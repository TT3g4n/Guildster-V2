const { BotClient } = require("./Bot");
const { MessageEmbed } = require("discord.js");

// Declare the "bot" variable.
const bot = new BotClient();

// Export the bot before starting it, to not cause errors.
module.exports = { bot };

// Creating it's own function because it didn't like being in the main class.
process.on("unhandledRejection", (err) => {
  // bot.owners.forEach((owner) => {
  //     const user = bot.users.cache.get(owner);
  //     if (!user) {
  //         // Check that there is an ID to send the message too.
  //         console.log("No admin ID given.")
  //         return;
  //     };
  //     // Create the message
  //     const message = new MessageEmbed({
  //         description: err.toString(),
  //         color: "RED",
  //         timestamp: Date.now(),
  //         author: {
  //             name: "ERROR",
  //             iconURL: user.displayAvatarURL({ dynamic: true, format: "png" }),
  //         },
  //     })
  //     // Send the message
  //     user.dmChannel.send(message);
  // });
  // Also log the error to the console.
  console.error(
    "__________________________\nUNHANDLED PROMISE REJECTION\n\n",
    err,
    "\n__________________________\n"
  );
});

// Start the bot.
bot.start();
