module.exports.run = async (bot, message, args) => {
    if(Math.random > 0.5) message.channel.send(`You got heads. :arrow_up:`); 
    else message.channel.send(`You got tails. :arrow_down:`);
}

module.exports.help = {
    name: "coinFlip"
}