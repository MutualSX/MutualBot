const { MessageEmbed } = require("discord.js")

function embed(
    description = new String(),
    title = new String(),
) {
    const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setTimestamp()
        .setFooter(this.user.username, this.gif)
        .setColor(this.color)
    return embed
}

module.exports = { embed }
