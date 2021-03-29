module.exports = {
name: "t",
aliases:[],
description: "",
usage: ``,
category: "",
botPermission: [],
authorPermission: [],
cooldowns: 3,
ownerOnly: false,
dmOnly:false,
run: async (client, message, args, db) => {
    message.channel.send("Hi")
}
}