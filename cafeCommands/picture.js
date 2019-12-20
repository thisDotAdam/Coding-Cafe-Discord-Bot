module.exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first();
    if (!member) member = message.member;

    message.channel.send(member.user.displayAvatarURL);
}

module.exports.help = {
    name: "picture"
}