const Discord = require("discord.js");
const client = new Discord.Client();
  module.exports.run = async (client, message) => {
    console.log(`[INFO] ${client.user.tag} is Ready!
Guild Count : ${client.guilds.cache.size}
User Count : ${client.users.cache.size}`);
      const activities = [`@Mutual help`, `over ${client.guilds.cache.size} servers!`, `over ${client.users.cache.size} users!`, `!help to view info!`, `v2 has been released!`]
      setInterval(() => {
        let activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity, 
            { type: "WATCHING"}
            );
      }, 5000);
  }