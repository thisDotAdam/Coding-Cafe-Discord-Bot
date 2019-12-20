const mongoose = require("mongoose");
const deleteMessageSchema = mongoose.Schema({
    username: String,
    userID: String,
    messageDeleted: String,
    channelDeleted: String,
    timeDeleted: String
})

module.exports = mongoose.model("deletedMessage", deleteMessageSchema, "deletedMessages");