const profileSchema = require("../schemas/profileSchema.js");

module.exports.run = async (bot, message) => {
    profileSchema.findOne({
        userID: message.author.id
    }, (err, profile) => {
        if (profile) {
            profile.messageCount = profile.messageCount + 1;
            profile.xp = profile.xp + 0.1;
            //message.channel.send("xp: "+profile.xp+" modulus: "+profile.xp%5);  
            if (profile.xp%10 <= 0.1 && Math.floor(profile.xp) != 0) message.channel.send(`${message.member} has **${Math.floor(profile.xp)} xp** now!`)
            profile.save().catch(err => console.log(err));
        }
    })
}