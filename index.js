
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

const timesoneString =  fs.readFileSync('timezone.json', 'utf8');
let timezones = JSON.parse(timesoneString);


var map = {};   
for(let i = 0;i<timezones.length;i++){
    map[timezones[i].emoji] = i;
}
    
client.on('message',message=>{
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ + /);
    const command = args.shift().toLowerCase();

    if(command === 'update'){
        client.commands.get('update').execute(message,timezones);

    } else if(command === 'reactionrole'){ // ran the first time the bot is introdced into a
        client.commands.get('reactionrole').execute(message,Discord,client,args,timezones);
    }
    // only for initiation
    else if(command === 'init'){
        client.commands.get('init').execute(message,args,client,map,timezones);
    }

});








client.login(token);