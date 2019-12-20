const Discord = require("discord.js");
const profileSchema = require("../schemas/profileSchema.js");

module.exports.run = async (bot, message, args) => {
    let match = Math.round(Math.random()*100);
    let memberToMatch = message.mentions.members.first();
    let response;
    let picture;
    const channel = message.channel;

    if (!memberToMatch) return channel.send(`${message.author} you have to pick someone.`);
    if (memberToMatch.user === message.author) return channel.send(`That match is :100: because you're perfect. (: `);
    if (memberToMatch.id == 516656014100004881) return channel.send(`Pfft, please... I'm good for anyone!`);
    if (match < 30) {
        response = `I wouldn't even go there ${message.author} :flushed:`
        picture = "https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half/public/field_blog_entry_images/2000px-Broken_heart.svg__0.png?itok=r6Hme2ll"
    } else if (match > 80) {
        response = `Wowzers, It's getting hot in here folks! :stuck_out_tongue_closed_eyes:`;
        picture = "https://upload.wikimedia.org/wikipedia/commons/2/21/Love_heart_uidaodjsdsew.gif"
    } else {
        response = `You guys can make it work :)`;
        picture = "http://www.stickpng.com/assets/images/58655cba7d90850fc3ce2a1b.png"
    }

    let matchEmbed = new Discord.RichEmbed()
    .setTitle(`Compatability Formula`)
    .setDescription(`${message.author} your compatibility with ${memberToMatch} is **${match}%**`)
    .addField("Coding Café Bot Thinks...", response)
    .setThumbnail(picture)
    .setColor("#00ff99")
    message.channel.send(matchEmbed);

    profileSchema.findOne({
        userID: message.author.id
    }, (err, profile) => {
        if (profile) {
            if (!profile.match) profile.match = memberToMatch+": "+match+"%";
            else if(profile.match.split(" ")[1].split("%")[0]<=match || profile.match == "No one </3") {
                message.channel.send(`This match was higher than your last highest match with ${profile.match.split(":")[0]}! Your highest match has been changed. ;)`);
                profile.match = memberToMatch+": "+match+"%";
            }
            profile.save().catch(err => console.log(err));
        }
    })
}

module.exports.help = {
    name : "match"
}
