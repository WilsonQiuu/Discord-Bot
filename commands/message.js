module.exports = {
  /**
   * only ran once when the bot is first added to the server
   */
  name: "message", // message
  description:
    "Initiates all all the roles required for the bot to run (run once)",
  async execute(Discord, client, message) {
    let embed = await createEmbedMessage(Discord, message, timezones);
    client.commands.get("update").execute(message.guild);
    setReactionListeners(client, embed);
    setRecurringUpdate(message, client);
  },
};

const fs = require("fs");
const timesoneString = fs.readFileSync("timezone.json", "utf8");
const timezones = JSON.parse(timesoneString);

async function createEmbedMessage(Discord, message, timezones) {
  let description = "Choosing a number will give you a bot role\n\n";
  for (let i = 0; i < timezones.length; i++) {
    description += `${timezones[i].emoji} for ${timezones[i].timezone} (UTC ${timezones[i].utcOffset}) ${timezones[i].region}\n`;
  }

  let embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle("Choose your Timezone")
    .setDescription(description);
  let messageEmbed = await message.channel.send(embed);

  for (let timezone of timezones) {
    await messageEmbed.react(timezone.emoji);
  }
  return messageEmbed;
}

var map = {};
for (let i = 0; i < timezones.length; i++) {
  map[timezones[i].emoji] = i;
}

function findUtcTimeRoles(message) {
  let timeroles = [];
  for (let i = 0; i < timezones.length; i++) {
    let string = "UTC";
    if (timezones[i].utcOffset > 0) {
      string = string + " +" + timezones[i].utcOffset;
    } else if (timezones[i].utcOffset < 0) {
      string = string + " " + timezones[i].utcOffset;
    }
    timeroles[i] = message.guild.roles.cache.find(
      (role) => role.name === string
    );
  }
  return timeroles;
}

function setReactionListeners(client, message, timezones) {
  setReactionAddListener(client, message, timezones);
  setReactionRemoveListeners(client, message, timezones);
}

async function setReactionAddListener(client, message) {
  client.on("messageReactionAdd", async (reaction, user) => {
    let timeroles = findUtcTimeRoles(message);
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.emoji.name === "") {
    }

    if (reaction.message.id == message.id) {
      console.log("added role");
      let index = map[reaction.emoji.name];
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(timeroles[index]);
      setTimeout(() => {
        client.commands.get("update").execute(message.guild);
      }, 1000);
    } else {
      return;
    }
  });
}

async function setReactionRemoveListeners(client, message) {
  client.on("messageReactionRemove", async (reaction, user) => {
    let timeroles = findUtcTimeRoles(message);
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.id == message.id) {
      console.log("removed Role");
      let index = map[reaction.emoji.name];
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(timeroles[index]);
      setTimeout(() => {
        client.commands.get("update").execute(message.guild);
      }, 1000);
    } else {
      return;
    }
  });
}

async function setRecurringUpdate(message, client) {
  var d = new Date();
  var minutes = d.getUTCMinutes();
  minutes = 61 - minutes;
  minutes = minutes * 60;
  minutes = minutes * 1000;
  var hour = 60 * 60 * 1000;
  setTimeout(() => {
    client.commands.get("update").execute(message.guild);
    setInterval(() => {
      client.commands.get("update").execute(message.guild);
    }, hour);
  }, minutes);
}
