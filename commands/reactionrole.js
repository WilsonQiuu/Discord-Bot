module.exports = {
    /** 
     * only ran once when the bot is first added to the server
     */
    name: 'reactionrole',
    description: "Initiates all all the roles required for the bot to run (run once)",
    async execute(message,Discord,client,args,timezones){
        // only finds the first one of the selected channels
        if(message.guild.channels.cache.find(c =>c.name === 'choose-timezone')){
            console.log("yes");
        }
        else{
            console.log("no");
            let r = await message.guild.channels.create('choose-timezone', {
                type: 'text',
                });
            r.send("!reactionrole");
                return;
        }
        
        let description = "Choosing a number will give you a bot role\n\n";
        for(let i =0;i<timezones.length;i++){
            description += `${timezones[i].emoji} for ${timezones[i].timezone} (UTC ${timezones[i].utcOffset}) ${timezones[i].region}\n`
        }
        
        let embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Choose your Timezone')
        .setDescription(description);
        
        let messageEmbed = await message.channel.send(embed);
        for(let timezone of timezones){
            messageEmbed.react(timezone.emoji);
        }

        for(let timezone of timezones){
            let utcTime = "UTC" + (timezone.utcOffset > 0 ? ` +${timezone.utcOffset}`: (timezone.utcOffset < 0 ? ` ${timezone.utcOffset}` : "") );
            if(message.guild.roles.cache.find(role => role.name === utcTime)) continue;
            message.guild.roles.create({data: {name: utcTime, color: 'BLUE',},}).catch(console.error);
        }
        let c = await message.guild.channels.create('startup', {
            type: 'text',
            })   
            .catch(console.error);
            setTimeout(() => {
            c.send("!init");
              }, 2000);

        let times = [];
        for (let i = 0; i < 24; i++) {
        let num = i % 12;
        if (num == 0) {
            num = 12;
        }
        times.push(num + " " + (i < 12 ? "am" : "pm"));
        } 
        for(let time of times){
            if(message.guild.roles.cache.find(role => role.name === time)) continue;
            message.guild.roles.create({data: {name: time,color: 'BLUE',},}).catch(console.error);
        }
    }
}