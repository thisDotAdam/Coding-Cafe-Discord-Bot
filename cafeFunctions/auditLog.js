const Discord = require("discord.js");
const moderationColor = "#b70000";
const memberModerationColor = "#00e5ff";


module.exports.run = async (type, staffMember, member, reason, other) => {
    const config = require("../config.json");
    const auditChannel = config.channels.auditChannel;
    if ((!reason) || (reason.length === 0)) reason = "N/A"

    if (type === "unmute") {
        const staffModerationEmbed = new Discord.RichEmbed()
        .setTitle(type.toUpperCase())
        .addField("Staff Member", staffMember)
        .setColor(moderationColor)
        .addField("Member", member)
        .addField("Time Muted", other)
        return auditChannel.send(staffModerationEmbed)
    }

    if (type === "deleted_Message") {
        const deletedMessageEmbed = new Discord.RichEmbed()
        .setTitle(type.toUpperCase())
        .addField("Author", member.user.username)
        .addField("Contents", other.content)
        .addField("Channel", other.channel)
        .addField("Time", Date())
        .setColor("#ff00ff")
        return auditChannel.send(deletedMessageEmbed)
    }

    if (type === "agreement") {
        const memberModerationEmbed = new Discord.RichEmbed()
        .setTitle(type.toUpperCase())
        .addField("Member", member)
        .setColor(memberModerationColor);
        return auditChannel.send(memberModerationEmbed);
    }

    const staffModerationEmbed = new Discord.RichEmbed()
    .setTitle(type.toUpperCase())
    .addField("Staff Member", staffMember.user.username)
    .setColor(moderationColor);

    if (type === "verified") {
        staffModerationEmbed
        .addField("Member", member);
        return auditChannel.send(staffModerationEmbed)
    } else if (type === "messagePurge") {
       staffModerationEmbed
        .addField("No. of Messages", other[0])
        .addField("Channel", other[1])
        .addField("Reason", reason)
        return auditChannel.send(staffModerationEmbed);
    }else if (type === "mute") {
        staffModerationEmbed
        .addField("Member", member)
        .addField("Reason", reason)
        .addField("Amount of Time", other)
        return auditChannel.send(staffModerationEmbed);
    } else {
        staffModerationEmbed
        .addField("Member", member)
        .addField("Reason", reason)
        auditChannel.send(staffModerationEmbed);
}

}