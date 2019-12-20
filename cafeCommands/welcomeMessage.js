const Discord = require("discord.js");

module.exports.run = async (bot, message, args, config) => {
    const greetings = config.greetings;
    const luaBeginnersParagraph = greetings.luaBeginnersParagraph;
    const luaStudentsParagraph = greetings.luaStudentsParagraph;
    const luaExpertsParagraph = greetings.luaExpertsParagraph;
    const footer = greetings.footer;

    const welcomeEmbed = new Discord.RichEmbed()
        .setThumbnail(bot.user.avatarURL)
        .setFooter(footer)
        .setColor("#00ff99")
        .addField(`Hello ${message.member.user.username}! :wave:`, `Everyone at Coding Café welcomes you to the community! To get verified, have a look at the #verification channel, specifically the message that includes your name.`)
        .addField("__For Lua Beginners__", luaBeginnersParagraph)
        .addField("__For Lua Students__", luaStudentsParagraph)
        .addField("__For Lua Experts__", luaExpertsParagraph);
    message.channel.send(welcomeEmbed)
    message.delete();
};

module.exports.help = {
    name : "welcomeMessage"
};
