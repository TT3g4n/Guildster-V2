const { BotClient } = require("./Bot");

// Declare the "bot" variable.
const bot = new BotClient();

// Export the bot before starting it, to not cause errors.
module.exports = { bot };

// Start the bot.
bot.start();
