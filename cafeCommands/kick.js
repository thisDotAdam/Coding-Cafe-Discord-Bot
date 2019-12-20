Discord = require("discord.js");

module.exports.run = async (bot, message, args, config) => {
    console.log("RUNNING KICK COMMAND");
    const moderator = config.roles.moderator;
    const personToKick = message.mentions.members.first();
    const audit = require("../cafeFunctions/auditLog");
    let reason = args.slice(1).join(" ");
    if (reason.length === 0) reason = "N/A";

    if (message.member.roles.has(moderator.id) || (message.author.id === "76468222861250560")) {
        if (!personToKick) return message.channel.send("Choose a valid member to kick.");
        
        console.log(`kicking ${personToKick.user.username}`)
        if (!personToKick.kickable) return message.channel.send("You can't kick them.");

        const kickEmbed = new Discord.RichEmbed()
        .setTitle("Unfortunately, you have been kicked from Coding Café")
        .addField("Reason supplied by Moderator", reason)
        .setColor("#b70000")
        .setThumbnail(bot.user.avatarURL)
        personToKick.send(kickEmbed);
        setTimeout(() => personToKick.kick(), 3000);
        audit.run("kick", message.member, personToKick.user.username, reason);
    }
}

module.exports.help = {
    name: "kick"
}