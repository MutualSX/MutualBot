const Discord = require('discord.js')
var owners = ['812905725760110624']
module.exports = {
name: "help",
aliases:["info", "commands", "botinfo"],
description: "Displays interactive help menu.",
usage: `help`,
category: "general",
botPermission: ['EMBED_LINKS'],
authorPermission: ['SEND_MESSAGES'],
cooldowns: 5,
ownerOnly: false,
dmOnly:false,
run: async (client, message, args, db) => {
    const {
        commands
    } = client


PREFIX = '!'
    if (!args.length) {
        let categories = {

        }
        let cat = []


        commands.forEach(c => {
            if (!cat.includes(c.category)) {
                if (c.category === "Developer" && !owners.includes(message.author.id)) {
                    return;
                }
                cat.push(c.category)
            }
        })

        cat.forEach(cat => {
            let tCmds = commands.filter(cmd => cmd.category === cat)
            categories = tCmds
        })
        let xmark = '<:No:816798092514426880>'

        let abc = "React with an emoji to see it's following commands!\n\n"
        cat.forEach(element => {
            abc += `${client.emotes[element.toLowerCase()]}: **${element}**\n`
        })

        abc += `
        **Additional**:
        **Click the <:Guide:818019026252857344> to view all the commands**
        **Click <:help_house:818174483343867964> to teleport to the main menu**
        ❌ **Stop menu**
        
        [Invite Me](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) ● [Support](${client.config.support})`

        let embed = new Discord.MessageEmbed()
            .setTitle("Reaction Help Menu")
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(abc)
            .setFooter(client.user.username, client.user.displayAvatarURL())
        let msg = await message.channel.send(embed)

        for (var k of [xmark, ...Object.keys(categories), '818019026252857344', '818523288686035015']) {
            await msg.react(k)
        }

        let rFilt = (reaction, user) => {
            return [...Object.keys(categories), '818019026252857344', xmark, '818523288686035015'].includes(reaction.emoji.id) && user.id === message.author.id
        }

        let collector = msg.createReactionCollector(rFilt, {
            time: 5 * 60 * 1000
        })

        collector.on("collect", async collected => {

            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
            try {
                for (const reaction of userReactions.values()) {
                    await reaction.users.remove(message.author.id);
                }
            } catch (error) {
                client.logger.error('Failed to remove reactions.');
            }

            let reaction = collected.emoji
            if (reaction.id === "818019026252857344") {
                let cats = []
                commands.forEach(command => {
                    if (!cats.includes(command.category)) {
                        if (command.category === "Developer" && !client.config.owners.includes(message.author.id)) {
                            return;
                        }
                        cats.push(command.category)
                    }
                })

                await cats.forEach(cat => {
                    const tCommands = commands.filter(cmd => cmd.category === cat)
                    embed.addField(client.emotes[cat.toLowerCase()] + ` ${cat} [${tCommands.size}]`, tCommands.map(command => `\`${command.name}\``).join(", "))
                })
                embed.setDescription(" ")
                embed.setTitle(client.user.username + " Help")
                msg.reactions.removeAll()
                msg.edit(embed)
            } else if (reaction.id === '816798092514426880') {
                collector.stop()
                msg.reactions.removeAll()
                embed.setColor(null)
                msg.edit(embed)
            } else if (reaction.id === "824445863233060895") {
                embed.setDescription(abc)
                msg.edit(embed)
            } else {
                let content = categories[reaction.id]
                    .map(em => `\`${em.name} - ${em.description}\``)
                embed.setDescription(content.join("\n"))
                msg.edit(embed)
            }
        })

        collector.on('end', (_, reason) => {
            if (reason === "time") {
                embed.setColor(null)
                msg.edit("This message is inactive", embed)
            }
        })

    } else {
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.channel.send({
                embed: {
                    author: {
                        name: message.author.tag,
                        icon_url: message.author.displayAvatarURL()
                    },
                    color: client.colors.red,
                    description: "I can't find any command named: " + name,
                    footer: {
                        text: message.client.user.username,
                        icon_url: message.client.user.displayAvatarURL()
                    }
                }
            })
        }
        let msg = ""
        msg += (`**Name:** ${command.name}\n`);

        if (command.aliases && command.aliases.length !== 0) msg += (`**Aliases:** ${command.aliases.join(", ")}\n`);
        if (command.description) msg += (`**Description:** ${command.description}\n`);
        if (command.required && command.required.length !== 0) msg += (`**Bot Permissions:** \`${command.required.join("`, `")}\`\n`)
        if (command.user && command.user.length !== 0) msg += (`**User Permissions:** \`${command.user.join("`, `")}\`\n`)
        if (command.usage) msg += (`**Usage:** \`${PREFIX}${command.usage}\`\n`);
        if (command.premium) msg += (`**Premium:** ${command.premium}\n`)

        let helpEmbed = new Discord.MessageEmbed()
            .setTitle(":books: Command Help")
            .setDescription(msg)
            .setColor(client.colors.sky)
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .addField('\u200b', `[Invite Me](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) ● [Support](` + client.config.support + `)`)
        return message.channel.send(helpEmbed)
    }
}
}