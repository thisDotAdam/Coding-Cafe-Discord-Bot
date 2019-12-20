module.exports.run = async (bot, message, args) => {
    if (message.author.id == "76468222861250560") {
        let member = message.mentions.members.first();
        if (!member) message.channel.send("Not a member, try again.");
        member.user.send(args.splice(1).join(" ")).catch(console.error);
    }
}

module.exports.help = {
    name: "msg"
}