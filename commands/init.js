
module.exports = {
    name: 'init',
    description: "initiates roles and the reaction chat with message",
    execute(message,args,client,map,timejson){
        console.log("ran");
        client.commands.get('update').execute(message,timejson);
        var d = new Date();
        var minutes = d.getUTCMinutes();
        minutes = 61 - minutes;
        minutes =  minutes * 60;
        minutes = minutes *1000;
        setTimeout(() => {
            client.commands.get('init').execute(message,args,client,map,timejson);
          }, minutes);

        const channel = message.guild.channels.cache.find(c => c.name === "choose-timezone");
        

        let timeroles = [];

        let jsonSize = 11
        for(let i = 0;i< jsonSize;i++){
        let string = "UTC";
        if(timejson[i].utcOffset > 0){
            string = string + " +" + timejson[i].utcOffset;
        }
        else if(timejson[i].utcOffset < 0){
            string = string + " " + timejson[i].utcOffset
        }

        timeroles[i] = message.guild.roles.cache.find(role => role.name === string);
        }


        


        client.on('messageReactionAdd',async(reaction,user) =>{
            
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(reaction.message.channel.id == channel){
                console.log("added role");
                let index = map[reaction.emoji.name];
                await reaction.message.guild.members.cache.get(user.id).roles.add(timeroles[index]);
                setTimeout(() => {client.commands.get('update').execute(message,timejson)}, 1000);

            }
            else{
                return;
            }
        });

        client.on('messageReactionRemove',async(reaction,user) =>{
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;

            if(reaction.message.channel.id == channel){
                console.log("removed Role");
                let index = map[reaction.emoji.name];
                await reaction.message.guild.members.cache.get(user.id).roles.remove(timeroles[index]);
                setTimeout(() => {client.commands.get('update').execute(message,timejson)}, 1000);
                
            }
            else{
                return;
            }
        });

    }
}