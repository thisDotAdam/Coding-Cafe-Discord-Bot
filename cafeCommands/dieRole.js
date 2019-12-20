module.exports.run = async (bot, message, args) => {
    let random = Math.ceil(Math.random()*6);
    return message.channel.send(`The die landed on **${random}**.`)
}

module.exports.help = {
    name: "dieRole"
}