const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides info about the server'),
    async execute(interaction){
        //the guild object is the server the interaction was called in
        await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
    },
};