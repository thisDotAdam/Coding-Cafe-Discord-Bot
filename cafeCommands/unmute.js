 module.exports.run = async (bot, message, args, config) => {
    const roles = config.roles;
    const moderator = roles.moderator;
    const trialModerator = roles.trialModerator;
    const muted = roles.muted;
    const bots = roles.muted;
    const channel = message.channel;
    const audit = require("../cafeFunctions/auditLog");

    const personToUnmute = message.mentions.members.first();
    const reason = args.slice(1).join(" ");
    if (!personToUnmute) return channel.send(`This person does not exist. :shrug:`);
    if (personToUnmute.id === message.author.id) return channel.send("You're free to speak as you please!");
    if (personToUnmute.roles.has(moderator.id)) return channel.send("You can't unmute a moderator?");
    if (personToUnmute.id === "516656014100004881") return channel.send("Don't try that on me! >:(");
    if (!personToUnmute.roles.has(muted.id)) return channel.send("Woops, this person isn't gagged yet. (;");
    if ((!message.member.roles.has(moderator.id)) && (!message.member.roles.has(trialModerator.id))) return channel.send(`Sorry ${message.member}, but leave that to a moderator!`);
    
    const unmuteEmbed = new Discord.RichEmbed()
        .setTitle("Finally, you have been unmuted from Coding Café!")
        .setColor("#00ff99")
        .setThumbnail(bot.user.avatarURL)
        personToUnmute.send(unmuteEmbed);
    personToUnmute.removeRole(muted.id);
    channel.send(`${personToUnmute.user} was unmuted by ${message.author}`);  
    audit.run("unmute", message.member, personToUnmute, reason);
}


module.exports.help = {
    name : "unmute"
}