module.exports = {
  name: "update",
  description: "this updates all the times for the roles!",
  async execute(guild) {
    console.log("Updated");
    let timeRoles = await retrieveOrCreateTimeRoles(guild);
    let utcRoles = await retrieveOrCreateUtcRoles(guild);
    await removeTimeRolesFromUsers(timeRoles, guild);
    assignTimeRolesToUsers(timeRoles, utcRoles, guild);
  },
};

const fs = require("fs");
const timesoneString = fs.readFileSync("timezone.json", "utf8");
const timezones = JSON.parse(timesoneString);

async function createTimeRoles(guild) {
  let times = [];
  for (let i = 0; i < 24; i++) {
    let num = i % 12;
    if (num == 0) {
      num = 12;
    }
    times.push(num + " " + (i < 12 ? "am" : "pm"));
  }
  for (let time of times) {
    if (guild.roles.cache.find((role) => role.name === time)) {
      continue;
    }
    guild.roles
      .create({ data: { name: time, color: "BLUE" } })
      .catch(console.error);
  }
}

async function getTimeRoles(guild) {
  let times = [];
  for (let i = 0; i < 24; i++) {
    let num = i % 12;
    if (num == 0) {
      num = 12;
    }
    times.push(num + " " + (i < 12 ? "am" : "pm"));
  }
  let hourRoleIDs = [];
  const roles = await guild.roles.fetch();

  for (let time of times) {
    let roleID = roles.cache.find((role) => role.name === time).id;
    hourRoleIDs.push(roleID);
  }
  return hourRoleIDs;
}

async function retrieveOrCreateTimeRoles(guild) {
  await createTimeRoles(guild);
  let timeRoles = await getTimeRoles(guild);
  return timeRoles;
}

async function createUtcTimeRoles(guild) {
  for (let timezone of timezones) {
    let utcTime =
      "UTC" +
      (timezone.utcOffset > 0
        ? ` +${timezone.utcOffset}`
        : timezone.utcOffset < 0
        ? ` ${timezone.utcOffset}`
        : "");
    if (guild.roles.cache.find((role) => role.name === utcTime)) continue;
    await guild.roles
      .create({ data: { name: utcTime, color: "BLUE" } })
      .catch(console.error);
  }
}

async function getUtcTimeRoles(guild) {
  timeRoles = [];
  for (let i = 0; i < timezones.length; i++) {
    let string = "";
    if (timezones[i].utcOffset > 0) {
      string = string + " +" + timezones[i].utcOffset;
    } else if (timezones[i].utcOffset < 0) {
      string = string + " " + timezones[i].utcOffset;
    }
    timeRoles[i] = await guild.roles.cache.find(
      (role) => role.name === "UTC" + string
    ).id;
  }
  return timeRoles;
}

async function retrieveOrCreateUtcRoles(guild) {
  await createUtcTimeRoles(guild);
  let UtcTimeRoles = await getUtcTimeRoles(guild);
  return UtcTimeRoles;
}

async function removeTimeRolesFromUsers(timeRoles, guild) {
  for (let i = 0; i < 24; i++) {
    await guild.roles.fetch(timeRoles[i]).then((role) => {
      role.members.forEach((member) => member.roles.remove(timeRoles[i]));
    });
  }
}

async function assignTimeRolesToUsers(timeRoles, utcRoles, guild) {
  var roleOffset;
  let d = new Date();
  for (let i = 0; i < utcRoles.length; i++) {
    roleOffset = timezones[i].utcOffset;
    let membersWithRole = await guild.roles.cache.get(
      await guild.roles.cache.get(utcRoles[i]).id
    ).members;
    let u = d.getUTCHours();
    u = u + roleOffset;
    if (u < 0) {
      u = u + 24;
    } else if (u > 23) {
      u = u - 24;
    }
    if (membersWithRole.size > 0) {
      await membersWithRole.forEach((member) => {
        let timeRole = guild.roles.cache.get(timeRoles[u]);
        // remove the previous time roles
        member.roles.add(timeRole).catch(console.error);
      });
    }
  }
}
