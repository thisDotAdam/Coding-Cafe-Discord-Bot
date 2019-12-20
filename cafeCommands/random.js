const superagent = require("superagent");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, config) => {
    if (args.length === 0) return message.channel.send("Choose a: `member` | `cat` | `dog` | `meme`");
    if (args[0].toLowerCase() === "member") {
        const cafeServer  = config.settings.cafeServer;
        return message.channel.send(`I have calculated ${cafeServer.members.random()} to be the most random person here.`);
    } 
    
    if (message.channel.id !== "516653849914638336") return message.channel.send(`Sorry, you have to use this command in <#516653849914638336>!`);
    
    if (args[0].toLowerCase() === "cat") {
        const {body} = await superagent
        .get("http://aws.random.cat/meow")

        const catEmbed = new Discord.RichEmbed()
        .setColor("#00ff99")
        .setImage(body.file);

        return message.channel.send(catEmbed);
    } else if (args[0].toLowerCase() === "dog") {
        const {body} = await superagent
        .get("https://dog.ceo/api/breeds/image/random")
        
        
        const dogEmbed = new Discord.RichEmbed()
        .setColor("#00ff99")
        .setImage(body.message);
        
        return message.channel.send(dogEmbed);
    } else if (args[0].toLowerCase() === "meme") {
        const {body} = await superagent
        .get("https://api-to.get-a.life/meme")
        
        
        const memeEmbed = new Discord.RichEmbed()
        .setColor("#00ff99")
        .setImage(body.url);
        
        return message.channel.send(memeEmbed);
    } else return message.channel.send("Choose a: `member` | `cat` | `dog` | `meme`");
}

module.exports.help = {
    name : "random"
}

