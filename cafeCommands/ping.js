module.exports.run = async (bot, message, args) => {
    message.channel.send("Pong! :ping_pong:");
}

module.exports.help = {
    name: "ping"
}