const Discord = require('discord.js')
module.exports = {
name: "addemoji",
aliases:['addemojis', 'add-these', 'addthese'],
description: "Add some emojis to your server via command.",
usage: ``,
category: "utility",
botPermission: [],
authorPermission: [],
cooldowns: 3,
ownerOnly: false,
dmOnly:false,
run: async (client, message, args, db) => {
    if (!message.member.hasPermission("MANAGE_EMOJIS")) {
        return message.channel.send(`:x: | **You Don't Have Permission To Use This Command**`)
        }
                const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
                if (!emojis) return message.channel.send(`:x: | **Provde The emojis to add**`);
                emojis.forEach(emote => {
                let emoji = Discord.Util.parseEmoji(emote);
                if (emoji.id) {
              const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
               emoji.animated ? "gif" : "png"
        }`
                    message.guild.emojis.create(
                        `${Link}`,
                        `${`${emoji.name}`}`
                    ).then(em => message.channel.send(em.toString() + " added!")).catch(error => {
                      message.channel.send(":x: | an Error occured")
                        console.log(error)
        })
                  
                }
                })
}
}