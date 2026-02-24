const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('user')
        .setDescription('Returns information on user'),
    async execute(interaction){
        //Async because a reply from discord my take some time
        //The user object is who called the slash command and member is the guild member object
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined the foobles on ${interaction.member.joinedAt}.`);
    }
};