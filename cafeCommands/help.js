const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!args[0]) {
        let helpEmbed = new Discord.RichEmbed()
        .setColor("#00ff99")
        .setThumbnail(bot.user.avatarURL)
        .setDescription("Put the name of the category after cc.help to see the commands associated with that category.")
        .setTitle("Coding Café Bot: General Commands")
        .addField("Economy", "Everything to do with coffee beans and more!")
        .addField("Gamble", "For gambling your coffee beans.")
        .addField("Members", "Profile and general member commands.")
        .addField("Misc", "All the fun and random commands.")
        .addField("Moderation", "The commands for moderators.")
        .setFooter("This bot is designed by Wure#0979. Questions or concerns should be directed to him!")
    return message.channel.send(helpEmbed);
    }
    if (args[0].toLowerCase() == "economy") {
        let economyEmbed = new Discord.RichEmbed()
        .setColor("#00ff99")
        .setThumbnail(bot.user.avatarURL)
        .setTitle("Coding Café Bot: Economy Commands")
        .addField("cc.cb", "Returns the amount of coffee beans you have.")
        .addField("cc.farm", "Gives you 50 coffee beans, or maybe more. :eyes:.")
        .addField("cc.coffeeShop <int>", "Returns the coffee shop embed where you can buy perks!.")
        .setFooter("This bot is designed by Wure#0979. Questions or concerns should be directed to him!")
        return message.channel.send(economyEmbed);
    }
    else if (args[0].toLowerCase() == "gamble") {
        let gambleEmbed = new Discord.RichEmbed()
        .setColor("#00ff99")
        .setThumbnail(bot.user.avatarURL)
        .setTitle("Coding Café Bot: Gamble Commands")
        .addField("cc.gamble [int]", "Gamble with your coffee beans!")
        .addField("cc.roulette [int] ([int] or [string])", "Choose an amount to gamble and number to bet on. Or you can bet odd and even.")
        .addField("cc.slot ([int] or [string])", "Choose an amount to gamble. You can also specify the argument 'paytable' to see the rewards.")
        .setFooter("This bot is designed by Wure#0979. Questions or concerns should be directed to him!")
        return message.channel.send(gambleEmbed);
    }
    else if (args[0].toLowerCase() == "members") {
        let membersEmbed = new Discord.RichEmbed()
        .setColor("#00ff99")
        .setThumbnail(bot.user.avatarURL)
        .setTitle("Coding Café Bot: Member Commands")
        .addField("cc.profile <member>", "Returns your profile information")
        .addField("cc.quote [string]", "Set a quote for your profile! Costs 200 coffee beans.")
        .addField("cc.match [member]", "Test your compatability with someone!")
        .addField("cc.profileColor [string]", "Changes your profile embed color. Costs 100 coffee beans.")
        .addField("cc.picture <member>", "Returns the profile picture of the member passed - if not, your own.")
        .addField("cc.roleColor [string]", "Changes the color of your role.")
        .setFooter("This bot is designed by Wure#0979. Questions or concerns should be directed to him!")
        return message.channel.send(membersEmbed);
    }
    else if (args[0].toLowerCase() == "misc") {
        let miscEmbed = new Discord.RichEmbed()
        .setColor("#00ff99")
        .setThumbnail(bot.user.avatarURL)
        .setTitle("Coding Café Bot: Misc Commands")
        .addField("cc.version", "Returns the running version of the bot.")
        .addField("cc.random [string]", "Returns a random object from the type specified. Available: cat, member, dog, meme.")
        .addField("cc.coinFlip", "Flips a coin. One question though, heads or tails?")
        .addField("cc.dieRole", "Rolls a die.")
        .addField("cc.ping", "Returns an unhelpful pong message.")
        .addField("cc.welcomeMessage", "Returns the most current version of the welcome message sent to new people who join the server.")
        .setFooter("This bot is designed by Wure#0979. Questions or concerns should be directed to him!")
        return message.channel.send(miscEmbed);
    }
    else if (args[0].toLowerCase() == "moderation") {
        let moderationEmbed = new Discord.RichEmbed()
        .setColor("#00ff99")
        .setThumbnail(bot.user.avatarURL)
        .setTitle("Coding Café Bot: Moderation Commands")
        .addField("cc.mute / cc.unmute [member] [time] <reason>", "Mutes/unmutes the person you specify..")
        .addField("cc.purge [int] <reason>", "Deletes the last number of messages specificied in the chat.")
        .addField("cc.kick [member] <reason>", "Kicks the member passed.")
        .addField("cc.listMutes", "Returns a list of muted members.")
        .addField("cc.give [member] [int]", "Gives the member the specificed amount of coffee beans.")
        .setFooter("This bot is designed by Wure#0979. Questions or concerns should be directed to him!")
        return message.channel.send(moderationEmbed);
    }
    else {
    let helpEmbed = new Discord.RichEmbed()
    .setColor("#00ff99")
    .setThumbnail(bot.user.avatarURL)
    .setDescription("Put the name of the category after cc.help to see the commands associated with that category.")
    .setTitle("Coding Café Bot: General Commands")
    .addField("Economy", "Everything to do with coffee beans and more!")
    .addField("Gamble", "The commands for gambling coffee beans")
    .addField("Members", "Profile and general member commands.")
    .addField("Misc", "All the fun and random commands.")
    .addField("Moderation", "The commands for moderators.")
    .setFooter("This bot is designed by Wure#0979. Questions or concerns should be directed to him!")
    return message.channel.send(helpEmbed);
    }
}

module.exports.help = {
    name : "help"
}