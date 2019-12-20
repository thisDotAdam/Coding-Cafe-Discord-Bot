const Discord = require("discord.js");
const mongoose = require("mongoose");
const deletedMessageSchema = require("../schemas/deletedMessageSchema.js");

module.exports.run = async (bot, message, args) => {
    const deletedMessage = new deletedMessageSchema({
        username: message.author.username,
        userID: message.author.id,
        messageDeleted: message.content,
        channelDeleted: message.channel,
        timeDeleted: Date()
    });

    deletedMessage.save().catch(err => console.log(err));
}
