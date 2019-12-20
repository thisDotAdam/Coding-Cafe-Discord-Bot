const coffeeIcon = "<:coffee_bean:537704250696794143>"
const profileSchema = require("../schemas/profileSchema.js");

module.exports.run = async (bot, message, args) => {
    const colors = ["Purple", "Pink", "Blue", "Black", "White", "Red", "Green", "Toothpaste"];
    let count;
    let chosenColor;
    const filter = (reaction, user) => {
        return (user.id == message.author.id && reaction.emoji.name == "👍");
    }

    if (!args[0]) return message.channel.send(`${message.member}, you need to specify which color you want to set your role as. Here are your options: **${colors.join("**, **")}**.`);
    let color = (args[0].charAt(0).toUpperCase() +args[0].toLowerCase().substring(1));
    if (!colors.includes(color)) return message.channel.send(`${message.member}, you need to specify which color you want to set your role as. Here are your options: **${colors.join("**, **")}**.`);
    if (message.member.roles.find(role => role.name == color)) return message.channel.send("You already have that role color, silly. :yum:");
    profileSchema.findOne({
        userID: message.author.id
    }, (err, profile) => {
        if (profile) {
            if (profile.coffeeBeans < 350) return message.channel.send(`Sorry, ${message.member}, you don't have enough coffee beans for that. You need 350 ${coffeeIcon} to change your role color.`);
            else {
                message.channel.send(`${message.member}, please verify that you want to change your role color to **${args[0]}** and pay **350** ${coffeeIcon}. React to the message below to confirm, or do nothing to decline.`)
                .then(verifyMessage => {
                  verifyMessage.react("👍")
                  verifyMessage.awaitReactions(filter, {time : 9000, max : 1})
                  .then(collected => {
                    if (collected.array().length == 0) {
                        verifyMessage.delete();
                        message.channel.send("You didn't respond in time and your transaction has been cancelled.").then(cancelledMessage => setTimeout(() => {cancelledMessage.delete()}, 3000));
                    }
                    else {
                      colors.forEach(color => {
                          message.member.roles.array().forEach(role => console.log(`${color} does not equal ${role.name}`));
                          if (message.member.roles.find(role => role.name == color)) {
                            console.log("They already had a color");
                            message.member.removeRole(bot.guilds.first().roles.find(role => role.name == color)); 
                          }
                      })
                      message.member.addRole(bot.guilds.first().roles.find(role => role.name == color));
                      profile.coffeeBeans = profile.coffeeBeans - 350;
                      verifyMessage.delete();
                      message.channel.send(`${message.member}, your role color was updated!`);
                      profile.save().catch(err => console.log(err));
                    }
                })
            })
            }
        }
    })

}

module.exports.help = {
    name: "roleColor"
}