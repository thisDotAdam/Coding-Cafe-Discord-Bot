const profileSchema = require("../schemas/profileSchema.js");
const coffeeIcon = "<:coffee_bean:537704250696794143>"

module.exports.run = async (bot, message, args) => {
    profileSchema.findOne({userID: message.author.id}, (err, profile) => {
        if (profile) return message.channel.send(`${message.member}, you have **${profile.coffeeBeans}** ${coffeeIcon}.`);
    })
}

module.exports.help = {
    name: "cb"
}