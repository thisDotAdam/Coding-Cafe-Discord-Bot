const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    return message.channel.send("Don't hit me, I'm working on it still!");
    
    const randomCard = (() => { 
        return Math.ceil(Math.random()*11);
    })
    let playerCount = randomCard();
    let dealerCount = randomCard();

    let refresh = () => {
        let blackjackEmbed = new Discord.RichEmbed() // create a generic embed with the consistent information...
        .setDescription(message.member+"**'s Blackjack Game**")
        .addField("Player", playerCount, true)
        .addField("Dealer", dealerCount, true)
        .setColor("#0300ed")
        return blackjackEmbed
    }
    const filter = (reaction, user) => {
        return ((user.id === message.author.id) && (reaction.emoji.name === "✅" || reaction.emoji.name === "❌" || reaction.emoji.name === "⏬"));
    }

    // when the command is first called, the member calling it should be logged so that
    // if they call it again, the code isn't run again. 
    // the first time the command is run, it should send the starting cards of each player.

    let blackjackMessage = await message.channel.send(refresh())
    .then(async message => {
        await message.react("✅")
        await message.react("❌");
        await message.react("⏬");
        message.awaitReactions(filter, {max : 1})
        .then(collected => {
            if (collected.first().emoji.name === "✅") {
                let newCard = randomCard();
                playerCount = playerCount + newCard;
                message.edit(refresh().setFooter(`You hit a ${newCard}... What would you like to do?`));
            }
            else if (collected.first().emoji.name === "❌") stand();
            else if (collected.first().emoji.name === "⏬") doubleDown();
        })
    })

    

    const hitEmbed = type => {
        const newCard = randomCard()
        playerCount = playerCount + newCard;
        return newCard, player
    }

    const doubleDown = () => {

    }

    const stand = () => {

    }


}

module.exports.help = {
    name: "blackjack"
}