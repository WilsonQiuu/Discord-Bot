
module.exports = {
    /** 
     * only ran once when the bot is first added to the server
     */
    name: 'reactionrole',
    description: "Initiates all all the roles required for the bot to run (run once)",
    async execute(message,Discord,client,args){
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
        let emojis = [
        '0️⃣',
        '1️⃣',
        '2️⃣',
        '3️⃣',
        '4️⃣',
        '5️⃣',
        '6️⃣',
        '7️⃣',
        '8️⃣',
        '9️⃣',
        '🔟'
        ]
        let embed = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Choose your Timezone')
        .setDescription('Choosing a number will give you a bot role\n\n'
        + `${emojis[0]} for PST (UTC -7) US-West\n`
        + `${emojis[1]} for EST (UTC -5) US-Central\n`
        + `${emojis[2]} for EDT (UTC -4) US-East\n`
        + `${emojis[3]} for GMT (UTC) Iceland\n`
        + `${emojis[4]} for ECT (UTC +1) Belgium\n`
        + `${emojis[5]} for EET (UTC +2) Egypt\n`
        + `${emojis[6]} for CTT (UTC +8) China\n`
        + `${emojis[7]} for AET (UTC +10)\n`
        + `${emojis[8]} for NST (UTC +12)\n`
        + `${emojis[9]} for HST (UTC -10) Australian East\n`
        + `${emojis[10]} for AST (UTC -9) Atlantic Time`
        );

        
        
        let messageEmbed = await message.channel.send(embed);
        for(let i = 0;i<emojis.length;i++){
            messageEmbed.react(emojis[i]);
        }
        message.guild.roles.create({data: {name: 'UTC -7',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: 'UTC -5',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: 'UTC -4',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: 'UTC',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: 'UTC +1',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: 'UTC +2',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: 'UTC +8',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: 'UTC +10',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: 'UTC +12',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: 'UTC -10',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: 'UTC -9',color: 'BLUE',},}).catch(console.error);
        let c = await message.guild.channels.create('startup', {
            type: 'text',
            })   
            .catch(console.error);
            setTimeout(() => {
            c.send("!init");
              }, 2000);
        message.guild.roles.create({data: {name: '12 am',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '1 am',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '2 am',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '3 am',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '4 am',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '5 am',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '6 am',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '7 am',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '8 am',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '9 am',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '10 am',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '11 am',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '12 pm',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '1 pm',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '2 pm',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '3 pm',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '4 pm',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '5 pm',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '6 pm',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '7 pm',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '8 pm',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '9 pm',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '10 pm',color: 'BLUE',},}).catch(console.error);
        message.guild.roles.create({data: {name: '11 pm',color: 'BLUE',},}).catch(console.error);


        



    }
}


