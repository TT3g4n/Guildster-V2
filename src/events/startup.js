// This file will be run on startup, and holds code to make "Bot.js" cleaner.

// Imports
const { bot } = require("../index");
const fs = bot.fs;
const path = bot.path;

async function readdir() {
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
    if (!file) return;
    if (!file.endsWith(".js")) return;
    const props = require(file);
    try {
      props;
    } catch (e) {
      console.log(e);
    }

    bot.commands.set(props.name.toLowerCase(), props);

    // Adds the category to a list of all categories for easy access.
    if (!bot.categorys[props.category]) {
      bot.categorys[props.category] = [];
      bot.allcategorys.push(props.category);
    }

    bot.categorys[props.category].push(props.name);

    // Make sure the command has all the correct properties.
    if (!props.aliases) console.error(props.name + " has no aliases.");
    if (!props.name) console.error(props.name + " has no name.");
    if (!props.usage) console.error(props.name + " has no usage.");
    if (!props.description) console.error(props.name + " has no description.");
    if (!props.category) console.error(props.name + " has no category.");

    // Add 1 to the command length.
    bot.commandlength++;
  });
}

// Export the functions.
module.exports = { readdir };
