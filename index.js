
// need to create all roles 
const Discord = require("discord.js");

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL","REACTION"]});

require('dotenv').config();
const token = process.env.TOKEN

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    
}

client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0).send("!reactionrole");

});

client.on('ready',()=>{
    console.log('This bot is good');
    // only finds the first server to send to must send to every server
    
    client.guilds.cache.forEach(server => {
        if(server.channels.cache.find(c =>c.name === "startup")){
            server.channels.cache.find(c =>c.name === "startup").send("!init");
        }
    });
    
    client.user.setActivity("With Time");
});
var json = `[
    {
        "emoji": "0️⃣",
        "utcOffset": -7,
        "region": "US-West"
    },
    {
        "emoji": "1️⃣",
        "utcOffset": -5,
        "region": "US-Central"
    },
    {
        "emoji": "2️⃣",
        "utcOffset": -4,
        "region": "US-East"
    },
    {
        "emoji": "3️⃣",
        "utcOffset": 0,
        "region": "Iceland"
    },
    {
        "emoji": "4️⃣",
        "utcOffset": 1,
        "region": "Belgium"
    },
    {
        "emoji": "5️⃣",
        "utcOffset": 2,
        "region": "Egypt"
    },
    {
        "emoji": "6️⃣",
        "utcOffset": 8,
        "region": "China"
    },
    {
        "emoji": "7️⃣",
        "utcOffset": 10,
        "region": "Au-East"
    },
    {
        "emoji": "8️⃣",
        "utcOffset": 12,
        "region": "Newfoundland"
    },
    {
        "emoji": "9️⃣",
        "utcOffset": -10,
        "region": "Hawaii"
    },
    {
        "emoji": "🔟",
        "utcOffset": -9,
        "region": "Atlantic Time"
    }

]`
var timejson = JSON.parse(json);

var map = {};
        map['0️⃣'] = 0;
        map['1️⃣'] = 1;
        map['2️⃣'] = 2;
        map['3️⃣'] = 3;
        map['4️⃣'] = 4;
        map['5️⃣'] = 5;
        map['6️⃣'] = 6;
        map['7️⃣'] = 7;
        map['8️⃣'] = 8;
        map['9️⃣'] = 9;
        map['🔟'] = 10;
client.on('message',message=>{
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ + /);
    const command = args.shift().toLowerCase();

    if(command === 'update'){
        client.commands.get('update').execute(message,timejson);

    } else if(command === 'reactionrole'){ // ran the first time the bot is introdced into a
        client.commands.get('reactionrole').execute(message,Discord,client,args,timejson);
    }
    // only for initiation
    else if(command === 'init'){
        client.commands.get('init').execute(message,args,client,map,timejson);
    }

});





client.login(token);