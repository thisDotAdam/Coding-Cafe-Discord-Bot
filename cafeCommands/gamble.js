const profileSchema = require("../schemas/profileSchema.js");
const coffeeIcon = "<:coffee_bean:537704250696794143>";

module.exports.run = async (bot, message, args) => {
    if (!args[0] || args[0] == "") return message.channel.send("You have to choose an amount of coffee beans to gamble.");
    let gambleAmount = +args[0];
    if (isNaN(gambleAmount)) return message.channel.send(`Can you tell me what **${args}** amount of coffee beans is? dafuq`);
    if (gambleAmount <= 0) return message.channel.send(`So, how was **${gambleAmount}** going to work if you won?`);
    if (gambleAmount < 10) return message.channel.send(`You have to gamble at least 10 ${coffeeIcon}!`);
    
    profileSchema.findOne({userID: message.author.id}, (err, profile) => {
        if (!profile) return message.channel.send("Hmm, I couldn't find your profile...");
        // Don't have enough coffee beans
        if (profile.coffeeBeans < gambleAmount) return message.channel.send("You don't have enough coffee beans, rip");
        let random = Math.ceil(Math.random()*10);
        
        // Below five, they lose
        if (random <= 5) {
            message.channel.send(`You lost all **${gambleAmount}** ${coffeeIcon} :(`);
            profile.coffeeBeans = profile.coffeeBeans - gambleAmount;
        }
        // Six, do nothing, their coffee beans remain the same
        else if (random == 6) return message.channel.send(`You broke even! You are returned **${gambleAmount}** ${coffeeIcon}.`); 
        // Above seven, multiply what they gamble by random-1/10
        else if (random >= 7) {
            profile.coffeeBeans = profile.coffeeBeans + Math.ceil(gambleAmount * (random-1)/10);
            message.channel.send(`You won **${Math.ceil(gambleAmount * (random-1)/10)}** ${coffeeIcon}!`);
        }
        profile.save().catch(err => console.log(err));
    })
}

module.exports.help = {
    name: "gamble"
}