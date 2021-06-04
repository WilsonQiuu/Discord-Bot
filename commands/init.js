
module.exports = {
    name: 'init',
    description: "initiates roles and the reaction chat with message",
    execute(message,args,client,map){
        console.log("ran");
        client.commands.get('update').execute(message);
        var d = new Date();
        var minutes = d.getUTCMinutes();
        minutes = 61 - minutes;
        minutes =  minutes * 60;
        minutes = minutes *1000;
        setTimeout(() => {
            client.commands.get('init').execute(message,args,client,map);
          }, minutes);

        const channel = message.guild.channels.cache.find(c => c.name === "choose-timezone");
        let timeroles = [
        message.guild.roles.cache.find(role => role.name === 'UTC -7'),
        message.guild.roles.cache.find(role => role.name === 'UTC -5'),
        message.guild.roles.cache.find(role => role.name === 'UTC -4'),
        message.guild.roles.cache.find(role => role.name === 'UTC'),
        message.guild.roles.cache.find(role => role.name === 'UTC +1'),
        message.guild.roles.cache.find(role => role.name === 'UTC +2'),
        message.guild.roles.cache.find(role => role.name === 'UTC +8'),
        message.guild.roles.cache.find(role => role.name === 'UTC +10'),
        message.guild.roles.cache.find(role => role.name === 'UTC +12'),
        message.guild.roles.cache.find(role => role.name === 'UTC -10'),
        message.guild.roles.cache.find(role => role.name === 'UTC -9')
        ]
        
        // var map = {};
        // map['0️⃣'] = 0;
        // map['1️⃣'] = 1;
        // map['2️⃣'] = 2;
        // map['3️⃣'] = 3;
        // map['4️⃣'] = 4;
        // map['5️⃣'] = 5;
        // map['6️⃣'] = 6;
        // map['7️⃣'] = 7;
        // map['8️⃣'] = 8;
        // map['9️⃣'] = 9;
        // map['🔟'] = 10;
        
        
        


        client.on('messageReactionAdd',async(reaction,user) =>{
            console.log("added role");
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(reaction.message.channel.id == channel){
                let index = map[reaction.emoji.name];
                await reaction.message.guild.members.cache.get(user.id).roles.add(timeroles[index]);
                setTimeout(() => {client.commands.get('update').execute(message)}, 1000);

            }
            else{
                return;
            }
        });

        client.on('messageReactionRemove',async(reaction,user) =>{
            console.log("removed Role");
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(reaction.message.channel.id == channel){
                let index = map[reaction.emoji.name];
                await reaction.message.guild.members.cache.get(user.id).roles.remove(timeroles[index]);
                setTimeout(() => {client.commands.get('update').execute(message)}, 1000);
                
            }
            else{
                return;
            }
        });

    }
}