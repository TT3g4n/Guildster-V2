// Packages
const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const allIntents = new Intents(32767);

// Require .env file for tokens and set their variables.
require("dotenv").config();
const token = process.env.TOKEN;
const mongotoken = process.env.MONGOTOKEN;

// The main class
class BotClient extends Client {
  // Honestly IDK what this does but it's in my old code so 🤷‍♀️.
  constructor() {
    super({
      partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
      intents: allIntents,
    });
    // Set the variables that can be accesed anywhere in the project.
    this.owners = ["381024325974622209"];
    this.allCatagorys = [];
    this.embed = new MessageEmbed();
    this.fs = require("fs");
    this.path = require("path");
    this.ms = require("ms");
    this.discord = require("discord.js");
    this.commandlength = 0; // This will be set later.
    this.catagorys = {}; // This will be set later.
    this.queue = {}; // This will be set later.
    this.helpEmbed = new MessageEmbed();
    this.afkmap = new Collection();
    this.commands = new Collection();
    this.prefixes = new Collection();
  }

  // Embed
  e(description = String(), send = Boolean()) {
    return new MessageEmbed();
  }

  // Error Embed
  error(description) {
    const embed = new MessageEmbed()
      .setTimestamp(Date.now())
      .setFooter("ERROR")
      .setColor("RED")
      .setDescription(description);
    return embed;
  }

  // Capitalize
  capitalize(string = String()) {
    const capitalized =
      string.toLowerCase().charAt(0).toUpperCase() +
      string.toLowerCase().slice(1);

    return capitalized;
  }

  // Command Handler
  commandHandler() {
    require("./events/startup")();
  }

  // Feature Loader
  featureLoader() {
    this.fs.readdirSync("src/features").forEach((file) => {
      require("./features/" + file)();
    });
  }

  // Status Updates
  statusUpdates() {
    console.log(`logged in as ${this.user.tag}`);
    console.log(`${this.commandlength} commands were loaded in total.`);
    // console.log("Running on Shard", this.shard);

    const activities_list = [
      {
        name: `over ${this.guilds.cache.size} guilds! | *help`,
        type: "WATCHING",
        url: "https://www.youtube.com/T3g4n",
      },
      {
        name: `with ${this.users.cache.size} users! | *help`,
        type: "PLAYING",
      },
      { name: `the *help command!`, type: "WATCHING" },
      { name: `${this.commandlength} Commands! | *help`, type: "LISTENING" },
    ];

    setInterval(() => {
      const index = Math.floor(Math.random() * activities_list.length);

      this.user.setActivity(activities_list[index]);
    }, 1000 * 10);
  }

  // Start
  start() {
    this.login(token);
    this.commandHandler();
    this.featureLoader();
    this.once("ready", () => {
      this.statusUpdates();
    });
  }
}

module.exports = { BotClient };
