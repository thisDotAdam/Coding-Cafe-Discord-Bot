const profileSchema = require("../schemas/profileSchema.js");

module.exports.run = async (bot, message, args) => {
    profileSchema.findOne({userID: message.author.id}, (err, profile) => {
        if (!profile) return message.channel.send("Woops, try again.");
        if (!profile.cupsOfCoffee) profile.cupsOfCoffee = 0;
        if (profile.coffeeBeans < 100) return message.channel.send("You need **100** coffee beans to make a cup of coffee.");
        profile.coffeeBeans = profile.coffeeBeans - 100;
        profile.cupsOfCoffee = profile.cupsOfCoffee + 1;
        message.channel.send(`You made a cup of coffee! You now have **${profile.cupsOfCoffee}** cups of coffee. Say \`cc.drinkCoffee\` now to drink it.`);
        profile.save().catch(err => console.log(err));
    })
}

module.exports.help = {
    name: "makeCoffee"
}