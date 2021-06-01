module.exports = {
  name: 'update',
  description: "this updates all the times for the roles!",
  async execute(message) {
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

    for(let time of times){
      let roleID = roles.cache.find(role => role.name === time).id;
      hourRoleIDs.push(roleID);
    }  

    for (let i = 0; i < 24; i++) {
      await message.guild.roles.fetch(hourRoleIDs[i]).then(role => {
        role.members.forEach(member => member.roles.remove(hourRoleIDs[i]));
      });
    }
    let offset = [
      -7,
      -5,
      -4,
      0,
      1,
      2,
      8,
      10,
      12,
      -10,
      -9
    ]
    let timeroles = [
      "UTC -7",
      "UTC -5",
      "UTC -4",
      "UTC",
      "UTC +1",
      "UTC +2",
      "UTC +8",
      "UTC +10",
      "UTC +12",
      "UTC -10",
      "UTC -9",
    ]
    var roleOffset;
    let d = new Date();
    for(let i =0;i<timeroles.length;i++){
      roleOffset = offset[i];
      let membersWithRole = await message.guild.roles.cache.get(await message.guild.roles.cache.find(role => role.name === timeroles[i]).id).members;
      let u = d.getUTCHours();
      u = u + roleOffset;
      if (u < 0) {
        u = u + 24;
      }
      else if (u > 23) {
        u = u - 24;
      }
      if(membersWithRole.size > 0){
        await membersWithRole.forEach(member => {
            setTimeout(() => {
              let timeRole = message.guild.roles.cache.get(hourRoleIDs[u]);
              // remove the previous time roles
              member.roles.add(timeRole).catch(console.error);
            }, 1000);
          });
      }
    }



    }

}