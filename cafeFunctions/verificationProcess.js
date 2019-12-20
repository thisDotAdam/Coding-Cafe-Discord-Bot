module.exports.run = async (member, verificationChannel) => {
    const Discord = require("discord.js");
    const config = require("../config.json");
    const moderator = config.roles.moderator;
    const welcomeMessages = require("../cafeWelcomeMessages.json");
    const cafe = config.settings.cafeServer;
    const welcomeChannel = cafe.channels.find(channel => channel.id === "516653705131458560");
    const luaLearner = config.roles.luaLearner;
    const audit = require("./auditLog");
    let moderatorWhoReacted;
    const filter = (reaction, user) => {
        moderatorWhoReacted = cafe.member(user);
        return cafe.member(user).roles.has(moderator.id)
    }

    const verifyEmbed = new Discord.RichEmbed()
    .setTitle("VERIFY")
    .addField("Member", member)
    .setColor("#33cc33")
    .setThumbnail(member.user.displayAvatartURL)

     cafe.channels.find(channel => channel.id === "528330073326092308").send(verifyEmbed)
    .then(async (message) => {
        await message.react(`✅`);
        await message.react(`❌`);
        message.awaitReactions(filter, {max : 1})
        .then(collected => {

            if (collected.first().emoji.name === "✅") {
                let randomMessage = welcomeMessages.messages[Math.floor(Math.random()*welcomeMessages.messages.length)];
                let welcomeMessage = randomMessage.replace("${member}", `${member}`);
                
                audit.run("verified", moderatorWhoReacted, member, null);
                welcomeChannel.send(welcomeMessage);
                member.addRole(luaLearner);
                member.removeRole(member.roles.find(role => role.name === "Awaiting Verification"));
                message.delete();
            } else if (collected.first().emoji.name === "❌") {
                audit.run("unverified", moderatorWhoReacted, member, null);
                member.send(`Sorry, ${member}... You were denied access to Coding Café by a moderator. If you think this was a mistake, or unjustified, feel free to message Wure#0979 and tell him about it!`);
                setTimeout(() => {
                    member.kick()
                    message.delete()
                }, 1000);
            }
        });
    });
}