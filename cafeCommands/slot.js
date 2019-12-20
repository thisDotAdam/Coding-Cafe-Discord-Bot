const profileSchema = require("../schemas/profileSchema.js");
const coffeeIcon = "<:coffee_bean:537704250696794143>"
const Discord = require("discord.js");
const emojis = ["🍉", "🍉",  "🍒", "☘", "☕", "<:coffee_bean:537704250696794143>"];
const checkLine = (element, index, array) => {
    return element == array[0];
}
const payTable = {
    "🍉": 2,
    "🍒": 4,
    "☘": 6,
    "☕": 8,
    "<:coffee_bean:537704250696794143>": 12
}
const handleWin = (currentCB, gambleAmount, emoji, message, slotEmbed, winMessage) => {
    message.channel.send(slotEmbed.setColor("#3de51b"))
    setTimeout(() => message.channel.send(winMessage), 1200);
    return currentCB + (gambleAmount * payTable[emoji]);
}

const payTableEmbed = new Discord.RichEmbed()
    .setTitle("Slots Paytable")
    .setDescription(`🍉: x${payTable["🍉"]}\n`+
                    `🍒: x${payTable["🍒"]}\n`+
                    `☘: x${payTable["☘"]}\n`+
                    `☕: x${payTable["☕"]}\n`+
                    `<:coffee_bean:537704250696794143>: x${payTable["<:coffee_bean:537704250696794143>"]}`
                    )
    .setColor("#3de51b")
    .setThumbnail("http://img.clipartlook.com/slot-machine-clip-art-clipart-best-slot-machine-clip-art-502_554.png")

module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send("You have to choose an amount of coffee beans to gamble.");
    if (args[0] === "") return message.channel.send("You have to choose an amount of coffee beans to gamble.");
    if (args[0].toLowerCase() == "paytable") return message.channel.send(payTableEmbed);
    let gambleAmount = +args[0];
    if (isNaN(gambleAmount)) return message.channel.send(`Can you tell me what **${args}** amount of coffee beans is? dafuq`);
    if (gambleAmount <= 0) return message.channel.send(`So, how was **${gambleAmount}** going to work if you won?`);
    if (gambleAmount < 10) return message.channel.send(`You have to gamble at least 10 ${coffeeIcon}!`);
    let lines = [];
    let slotMessage = "";
    
    profileSchema.findOne({userID: message.author.id}, (err, profile) => {
        if (!profile) return message.channel.send("Woops, try that again.");
        if (profile.coffeeBeans < gambleAmount) return message.channel.send("Sorry, you don't have enough coffee beans. :sob:");

        // make three array of three random emojis
        for(let i=0; i<3; i++) {
            lines[i] = [emojis[Math.floor(Math.random()*emojis.length)], emojis[Math.floor(Math.random()*emojis.length)], emojis[Math.floor(Math.random()*emojis.length)]];
            slotMessage = slotMessage + lines[i].join("")+"\n";
        }

        // Send the slot message
        const slotEmbed = new Discord.RichEmbed()
        .setTitle(`${message.member.displayName}'s Slot`)
        .setDescription(slotMessage)

        // Three in a row
        if (lines[1].every(checkLine)) {
            if (lines[1][0] == "🍉") {
                profile.coffeeBeans = handleWin(profile.coffeeBeans, gambleAmount, lines[1][0], message, slotEmbed, `Well done! ${message.member}, you won ${gambleAmount * payTable["🍉"]} ${coffeeIcon}!`)
            }
            else if (lines[1][0] == "🍒") {
                profile.coffeeBeans = handleWin(profile.coffeeBeans, gambleAmount, lines[1][0], message, slotEmbed, `Cool, ${message.member}! You won ${gambleAmount * payTable["🍒"]} ${coffeeIcon}!`);
            }
            else if (lines[1][0] == "☘") {
                profile.coffeeBeans = handleWin(profile.coffeeBeans, gambleAmount, lines[1][0], message, slotEmbed, `Awesome!! ${message.member}! You won ${gambleAmount * payTable["☘"]} ${coffeeIcon}!`);
            }
            else if (lines[1][0] == "☕") {
                profile.coffeeBeans = handleWin(profile.coffeeBeans, gambleAmount, lines[1][0], message, slotEmbed, `Woahhh, ${message.member}! You won ${gambleAmount * payTable["☕"]} ${coffeeIcon}!`);
            }
            else {
                profile.coffeeBeans = handleWin(profile.coffeeBeans, gambleAmount, lines[1][0], message, slotEmbed, `Woahhh, ${message.member}! You won ${gambleAmount * payTable["<:coffee_bean:537704250696794143>"]} ${coffeeIcon}!`);
            }
        }
        // Two in a row
        else if (lines[1][0] == lines[1][1]) {
            message.channel.send(slotEmbed.setColor("#eded23"))
            setTimeout(() => message.channel.send(`${message.member} you won back what you bet.`), 1300);
        }
        // Got nothing
        else {
            message.channel.send(slotEmbed.setColor("#f90000"));
            profile.coffeeBeans = profile.coffeeBeans - gambleAmount
        }
        profile.save().catch(err => console.log(err));
    })
}

module.exports.help = {
    name: "slot"
}