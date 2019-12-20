unirest = require("unirest");
Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    try {
        unirest.get(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${args.join(" ")}`)
        .header("X-RapidAPI-Key", "5cf4100a4amsh639ed7e9e29eee5p147548jsn93771f9b0436")
        .end(function (result) {
            if (!result.body.list) return message.channel.send("Something isn't right, try that again.");
            //console.log(result.status, result.headers, result.body);
            if (result.body.list.length == 0) return message.channel.send(`There were no results on Urban Dictionary for **${args.join(" ")}**, rip :shrug:`);
            return message.channel.send(result.body.list[0].permalink);
        });
    }
    catch(err) {
        console.log(err)
        message.channel.send("unirest error: " + err);
    } 
}

module.exports.help = {
    name: "def"
}