
// need to create all roles 
const Discord = require("discord.js");

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL","REACTION"]});

const token = 'ODQ0NzEyOTY0OTI1MTYxNDcz.YKWaQA.8125lCqip-Vv6Wu8B8JCc8EOda8' 

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    
}

client.on('ready',()=>{
    console.log('This bot is good');
    if(client.channels.cache.find(c =>c.name === "startup")){
        client.channels.cache.find(c =>c.name === "startup").send("!init");
    }
    client.user.setActivity("With Time");
});

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
        client.commands.get('update').execute(message);

    } else if(command === 'reactionrole'){ // ran the first time the bot is introdced into a
        client.commands.get('reactionrole').execute(message,Discord,client,args);
    }
    // only for initiation
    else if(command === 'init'){
        client.commands.get('init').execute(message,args,client,map);
    }

});





client.login(token);