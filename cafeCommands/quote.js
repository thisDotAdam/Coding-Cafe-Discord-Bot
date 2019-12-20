const profileSchema = require("../schemas/profileSchema.js");
const coffeeIcon = "<:coffee_bean:537704250696794143>"

module.exports.run = async (bot, message, args) => {
    const filter = (reaction, user) => {
        return (user.id == message.author.id && reaction.emoji.name == "👍");
    }

    let quote = args.slice(0).join(" ");
    if (quote.length == 0) return message.channel.send("Please actually quote something.")
    if (quote.length > 150 && message.author.id != "76468222861250560") return message.channel.send(`Your quote is a bit too long. It has **${quote.length}** characters and the max is **150**.`)
    profileSchema.findOne({
        userID: message.author.id
    }, (err, profile) => {
        if (profile) {
            if (profile.coffeeBeans < 200) return message.channel.send(`You need at least 200 ${coffeeIcon} to change your profile quote.`);
            message.channel.send(`${message.member}, please verify that you want to change your profile quote to **"${quote}"** and pay **200** ${coffeeIcon}. React to the message below to confirm, or do nothing to decline.`)
            .then(verifyMessage => {
                  verifyMessage.react("👍")
                  verifyMessage.awaitReactions(filter, {time : 9000, max : 1})
                  .then(collected => {
                    if (collected.array().length == 0) {
                        verifyMessage.delete();
                        message.channel.send("You didn't respond in time and your transaction has been cancelled.").then(cancelledMessage => setTimeout(() => {cancelledMessage.delete()}, 3000));
                    }
                    else {
                        profile.quote = quote;
                        profile.coffeeBeans = profile.coffeeBeans - 200;
                        message.channel.send(`${message.member}, your profile was updated!`);
                        verifyMessage.delete();
                        profile.save().catch(err => console.log(err));
                    }
                })
            })
            
        }
        else return message.channel.send("Hm, I couldn't find your profile. Try again?");
    })
}

module.exports.help = {
    name: "quote"
}