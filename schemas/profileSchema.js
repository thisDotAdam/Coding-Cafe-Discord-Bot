const mongoose = require("mongoose");
const profileSchema = mongoose.Schema({
    username: String,
    userID: String,
    avatar: String,
    joinDate: String,
    xp: Number,
    coffeeBeans: Number,
    messageCount: Number,
    profileStartDate: String,
    daily: Number,
    quote: String,
    profileColor: String,
    cupsOfCoffee: Number,
    lastCoffee: Number,
    caffeineMeter: String,
    match: String
})

module.exports = mongoose.model("profile", profileSchema, "profiles");