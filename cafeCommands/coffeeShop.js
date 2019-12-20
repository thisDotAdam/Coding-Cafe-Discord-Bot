const Discord = require("discord.js");
const coffeeIcon = "<:coffee_bean:537704250696794143>";
const profileSchema = require("../schemas/profileSchema.js");
const shopEmbed = new Discord.RichEmbed()
        .setTitle("Coding Café Specials Menu")
        .setThumbnail("https://moxiemoms.com/wp-content/uploads/2018/10/pp-hot-coffee-rf-istock.jpg")
        .setColor("#00ff2e")
        .setDescription(`**External Emoji Latte - 200 ${coffeeIcon}** - Item 1\n`+
                        `A delicious, creamy latte to empower you with the ability to send emojis from your other servers!\n\n`+
                        `**Workaholic Americano - 500 ${coffeeIcon}** - Item 2\n`+
                        `A blend of the strongest coffee beans to give you the strength to work harder. Shortens your wait for the farm command by 15 minutes.\n\n`+
                        `**Black Heart Cappuccino - 100 ${coffeeIcon}** - Item 3\n`+
                        `Black coffee for a black heart. This coffee will reset your highest match and give you another chance at love.\n\n`+
                        `**Double Expresso - 500 ${coffeeIcon}** - Item 4\n`+
                        `This double hit of coffee will boost your XP for six hours!\n\n`+
                        `**Mysterious Macchiato - 300 ${coffeeIcon}** - Item 5\n`+
                        `This coffee concoction is mixed with exotic and aromatic beans. Once you drink it, you'll never be the same - at least your name won't!\n\n`+
                        `**Instant Flat White - 1000 ${coffeeIcon}** - Item 6\n`+
                        `The coffee to make you work seamlessly. Once you drink this you'll automatically get your cc.farm reward on time!`)
        .setFooter("Want to purchase a coffee? Say `cc.coffeeShop` followed by the number of the item you want to buy!")

module.exports.run = async (bot, message, args) => {
    const notEnoughBeans = `Sorry, ${message.member} but you don't have enough coffee beans for that yet. :worried:`;
    const alreadyHaveItem = `${message.member} I'm more than happy to take your coffee beans, but you already have this item - just saying! :grin:`

    // Check if there's any arguments passed, if not send the embed.
    if (!args[0]) return message.channel.send(shopEmbed);
    else {
        profileSchema.findOne({userID: message.author.id}, (err, profile) => {
            // External Emoji Role //
            if (args[0] == "1") {
                if (profile.coffeeBeans < 200) return message.channel.send(notEnoughBeans);
                if (message.member.roles.has("537753266117804053")) return message.channel.send(alreadyHaveItem);
                profile.coffeeBeans = profile.coffeeBeans - 200;
                message.member.addRole("537753266117804053");
                message.channel.send(`${message.member}, thanks for your business! You just earned the **External Emoji role**. Have fun!`);
            }
            // Workaholic Role //
            else if (args[0] == "2") {
                if (profile.coffeeBeans < 500) return message.channel.send(notEnoughBeans);
                if (message.member.roles.has("537771772993470484")) return message.channel.send(alreadyHaveItem);
                profile.coffeeBeans = profile.coffeeBeans - 500;
                message.member.addRole("537771772993470484");
                message.channel.send(`${message.member}, thanks for your business! You just earned the **Workaholic role**. Have fun!`);
            }
            // Reset Highest Match //
            else if (args[0] == "3") {
                if (profile.coffeeBeans < 100) return message.channel.send(notEnoughBeans);
                profile.coffeeBeans = profile.coffeeBeans - 100;
                profile.match = "No one </3";
                message.channel.send(`${message.member}, your highest match has been reset. You're heartless. :broken_heart:`);
            }
            else if (args[0] == "5") {
                if (profile.coffeeBeans < 300) return message.channel.send(notEnoughBeans);
                if (message.member.roles.has("538445380615012372")) return message.channel.send(alreadyHaveItem);
                profile.coffeeBeans = profile.coffeeBeans - 300;
                message.member.addRole("538445380615012372");
                message.channel.send(`${message.member}, thanks for your business! You just earned the **Mysterious Macchiato role**. Incongnito mode engaged. :eyes:!`);
            }
            // Unknown Item //
            else {
                message.channel.send(`I don't know which item **${args[0]}** is. :shrug:`)
            }
            profile.save().catch(err => console.log(err));
        })   
    }
}

module.exports.help = {
    name: "coffeeShop"
}