const profileSchema = require("../schemas/profileSchema.js");

module.exports.run = async (bot, message, args) => {
    profileSchema.findOne({userID: message.author.id}, (err, profile) => {
        if (!profile) return message.channel.send("Woops, try again.");
        if (!profile.cupsOfCoffee) profile.cupsOfCoffee = 0;
        if (profile.cupsOfCoffee == 0) return message.channel.send(":( You don't have any coffee to drink. Do `cc.makeCoffee` to get some!");
        profile.cupsOfCoffee = profile.cupsOfCoffee - 1;
        profile.lastCoffee = Date.now();
        // Adding caffeine to their profile
        if (!profile.caffeineMeter) profile.caffeineMetre = "😫";
        if (profile.caffeineMeter == "😫") {
            profile.caffeineMeter = "☕☕☕";
            message.channel.send(`Yum, ${message.member} you drank a coffee. You're feeling awesome now! Your coffee level is ☕☕☕ now.`);
        }
        else {
            profile.caffeineMeter = "☕☕☕☕☕";
            message.channel.send(`${message.member}, you're on a coffee high! Your coffee level is ☕☕☕☕☕ and you're ready to conquer!`);
        }
        profile.save().catch(err => console.log(err));
    })
}

module.exports.help = {
    name: "drinkCoffee"
}