const Discord = require('discord.js')
const config = require('./config.json')
const token = config.bot.token
const client = new Discord.Client({presence: {
    status: 'idle'}})
    client.login(token) // login to discord
const Command = require('./handlers/Command');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.config = config.bot
client.emotes = require('./structures/Emotes.json')
client.config = require('./config.json')
client.gif = 'https://cdn.discordapp.com/attachments/824757489051369492/824769051364294706/MutualBot_Logo.gif'
client.color = '#5693f5'
client.say = require('./structures/customEmbeds.js').embed