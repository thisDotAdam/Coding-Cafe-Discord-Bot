const profileSchema = require("../schemas/profileSchema.js");
const Discord = require("discord.js");
const ms = require("ms");
const coffeeIcon = "<:coffee_bean:537704250696794143>"

module.exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first();
    if (!member) member = message.member;
    profileSchema.findOne({
        userID: member.user.id
    }, (err, profile) => {
        if (profile) {
            let status;
            if (member.presence.status == "dnd") status = "Do Not Disturb";
            else if (member.presence.status == "online") status = "Online";
            else if (member.presence.status == "offline") status = "Offline";
            else if (member.presence.status == "idle") status = "AFK";
            if (!profile.quote || profile.quote == "undefined") profile.quote = "N/A";
            if (!profile.cupsOfCoffee) profile.cupsOfCoffee = 0;
            if (!profile.lastCoffee || profile.lastCoffee == 0) lastCoffee = "Never :(";
            else lastCoffee = ms(Date.now() - profile.lastCoffee)+" ago";
            if (!profile.caffeineMeter) profile.caffeineMeter = "😫";
            if (!profile.match) profile.match = "No one </3";
            if (!member.roles.has("537771772993470484") && profile.daily+ms("60m") > Date.now()) nextFarm = ms((profile.daily+ms("60m"))-Date.now());
            else if (member.roles.has("537771772993470484") && profile.daily+ms("45m") > Date.now()) nextFarm = ms((profile.daily+ms("45m"))-Date.now());
            else nextFarm = "Now! Get farming!";
            profile.save().catch(err => console.log(err));
            const profileEmbed = new Discord.RichEmbed()
                .setColor(profile.profileColor)
                .addField("Username", member.user.username, true)
                .addField("Status", status, true)
                .addField("Join Date and Time", member.joinedAt.toLocaleString()+" GMT")
                .addField("Coffee Beans", profile.coffeeBeans+` ${coffeeIcon}`, true)
                .addField("XP", Math.floor(profile.xp), true)
                .addField("Messages Sent", profile.messageCount, true)
                .addField("Cups of Coffee", profile.cupsOfCoffee, true)
                .addField("Last Cup of Coffee", lastCoffee, true)
                .addField("Caffeine Meter", profile.caffeineMeter, true)
                .addField("Highest Match", profile.match)
                .addField("Next Farm", nextFarm)
                .addField("Quote", profile.quote)
                .setThumbnail(member.user.displayAvatarURL)
            return message.channel.send(profileEmbed);
        }
        if(!profile && message.author.id != member.user.id) return message.channel.send("Hm, it doesn't look like they have a profile.");
        if(!profile) message.channel.send("Woops, it doesn't look like you're here... Let me sign you up! Say cc.profile to see it.");
        

        const newProfile = new profileSchema({
            username: message.author.username,
            userID: message.author.id,
            avatar: message.author.displayAvatarURL,
            joinDate: message.member.joinedAt,
            xp: 0,
            coffeeBeans: 100,
            messageCount: 0,
            profileStartDate: Date(),
            daily: 0,
            quote: "N/A",
            profileColor: "",
            cupsOfCoffee: 0,
            lastCoffee: 0,
            caffeineLevel: "😫",
            match: "No one </3"
        });
        newProfile.save().catch(err => console.log(err));
    })
}

module.exports.help = {
    name: "profile"
}