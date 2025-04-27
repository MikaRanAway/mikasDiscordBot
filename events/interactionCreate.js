const { Events, MessageFlags } = require('discord.js');

//Adds a listener on a interaction to the bot, then logs the interaction
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        //If its not a slash command, dont do anything for typeguarding
		if (!interaction.isChatInputCommand()) return;
        //Look through the client command collection to find the interaction with a matching commandName
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
            //Also print error on the discord client, an ephermeral flag means only the user who used the command can see it. Deferred means whether or not the current interaction is a delyaed one, still printing an error
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
		}
	},
};