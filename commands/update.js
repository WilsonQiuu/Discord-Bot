
module.exports = {
  name: 'update',
  description: "this updates all the times for the roles!",
  async execute(message, timezones) {
    // the array of roles that represent time

    let times = [];
    for (let i = 0; i < 24; i++) {
      let num = i % 12;
      if (num == 0) {
        num = 12;
      }
      times.push(num + " " + (i < 12 ? "am" : "pm"));
    }
    let hourRoleIDs = [];
    const roles = await message.guild.roles.fetch();

    for (let time of times) {
      let roleID = roles.cache.find(role => role.name === time).id;
      hourRoleIDs.push(roleID);
    }

    for (let i = 0; i < 24; i++) {
      await message.guild.roles.fetch(hourRoleIDs[i]).then(role => {
        role.members.forEach(member => member.roles.remove(hourRoleIDs[i]));
      });
    }
    let timeroles = [];

    for (let i = 0; i < timezones.length; i++) {
      let string = "";
      if (timezones[i].utcOffset > 0) {
        string = string + " +" + timezones[i].utcOffset;
      }
      else if (timezones[i].utcOffset < 0) {
        string = string + " " + timezones[i].utcOffset
      }
      timeroles[i] = "UTC" + string;
    }

    var roleOffset;
    let d = new Date();
    for (let i = 0; i < timeroles.length; i++) {
      roleOffset = timezones[i].utcOffset;
      let membersWithRole = await message.guild.roles.cache.get(await message.guild.roles.cache.find(role => role.name === timeroles[i]).id).members;
      let u = d.getUTCHours();
      u = u + roleOffset;
      if (u < 0) {
        u = u + 24;
      }
      else if (u > 23) {
        u = u - 24;
      }
      if (membersWithRole.size > 0) {
        await membersWithRole.forEach(member => {
          setTimeout(() => {
            let timeRole = message.guild.roles.cache.get(hourRoleIDs[u]);
            // remove the previous time roles
            member.roles.add(timeRole).catch(console.error);
          }, 1000);
        });
      }
    }
    var minutes = d.getUTCMinutes();
    minutes = 61 - minutes;
    minutes =  minutes * 60;
    minutes = minutes *1000;
    setTimeout(() => {
        client.commands.get('update').execute(message,args,client,map,timezones);
      }, minutes);
  }

}