module.exports.run = async (verificationChannel, verificationProcess, cafe, luaLearner, awaitingVerificationRole, audit) => {
    const filter = (reaction, user) => !cafe.member(user).roles.has(luaLearner.id) && !cafe.member(user).roles.has(awaitingVerificationRole.id)
    const message = verificationChannel.fetchMessage("528317191624327189")
    .then(message => {
        const collector = message.createReactionCollector(filter, {});
        collector.on("collect", (messageReaction, reactionCollector) => {
            const member = cafe.member(messageReaction.users.last().id)
            verificationChannel.send(`Hi there, ${member}! I'm the Robot that helps run everything around here. Thanks so much for agreeing to the rules! A moderator will soon verify you and you can be on your way. :smile:`)
            .then(message => {
                setTimeout(() => {
                    message.delete();
                    member.addRole(awaitingVerificationRole);
                    verificationProcess.run(member, verificationChannel)
                }, 10000);
            })
            audit.run("agreement", null, member, null);
        })
    })   
}