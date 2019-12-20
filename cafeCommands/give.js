const profileSchema = require("../schemas/profileSchema.js");
const coffeeIcon = "<:coffee_bean:537704250696794143>"

module.exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first();
    let beansToGive = parseInt(args[1]);
    if (!member) return message.channel.send("Select someone valid.");
    if (message.author.id != 76468222861250560) return message.channel.send(`Nice try, bub. Shoutout to <@474212490952310786>! You were just deducted **-${beansToGive}** for trying to be clever. ;) `);
    else {
        profileSchema.findOne({userID: member.user.id}, (err, profile) => {
            if (profile) profile.coffeeBeans = profile.coffeeBeans + beansToGive;
            else return message.channel.send(`${message.member}, I couldn't find the person's profile.`);
            message.channel.send(`${message.member}, I gave ${member} **${beansToGive}**${coffeeIcon}. Now they have **${profile.coffeeBeans}**${coffeeIcon} altogether.`);
            profile.save().catch(err => console.log(err));
        })
    }
}

module.exports.help = {
    name: "give"
}