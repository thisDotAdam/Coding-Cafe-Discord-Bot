module.exports.run = async (bot, message, args, config) => {
    const version = config.settings.version;
    message.channel.send(`I'm currently running verion ${version}. :grin:`);
}

module.exports.help = {
    name: "version"
}