const { Events } = require("discord.js");

const { PythonShell } = require("python-shell");

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const pokemonChannel = "1467914245088739390";

        const channel = await client.channels.fetch(pokemonChannel);
        
        let options = {
            scriptPath:"C:/Users/mufft/SEMREPOS/mikasBot/webScraper",
            pythonOptions: ["-u"]
        }

        const webScript = new PythonShell("scrape.py", options);

        webScript.on("message", (message) => {
            channel.send(message);
        });

        webScript.on("stderr", (stderr) => {
            channel.send(stderr);
        });
	},
};