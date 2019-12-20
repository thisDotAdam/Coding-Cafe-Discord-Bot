const profileSchema = require("../schemas/profileSchema.js");
const coffeeIcon = "<:coffee_bean:537704250696794143>"

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send("You have to choose an amount of coffee beans to gamble.");
    if (args[0] === "") return message.channel.send("You have to choose an amount of coffee beans to gamble.");
    let gambleAmount = +args[0];
    if (!args[1]) return message.channel.send("You have to choose a number to bet on.");
    if (gambleAmount <= 0 || isNaN(gambleAmount)) return message.channel.send(`So, how was **${gambleAmount}** ${coffeeIcon} going to work?`);
    if (gambleAmount < 10) return message.channel.send("You have to gamble at least 10 coffee beans!");
        
    let numberBettedOn = args[1]
    if (isNaN(numberBettedOn) && numberBettedOn != "odd" && numberBettedOn != "even") return message.channel.send(`Can you tell me where on a roulette wheel the number **${numberBettedOn}** is?`);
    if (numberBettedOn < 0 || numberBettedOn > 20 && numberBettedOn != "odd" && !numberBettedOn != "even") return message.channel.send("You have to choose a number between 1 and 20 inclusive. You can also choose an 'odd' or 'even' number.");

    profileSchema.findOne({userID: message.author.id}, (err, profile) => {
        if (!profile) return message.channel.send("Hmm, I couldn't find your profile...");
        if (profile.coffeeBeans < gambleAmount) return message.channel.send("You don't have enough coffee beans, rip");
        let random = Math.ceil(Math.random()*20);

        if (numberBettedOn == "odd" && random%2 == 1 || numberBettedOn == "even" && random%2 == 0) {
            //if (message.author.id == "474212490952310786" || message.author.id == "76468222861250560") return message.channel.send(`Sorry, ${message.member}, the number was **${random+1}**. You lost. :/`)
            profile.coffeeBeans = profile.coffeeBeans + (Math.ceil(gambleAmount * 0.75))
            message.channel.send(`Yay! The number was **${random}** and you won **${Math.ceil(gambleAmount * 0.75)}** ${coffeeIcon}! You now have **${profile.coffeeBeans} ${coffeeIcon}**`)
        }
        else if (random == numberBettedOn) {
            profile.coffeeBeans = profile.coffeeBeans + (gambleAmount * 15);
            message.channel.send(`Woop! ${message.member} you guessed it! **${random}** landed and you won **${gambleAmount*15}** ${coffeeIcon}! You now have **${profile.coffeeBeans} ${coffeeIcon}**`)
        }
        else {
            message.channel.send(`Sorry, ${message.member}, the number was **${random}**. You lost. :/`);
            profile.coffeeBeans = profile.coffeeBeans - gambleAmount;
        }
        profile.save().catch(err => console.log(err));
    })
}

module.exports.help = {
    name: "roulette"
}