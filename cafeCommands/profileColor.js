const profileSchema = require("../schemas/profileSchema.js");
const coffeeIcon = "<:coffee_bean:537704250696794143>"

module.exports.run = async (bot, message, args) => {
  const filter = (reaction, user) => {
    return (user.id == message.author.id && reaction.emoji.name == "👍");
  }

  let colors = {
    red: "#ff0000",
    blue: "#3f00ff",
    green: "#00ff2e",
    orange: "#ff7f00",
    purple: "#ff00ee",
    pink: "#f7a0ad",
    black: "#000000",
    white: "#ffffff",
    yellow: "#fff205",
    teal: "#00ffed"
  }

  if (!args[0] || !Object.keys(colors).includes(args[0])) return message.channel.send("You have to choose a color from the following list: **"+Object.keys(colors).join("**, **")+"**.");
  profileSchema.findOne({
      userID: message.author.id
  }, (err, profile) => {
      if (profile) {
        if (profile.coffeeBeans < 100) return message.channel.send(`You need at least 100 ${coffeeIcon} to change your profile color.`);
        message.channel.send(`${message.member}, please verify that you want to change your profile color to **${args[0]}** and pay **100** ${coffeeIcon}. React to the message below to confirm, or do nothing to decline.`)
            .then(verifyMessage => {
                  verifyMessage.react("👍")
                  verifyMessage.awaitReactions(filter, {time : 9000, max : 1})
                  .then(collected => {
                    if (collected.array().length == 0) {
                        verifyMessage.delete();
                        message.channel.send("You didn't respond in time and your transaction has been cancelled.").then(cancelledMessage => setTimeout(() => {cancelledMessage.delete()}, 3000));
                    }
                    else {
                      profile.profileColor = colors[args[0]];
                      profile.coffeeBeans = profile.coffeeBeans - 100;
                      verifyMessage.delete();
                      message.channel.send(`${message.member}, your profile was updated!`);
                      profile.save().catch(err => console.log(err));
                    }
                })
            })


        
      }
  })
}

module.exports.help = {
    name: "profileColor"
}