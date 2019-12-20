const auditLog = require("../cafeFunctions/auditLog");
const ms = require("ms");
const fs = module.require("fs");

module.exports.run = async (bot, message, args, config) => {
        const roles = config.roles;
        const moderator = roles.moderator;
        const tMod = roles.trialModerator;
        const bots = roles.bots;
        const muted = roles.muted;
        const channel = message.channel;
        const time = args[1];
        let reason = args.slice(2).join(" ");
        if (reason.length === 0) reason = "N/A";

        let personToMute = message.mentions.members.first();
        if (!personToMute) return channel.send(`This person does not exist. :shrug:`);
        if (personToMute.roles.has(muted.id)) return channel.send(`${message.member} this person is already gagged. ;)`);
        if (personToMute.id === message.author.id) return channel.send("Because I'm a good bot I won't let you mute yourself! xd");
        if (personToMute.roles.has(moderator.id) && (message.member.roles.has(moderator.id))) return channel.send("Why are the moderators turning on each other!?");
        if (personToMute.roles.has(moderator.id)) return channel.send("Don't try to gag a moderator. :|");
        if (personToMute.id === "516656014100004881") return channel.send("Don't mute me! >:(");
        if (personToMute.roles.has(bots.id)) return channel.send("Don't try to silence my brothers. :angry:");
        if ((!message.member.roles.has(moderator.id)) && (!message.member.roles.has(tMod.id))) return channel.send(`Sorry ${message.member}, but leave that to a moderator!`);
        const muteEmbed = new Discord.RichEmbed()
        .setTitle("Unfortunately, you have been muted in Coding Café")
        .addField("Reason supplied by moderator", reason)
        .addField("Muted Time", time)
        .setColor("#b70000")
        .setThumbnail(bot.user.avatarURL)
        personToMute.send(muteEmbed);
        personToMute.addRole(muted.id);

        bot.mutes[personToMute.id] = {
            username : personToMute.user.username,
            moderator : message.author.username,
            amountOfTimeMuted: time,
            timeToUnmute : Date.now()+ms(time)
        }

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
            if(err) throw err;
            channel.send(`${personToMute.user} was muted by ${message.author}`);
            auditLog.run("mute", message.member, personToMute, reason, time);
        })
};

module.exports.help = {
    name: "mute"
};