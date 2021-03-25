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
  message.channel.send("This is working, hmm?")
}
}