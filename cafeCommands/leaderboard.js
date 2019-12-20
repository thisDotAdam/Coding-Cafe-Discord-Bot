const profileSchema = require("../schemas/profileSchema.js");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const cafe = bot.guilds.first();
    let allMembers = {}
    let membersSorted = {}
    let title = "Coffee Beans Leaderboard";
    let thumbnail = "https://upload.wikimedia.org/wikipedia/commons/c/c5/Roasted_coffee_beans.jpg"
    let color = "#77252a"
    let coffeeIcon = "<:coffee_bean:537704250696794143>"

    if (!args[0]) return message.channel.send(`${message.member}, you have to specify which leaderboard you want to see. There is **cb** and **xp**.`);
    if (args[0] != "xp" && args[0] != "cb") return message.channel.send(`${message.member}, you have to specify when leaderboard you want to see. There is **cb** and **xp**.`);
    if (args[0] == "xp") title = "Experience Leaderboard", color = "#ffff47", tail = "XP", thumbnail = "https://cdn.vox-cdn.com/thumbor/1rL9S9d96G8LAMG5fKRVdt7nYl0=/0x0:800x600/1200x800/filters:focal(336x236:464x364)/cdn.vox-cdn.com/uploads/chorus_image/image/54769977/Bliss.0.png";

    profileSchema.find().stream().on("data", document => {
        if (!cafe.member(document.userID)) return;
        if (args[0] == "cb") allMembers[document.userID] = document.coffeeBeans;
        else {
            allMembers[document.userID] = Math.floor(document.xp);
            coffeeIcon = "XP";
        }
    })
    .on("end", () => {
        membersSorted = Object.keys(allMembers).sort((a,b) => {
            return allMembers[b]-allMembers[a]
        })
        const leaderboardEmbed = new Discord.RichEmbed()
        .setTitle(title)
        .setThumbnail(thumbnail)
        .setColor(color)
        .setDescription(`1. **${(cafe.member(membersSorted[0])).displayName}**: ${allMembers[membersSorted[0]]} ${coffeeIcon}\n`+
                        `2. **${(cafe.member(membersSorted[1])).displayName}**: ${allMembers[membersSorted[1]]} ${coffeeIcon}\n`+
                        `3. **${(cafe.member(membersSorted[2])).displayName}**: ${allMembers[membersSorted[2]]} ${coffeeIcon}\n`+
                        `4. **${(cafe.member(membersSorted[3])).displayName}**: ${allMembers[membersSorted[3]]} ${coffeeIcon}\n`+
                        `5. **${(cafe.member(membersSorted[4])).displayName}**: ${allMembers[membersSorted[4]]} ${coffeeIcon}\n`+
                        `6. **${(cafe.member(membersSorted[5])).displayName}**: ${allMembers[membersSorted[5]]} ${coffeeIcon}\n`+
                        `7. **${(cafe.member(membersSorted[6])).displayName}**: ${allMembers[membersSorted[6]]} ${coffeeIcon}\n`+
                        `8. **${(cafe.member(membersSorted[7])).displayName}**: ${allMembers[membersSorted[7]]} ${coffeeIcon}\n`+
                        `9. **${(cafe.member(membersSorted[8])).displayName}**: ${allMembers[membersSorted[8]]} ${coffeeIcon}\n`+
                        `10. **${(cafe.member(membersSorted[9])).displayName}**: ${allMembers[membersSorted[9]]} ${coffeeIcon}\n`)
        message.channel.send(leaderboardEmbed); 
    })

    
}

module.exports.help = {
    name: "leaderboard"
}