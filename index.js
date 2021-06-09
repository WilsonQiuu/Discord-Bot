require("dotenv").config();

const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const token = process.env.TOKEN;
const prefix = "!";

client.on("ready", () => {
  console.log("This bot is READY");
  client.user.setActivity("With Time");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).split(/ + /);
  const command = args.shift().toLowerCase();
  if (command === "timezone") {
    client.commands.get("message").execute(Discord, client, message);
  }
  if (command === "update") {
    client.commands.get("update").execute(message.guild);
  }
});

client.login(token);
