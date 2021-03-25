module.exports = {
name: "nuke",
aliases:["recreate", "blow", "mp", "clear"],
description: "Completely clear a channel and recreate it.",
usage: `nuke <channel>`,
category: "Utility",
botPermission: ['ADMINISTRATOR'],
authorPermission: ['MANAGE_CHANNELS'],
cooldowns: 3,
ownerOnly: false,
dmOnly:false,
run: async (client, message, args, db) => {
    const Discord = require('discord.js')
    const att = new Discord.MessageAttachment('./static/images/nuke.gif')
    message.channel.send(`**Nuking ${message.channel.name}..**`)
    const position = message.channel.position
    const rateLimitPerUser = message.channel.rateLimitPerUser
    var newChannel = await message.channel.clone()
    newChannel.setPosition(position)
        message.channel.delete()

    newChannel.setRateLimitPerUser(rateLimitPerUser)
    newChannel.send(`**Nuked this channel, requested by <@${message.author.id}>.** ${client.emotes.success}`, att)
}
}