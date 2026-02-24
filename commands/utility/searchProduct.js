const { SlashCommandBuilder } = require('@discordjs/builders');
const { PythonShell } = require("python-shell");



module.exports = {
    data: new SlashCommandBuilder()
        .setName('searchproduct')
        .setDescription('Replies with info on product')
        .addStringOption(option =>
            option
                .setName('productname')
                .setDescription('Name of the product')
                .setRequired(true),
        ),
    async execute(interaction){
        await interaction.deferReply();
        const productName = interaction.options.getString('productname');
        const options = {
            scriptPath:"C:/Users/mufft/SEMREPOS/mikasBot/webScraper",
            mode: 'text',
            pythonOptions: ['-u'],
            args: [productName]
        }

        console.log(productName);

        PythonShell.run('getProduct.py', options, (err, res) => {
            if (err){
                console.error(err);
                interaction.editReply('❌ Error fetching product');
            } else {
                interaction.editReply(res.join('\n'));
            }
        })
    },
};