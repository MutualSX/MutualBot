const Discord = require('discord.js')
var moment = require('moment')
module.exports = {
name: "serverinfo",
aliases:['si', 'guildinfo', 'server', 'guild'],
description: "Get info about the server you're on.",
usage: ``,
category: "",
botPermission: [],
authorPermission: [],
cooldowns: 3,
ownerOnly: false,
dmOnly:false,
run: async (client, message, args, db) => {
    const filterLevels = {
        DISABLED: 'Off',
        MEMBERS_WITHOUT_ROLES: 'No Role',
        ALL_MEMBERS: 'Everyone'
    };

    const verificationLevels = {
        NONE: 'None',
        LOW: 'Low',
        MEDIUM: 'Medium',
        HIGH: '(╯°□°）╯︵ ┻━┻',
        VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
    };

    const regions = {
        brazil: 'Brazil :flag_br:',
        europe: 'Europe :flag_eu:',
        hongkong: 'Hong Kong :flag_hk:',
        india: 'India :flag_in:',
        japan: 'Japan :flag_jp:',
        russia: 'Russia :flag_ru:',
        singapore: 'Singapore :flag_sr:',
        southafrica: 'South Africa :flag_ss:',
        sydeny: 'Sydeny :flag_sy:',
        'us-central': 'US Central :flag_us:',
        'us-east': 'US East :flag_us:',
        'us-west': 'US West :flag_us:',
        'us-south': 'US South :flag_us:'
    };

    const flags = {
        DISCORD_EMPLOYEE: 'Discord Employee',
        DISCORD_PARTNER: 'Discord Partner',
        BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
        BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
        HYPESQUAD_EVENTS: 'HypeSquad Events',
        HOUSE_BRAVERY: 'House of Bravery',
        HOUSE_BRILLIANCE: 'House of Brilliance',
        HOUSE_BALANCE: 'House of Balance',
        EARLY_SUPPORTER: 'Early Supporter',
        TEAM_USER: 'Team User',
        SYSTEM: 'System',
        VERIFIED_BOT: 'Verified Bot',
        VERIFIED_DEVELOPER: 'Verified Bot Developer'
    };
    const rolesGuild = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    const membersGuild = message.guild.members.cache;
    const channelsGuild = message.guild.channels.cache;
    const emojisGuild = message.guild.emojis.cache;
    const argument = args[0];

    let online = message.guild.members.cache.filter(member => member.user.presence.status == 'online' && !member.user.bot);
    let offline = message.guild.members.cache.filter(member => member.user.presence.status == 'offline' && !member.user.bot);
    let idle = message.guild.members.cache.filter(member => member.user.presence.status == 'idle' && !member.user.bot);
    let dnd = message.guild.members.cache.filter(member => member.user.presence.status == 'dnd' && !member.user.bot);
    let bots = message.guild.members.cache.filter(member => member.user.bot);
    const embed = new Discord.MessageEmbed()
        .setDescription(`**Guild information for __${message.guild.name}__**`)
        .setColor(client.color)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField(`Owner <:771637500967124994:824762111409389618>`, `${message.guild.owner.user.tag} (<@${message.guild.owner.id}>)`,true)
     .addField(`Channels`, `<:channel:824762540058869772> **Text:** ${channelsGuild.filter(channel => channel.type === 'text').size}
     <:voc:824761624895946813> **Voice:** ${channelsGuild.filter(channel => channel.type === 'voice').size}`,true)
     .addField(`Region`, `${regions[message.guild.region]}`,true)
     .addField(`Verification Level`, `${verificationLevels[message.guild.verificationLevel]}`,true)
     .addField(`Boosts`,`${message.guild.premiumSubscriptionCount || 'No'} Boosts (Level ${message.guild.premiumTier || 'not earned'})`,true)
     .addField(`AFK Channel`, `${message.guild.afkChannelID === null ? 'No AFK Channel' : client.channels.cache.get(message.guild.afkChannelID).name} (${message.guild.afkChannelID === null ? '' : message.guild.afkChannelID})`,true)

        .addField('Stats', [
            `**❯ Members:** ${message.guild.memberCount} / ${message.guild.maximumMembers} (maximum members)`,
            `**❯ Created at:** ${moment(message.guild.createdTimestamp).format('LL')} at  ${moment(message.guild.createdTimestamp).format('LT')} (${moment(message.guild.createdTimestamp).fromNow()})`,
            `**❯ Content filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
            `**❯ Verification level:** ${verificationLevels[message.guild.verificationLevel]}`,

            '\u200b'
        ])

        .addField('Member Stats <:Z_Dark_Hypesquad:824761622483566593>', [
            `\n**❯ Total users for __${message.guild.name}__:** \`${message.guild.memberCount}\`\n`,
            `**<:OnlineStatus:820753717095170088> Online users:** \`${online.size}\``,
            `**<:IdleStatus:820753718593060944> Idle users:** \`${idle.size}\``,
            `**<:DnDStatus:820753715921158226> DnD users:** \`${dnd.size}\``,
            `**<:OfflineStatus:820753717669396521> Offline users:** \`${offline.size}\``,
            `\n**<:bot:824770546779553824> Bots in the server:** \`${bots.size}\``
        ])
        .setFooter(client.user.username + ` | ${message.guild.name}`,client.gif)

        .setTimestamp();

    message.channel.send(embed);

}
}