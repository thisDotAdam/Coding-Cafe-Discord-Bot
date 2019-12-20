const Discord = require("discord.js");
const bot = new Discord.Client();
bot.mutes = require("./mutes.json");
const fs = require("fs");
const ms = require("ms");
const mongoose = require('mongoose')
// Add password below to connect to Mongo
const mongoURL = "mongodb+srv://Adam:<password>@coding-cafe-0eqd7.mongodb.net/CodingCafe?retryWrites=true"
mongoose.connect(mongoURL, { useNewUrlParser: true }).catch(err => console.log("Couldn't connect... Erro: "+err));
const config = require("../CodingCafe/config.json");
const audit = require("./cafeFunctions/auditLog.js");
const verificationProcess = require("./cafeFunctions/verificationProcess");
const settings = config.settings;
const channels = config.channels;
const greetings = config.greetings;
const roles = config.roles;
const prefix = settings.prefix;
const agreementProcess = require("./cafeFunctions/agreementProcess.js");
const goodbyeMessages = require("./cafeGoodbyeMessages.json").messages;
const welcomeMessages = require("./cafeWelcomeMessages.json").messages;
let awaitingVerificationRole;
let verificationChannel;
let welcomeChannel;
let luaLearner;
let awaitRole;
let wure;
bot.commands = new Discord.Collection();
const logDeletedMessage = require("./cafeFunctions/logDeletedMessage.js");
const messageCounter = require("./cafeFunctions/messageCounter.js");
bot.login(config.settings.password);
const profileSchema = require("./schemas/profileSchema.js");





//////////////// READING COMMAND FILES ///////////////////////////////////////////////////////////////////////////////////////
fs.readdir("./cafeCommands/", (err, files) => {
    if(err) console.error(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <= 0) {
        console.log("No commands exist.");
    }

    jsFiles.forEach((f, i) => {
        let props = require(`./cafeCommands/${f}`);
        bot.commands.set(props.help.name, props);
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////// | BOOT UP | //////////////////////////////////////////////////////////////////////////////
bot.on("ready", () => {
    console.log("---------------------------------------------------------------------------------");
    bot.user.setActivity("the Café.", {type: "WATCHING"});
    settings.cafeServer = bot.guilds.find(g => g.name === "Coding Café");
    const cafe = settings.cafeServer;

    // declaring channels //
    channels.welcomeChannel, welcomeChannel = cafe.channels.find(channel => channel.id === "516653705131458560");
    channels.cafeCounter, cafeCounter = cafe.channels.find(channel => channel.id === "517362091062067210");
    channels.botTesting, botTesting = cafe.channels.find(channel => channel.id === "517754760988721162");
    channels.verificationChannel, verificationChannel = cafe.channels.find(channel => channel.id === "518116796872785921");
    channels.auditChannel = cafe.channels.find(channel => channel.id === "522901412125081631");
    channels.awaitingVerification = cafe.channels.find(channel => channel.id === "528330073326092308");
    ////////////////////////

    // Declaring roles //
    roles.muted = cafe.roles.find(role => role.name === "Muted");
    roles.moderator = cafe.roles.find(role => role.name === "Moderator");
    roles.bots = cafe.roles.find(role => role.name === "Café Robots");
    roles.administator = cafe.roles.find(role => role.name === "Administrator");
    roles.luaLearner = cafe.roles.find(role => role.name === "Lua Learner");
    roles.trialModerator = cafe.roles.find(role => role.name === "Trial Moderator");
    roles.awaitingVerification, awaitingVerificationRole = cafe.roles.find(role => role.name === "Awaiting Verification");
    luaLearner = roles.luaLearner;
    /////////////////////

    // Declaring Agreement Process // 
    agreementProcess.run(verificationChannel, verificationProcess, cafe, luaLearner, awaitingVerificationRole, audit);
    /////////////////////////////////
    cafeSize = cafe.memberCount;
    cafeCounter.setName(`Member Count: ${cafeSize}`);
    console.log(`Server size: ${cafeSize}`);    

    wure = cafe.members.find(member => member.user.username === "Wure");
    //kai = cafe.members.find(member => member.user.username === "admir146");
    //kai.user.send("You're welcome, admir146. :grin:")
    const members = new Map()

    // TEMP MUTE PROCESS //
    bot.setInterval(() => {
        for(let i in bot.mutes) {
            if (Date.now() > bot.mutes[i].timeToUnmute) {
                const member = cafe.members.find(member => member.id === i);
                console.log("user: "+member.user.username);
                if (!member) audit.run("unmute", botes.mutes[i].moderator, member, "This member should be unmuted now, but they have left the server!");
                member.removeRole(cafe.roles.find(role => role.name === "Muted"));
                member.send(`Hey there, ${member}! Finally, you were unmuted in Coding Café. Please respect the rules. (:`);
                audit.run("unmute", bot.mutes[i].moderator, member, "Automatically unmuted by CC bot.", bot.mutes[i].amountOfTimeMuted);
                delete bot.mutes[i];
                fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
                    if(err) throw(err);
                    console.log("rewriting mutes file");
                })
            }
        }
    }, ms("1m"));
    /////////////////////


    // COFFEE METERE DEPLETE //
    bot.setInterval(() => {
        profileSchema.find().stream().on("data", document => {
            if (!document.caffeineMeter) return;
            if (document.caffeineMeter) {
                profileSchema.findOne({
                    _id: document._id
                }, (err, profile) => {
                    if (!profile.caffeineMeter) return
                    if (profile.caffeineMeter === "☕") profile.caffeineMeter = "😫";
                    else if (profile.caffeineMeter != "😫") profile.caffeineMeter = profile.caffeineMeter.substring(0, profile.caffeineMeter.length-1);
                    profile.save()
                })
            } 
        })
    }, ms("10m"));

   /*  bot.setInterval(() => {
        wure.roles.find(r => r.name == "Café Owner").setColor("RANDOM");
        }), ms("2s") */
    //////////////////////////

    /* console.log(cafe.members.map(member => {
        if (!member.roles.has(luaLearner.id)) member.addRole(luaLearner);
    })); */

    contigo.channels.find(c => c.id == "598585595442495508").then(c => {
        c.fetchMessage("598895472609853463").then(m => {
            m.reactions.forEach(r => {
                console.log(r.emoji);
                m.react(r.emoji);
            })
        })
    })

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////// | MESSAGE EVENT | /////////////////////////////////////////////////////////////////////////
bot.on("message", message => {
    if (message.author.bot) return
    if (message.channel.type === "dm") return bot.guilds.first().channels.find(channel => channel.id == "531940537201065985").send(`<@76468222861250560>, the user **${bot.guilds.first().member(message.author)}** sent me the following message: **"${message.content}"**`)
    if ((message.content.includes("@everyone") || message.content.includes === "@here") && (!message.member.roles.has(roles.moderator.id))) {
        message.delete();
        message.channel.send(`Woah there, ${message.author}. Don't mention everyone!`);
    }

    messageCounter.run(bot, message);

    if (!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args, config);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////// | MEMBER JOINED | ///////////////////////////////////////////////////////////////////////
bot.on("guildMemberAdd", member => {
    if (!welcomeChannel) return;
    cafeCounter.setName(`Member Count: ${++cafeSize}`);

    profileSchema.findOne({
        userID: member.user.id
    }, (err, profile) => {
        if (profile) return 
        
        const newProfile = new profileSchema({
            username: member.user.username,
            userID: member.user.id,
            avatar: member.user.displayAvatarURL,
            joinDate: Date(),
            xp: 0,
            coffeeBeans: 100,
            messageCount: 0,
            profileStartDate: Date(),
            daily: 0,
            quote: "N/A",
            cupsOfCoffee: 0,
            lastCoffee: 0,
            caffeineMeter: 0,
            match: "No one </3"
        });
        newProfile.save().catch(err => console.log(err));
    })

    const welcomeEmbed = new Discord.RichEmbed()
        .setThumbnail(bot.user.avatarURL)
        .setFooter(greetings.footer)
        .setColor("#00ff99")
        .addField(`Hello ${member.user.username}! :wave:`, `Everyone at Coding Café welcomes you to the community! To get verified, have a look at the #verification channel, specifically the message that includes your name. Click the thumbs up reaction to that message!`)
        //.addField("__For Lua Beginners__", greetings.luaBeginnersParagraph)
        //.addField("__For Lua Students__", greetings.luaStudentsParagraph)
        //.addField("__For Lua Experts__", greetings.luaExpertsParagraph);
    member.send(welcomeEmbed);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////// | MEMBER LEFT | /////////////////////////////////////////////////////////////////////////
bot.on("guildMemberRemove", member => {
    if (!welcomeChannel) return;
    let randomMessage = goodbyeMessages[Math.floor(Math.random()*goodbyeMessages.length)]
    let goodbyeMessage = randomMessage.replace("${member}", `**${member.user.username}**`);
    welcomeChannel.send(goodbyeMessage)

    console.log(`${member.user.username} left.`)
    cafeCounter.setName(`Member Count: ${--cafeSize}`)
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////// | MESSAGE DELETED | /////////////////////////////////////////////////////////////////////////
bot.on("messageDelete", message => {
    if (message.author.id != "516656014100004881") {
        logDeletedMessage.run(bot, message, null);
        audit.run("deleted_Message", null, message.member, null, message);
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////