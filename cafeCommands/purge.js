const Discord = require("discord.js");

module.exports.run = async (bot, message, args, config) => {
    const member = message.member;
    const roles = config.roles;
    const moderator = roles.moderator;
    const trialModerator = roles.trialModerator
    const administrator = roles.administrator;
    const channels = config.channels;
    const audit = require("../cafeFunctions/auditLog");
    const amount = parseInt(args[0]);
    const reason = args.slice(1).join(" ");
    const amountAndChannel = [amount, message.channel];

    if ((!member.roles.has(moderator.id)) && (!member.roles.has(trialModerator.id))) return message.channel.send("Nice try though. :)");
    if (!amount) return message.channel.send("You need to use a number. `purge [int]`");
    if (amount <= 0) return message.channel.send("You can't delete nothing!");
    if ((amount > 10) && ((!member.roles.has(administrator.id) && (!member.id === "76468222861250560")))) return message.channel.send("You're deleting too many.");
    if ((amount > 50) && (!message.channel.id === "516638475320164363")) return message.channel.send("You're deleting ***way*** too many messages!");
    if (amount > 99) return message.channel.send("Number too big. ;c");

    message.channel.fetchMessages({limit: amount+1})
    .then(messages => messages.array().forEach(m => {
        m.delete();
        }))
    .catch(console.error);
    
    message.channel.send(`${member} deleted ${amount} messages.`);
    audit.run("messagePurge", member, null, reason, amountAndChannel)
}

module.exports.help = {
    name: "purge"
}