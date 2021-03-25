const db = require('quick.db')
var owners = ['812905725760110624']
const Discord = require("discord.js") , cooldowns = new Discord.Collection();
module.exports.run = async (client, message) => {
  if (message.author.bot) return;
  if (!message.member.hasPermission ('ADMINISTRATOR')) {
    message.content.split (' ').forEach (m => {
    });
  }
  let fetched = await db.fetch(`prefix_${message.guild.id}`);
  const prefixes = ['!', fetched ? fetched : "", `<@!?${client.user.id}>`];
  let matchedprefix = false;
  for (const prefix of prefixes) {
    if (prefix === "") continue;
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
    );
    if (!prefixRegex.test(message.content)) continue;
    let [matchedPrefix] = message.content.match(prefixRegex);
    if (message.content.trim().toLowerCase().startsWith(matchedPrefix))
      matchedprefix = prefix;
  }

  if (!matchedprefix) return;
  const args = message.content
    .slice(matchedprefix.length)
    .trim()
    .split(/ +/);
  if (!message.member)
    message.member = await message.guild.members.fetch (message);
  const cmd = args.shift ().toLowerCase ();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd) ||  client.commands.find(command => command.aliases && command.aliases.includes(cmd));
  if (!command) command = client.commands.get (client.aliases.get (cmd));

  if (!command) return;
  if (command.botPermission) {
    let neededPerms = [];

    command.botPermission.forEach (p => {
      if (!message.guild.me.hasPermission (p)) neededPerms.push ('`' + p + '`');
    });
    let permissioa = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`
   ${client.emotes.permissions} You can\'t use this command!
    Required permissions: \`${neededPerms}\`
    `)
    .setFooter(client.user.username,client.user.displayAvatarURL())
    .setTimestamp()
    if (neededPerms.length) return message.channel.send(permissioa)
  }
  if(command.authorPermission) {
    let neededPerms = [];

    command.authorPermission.forEach (p => {
      if (!message.member.hasPermission (p)) neededPerms.push ('`' + p + '`');
    });

    if (neededPerms.length)
    return message.channel.send(permissioa)
  }

  if (command.ownerOnly) {
    if (!config.devs.includes (message.author.id))
      return;
  }
  if(command.dmOnly) {
    if(!message.channel.type === "dm") return ;
    
    }
    if(command.guildOnly) {
      if(!message.guild) return ;
      
      }

  if (!cooldowns.has(command.cooldowns)) cooldowns.set(command.cooldowns, new Discord.Collection());
  
  const member = message.member,
        now = Date.now(),
        timestamps = cooldowns.get(command.cooldowns),
        cooldownAmount = (command.cooldowns || 3) * 1000;
  if (!timestamps.has(member.id)) {
    if (!owners.includes(message.author.id)) {
      timestamps.set(member.id, now);
    }
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    
    if (now < expirationTime) {

      const timeLeft = (expirationTime - now) / 1000;
      let cooldowna = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`
      ${client.emotes.cooldown} Your on cooldown!
      Please wait \`${timeLeft.toFixed(1)}\` seconds before using this command again.
      `)
      .setFooter(client.user.username,client.user.displayAvatarURL())
      .setTimestamp()
  
      return message.channel.send(cooldowna);
    }
    
    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
  }
  if (command) command.run (client, message, args, db);
};
