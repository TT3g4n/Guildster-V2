// This file will be run on startup, and holds code to make "Bot.js" cleaner.

// Imports
const { bot } = require("../index");
const fs = bot.fs;
const path = bot.path;

function readdir() {
  // Credit to SalvageDev for the below function. It basically gets folders inside of folders and puts them in an array.
  function find_nested(dir, pattern) {
    let results = [];

    fs.readdirSync(dir).forEach((inner_dir) => {
      inner_dir = path.resolve(dir, inner_dir);
      const stat = fs.statSync(inner_dir);

      if (stat.isDirectory()) {
        results = results.concat(find_nested(inner_dir, pattern));
      }
      if (stat.isFile() && inner_dir.endsWith(pattern)) {
        results.push(inner_dir);
      }
    });

    return results;
  }

  // Find the commands inside the folders
  find_nested("src/commands", ".js").forEach(async (file) => {
    // Chech that there is a file and that it is a command.
    if (!file || !file.endsWith(".js")) return;
    // Load the file.
    const command = require(file);
    try {
      command;
    } catch (err) {
      console.log(err);
    }

    // Add it to the list of commands.
    bot.commands.set(command.name.toLowerCase(), command);

    // Adds the category to a list of all categories for easy access.
    if (!bot.allcatagories[command.catagory]) {
      // Check if the catagory is already in the list
      bot.allcatagories[command.catagory] = []; // If not, create the list.
      bot.allcatagories[command.catagory].push(command.catagory); // Add the catagory to the list.
    }

    // Make sure the command has all the correct properties, and print them to the console if it doesn't.
    if (!command.name) console.error(command.name + " has no name.");
    if (!command.aliases) console.error(command.name + " has no aliases.");
    if (!command.usage) console.error(command.name + " has no usage.");
    if (!command.description)
      console.error(command.name + " has no description.");
    if (!command.catagory) console.error(command.name + " has no category.");

    // Add 1 to the command length.
    bot.commandlength++;
  });

  // Set the help command.
  
}

// Export the functions.
module.exports = readdir;
