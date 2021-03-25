const Discord = require('discord.js')
const client = new Discord.Client({presence: {
    status: 'idle'}})
const { token } = require('./config.json');
const Command = require('./handlers/Command');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.emotes = require('./structures/Emotes.json')
client.config = require('./config.json')

client.login(token)
