module.exports.run = async (bot, message, args, config) => {
    const muteRole = config.roles.muted
    const cafe = config.settings.cafeServer
    const collectionOfMutes = cafe.members.filter(member => member.roles.has(muteRole.id))
    let strOfMutes = "";
    collectionOfMutes.array().forEach(mutedMember => {
        strOfMutes.concat(", "+mutedMember);
    })
    if ((!strOfMutes) || (strOfMutes.length === 0)) return message.channel.send("No one is muted, yay!");
    message.channel.send(strOfMutes);
}


module.exports.help = {
    name: "listMutes"
}