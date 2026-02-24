const { SlashCommandBuilder } = require("@discordjs/builders");
const { execute } = require("./user");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("teambuilder")
    .setDescription(
      "Use this command to randomly sort your channels users into a number of teams"
    )
    .addIntegerOption((option) =>
      option
        .setName("teamnumber")
        .setDescription(
          "State the number of teams you want to split the users into"
        )
    ),

  async execute(interaction) {
    const numberOfTeams = interaction.options.getInteger("teamnumber");
    const memberCalling = interaction.member;

    if (memberCalling.voice) {
      const userCount = memberCalling.voice.channel.recipients;

      await interaction.reply(
        `Your team count is ${numberOfTeams} and you are ${memberCalling}`
      );
    } else {
      await interaction.reply(
        `Your team count is ${numberOfTeams} and you are ${memberCalling}, your voice channel has ${userCount}`
      );
    }
  },
};
