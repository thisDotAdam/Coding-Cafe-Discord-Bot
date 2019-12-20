module.exports.run = async (bot, message, args, config) => {
    message.delete();
    if (message.member.roles.find(role => role.id == "539475719139622944")) {
        return message.channel.send(`Psst, ${message.member}, you already have this role. :eyes:`);
    }
    const filter = (reaction, user) => { return reaction.emoji == "👍" && user.id == message.author.id};
    message.author.send(`Hi there, **${message.author.username}**. You requested access to the #nsfw channel at Coding Café! In order to get access, you need to acknowledge the following rules and accept them.\n\n`+
    `:star: The NSFW channel is **not** for pornographic imagary.\n`+
    `:star: While in the NSFW channel you must still **follow the rules of Coding Café**.\n`+
    `:star: If someone is uncomfortable with something you're doing, **you stop**.\n`+
    `:star: You will **not** actively advertise that there is a NSFW channel and endorse people to join it.\n`+
    `:star: **Rules may be added as needed** and any future update to these rules will be announced in the NSFW channel.`)
    .then(verifyMessage => {
        verifyMessage.react("👍")
        verifyMessage.awaitReactions(filter, {time : 30000, max : 1 })
        .then(collected => {
          if (collected.array().length == 0) {
              verifyMessage.delete();
              message.author.send("You didn't respond in time.").then(cancelledMessage => setTimeout(() => {cancelledMessage.delete()}, 3000));
          }
          else {
              message.author.send(`${message.member}, you have been given the **Affagato Dessert role**.`);
              message.member.addRole(message.guild.roles.find(role => role.id == "539475719139622944"))
              message.guild.channels.find(channel => channel.name == "nsfw").send(`@here, ${message.member} just joined us!`)
          }
      })
  })
}

module.exports.help = {
    name: "nsfw"
}