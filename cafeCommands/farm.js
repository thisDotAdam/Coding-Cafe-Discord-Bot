const profileSchema = require("../schemas/profileSchema.js");
const ms = require("ms");
const coffeeIcon = "<:coffee_bean:537704250696794143>"
const farmResponse = (cbGiven, cbNow, caffeine) => {
    if (!caffeine) return `You got **${cbGiven}** ${coffeeIcon} for your work. You have **${cbNow}** ${coffeeIcon} altogether now.`;
    else return `You got **${cbGiven}** ${coffeeIcon} for your **energetic work**! You have **${cbNow}** ${coffeeIcon} altogether now.`;
}
const caffeineCheck = (userID, message) => {profileSchema.findOne({userID: userID}, (err, profile)  => {
        profile.daily = Date.now();
        // No caffeine meter, given them one
        if (!profile.caffeineMeter) profile.caffeineMeter = "😫";
        // If they have caffeine
        if (profile.caffeineMeter != "😫") {
            if (profile.caffeineMeter === "☕") profile.caffeineMeter = "😫";
            // They have more than one coffee, take away one coffee from the string.
            else profile.caffeineMeter = profile.caffeineMeter.substring(0, profile.caffeineMeter.length-1);
            profile.coffeeBeans = profile.coffeeBeans + 200;
            message.channel.send(farmResponse(200, profile.coffeeBeans, true));
        }
        // If they don't have caffeine
        else {
            profile.coffeeBeans = profile.coffeeBeans + 50;
            message.channel.send(farmResponse(50, profile.coffeeBeans));
        }
        profile.save().catch(err => console.log(err));
    })
}

module.exports.run = async (bot, message, args) => {
    profileSchema.findOne({userID: message.author.id}, (err, profile) => {
        // No profile, tell them to make one
        if (!profile) return message.channel.send("You need to make a profile first. Say `cc.profile`.");
        // No daily, give them one
        if (!profile.daily) {
            profile.daily = Date.now()
            profile.coffeeBeans = profile.coffeeBeans + 50;
            profile.save().catch(err => console.log(err));
            return message.channel.send(farmResponse(50, profile.coffeeBeans));
        }
        // Check if time is less that 45 minutes and if they have the Workaholic role, give them their beans
        else if (profile.daily+ms("45m") < Date.now() && message.member.roles.has("537771772993470484")) caffeineCheck(message.author.id, message); 
        // Check if time is less than 60m and if it is give them their beans
        else if (profile.daily+ms("60m") < Date.now()) caffeineCheck(message.author.id, message);
        // They have to wait for farm time. Return the time they have to wait
        else {
            if (!message.member.roles.has("537771772993470484")) return message.channel.send(`You need to wait another **${ms((profile.daily + ms("60m")) - Date.now())}** before you can get more coffee beans.`);
            else return message.channel.send(`You need to wait another **${ms((profile.daily + ms("45m")) - Date.now())}** before you can get more coffee beans.`)
        }
    })
}

module.exports.help = {
    name: "farm"
}