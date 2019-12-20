module.exports.run = async (bot, message, args) => {
    if (message.author.tag === "Wure#0979") {
        message.delete();
        return message.channel.send(args.join(" "));
    }
}

module.exports.help = {
    name: "echo"
}
