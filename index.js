// Require the main discord.js classes
const { Client, Events, GatewayIntentBits, Collection, MessageFlags } = require('discord.js');

//Require Nodes path and file modules
const fs = require('node:fs');
const path = require('node:path');

//Require token from dotenv
const dotenv = require('dotenv');
const { stripTypeScriptTypes } = require('node:module');
dotenv.config();
const token = process.env.DISCORD_TOKEN;

//Create a new client instance 
//Intents tells what the bot should react to from discord, what events and messages, in this case guilds is from servers
const client = new Client ({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ] 
});

//Gives the client bot access to the commands. Used to store and effectively call upon commands
client.commands = new Collection();

//Folders path combines the current directory of where the script is being run with the commands directory
const foldersPath = path.join(__dirname, 'commands');
//This commands reads all directories in the path provided above synchronously - wait for the command to finish before continuing
const commandFolders = fs.readdirSync(foldersPath);

for(const folders of commandFolders){
    const commandsPath = path.join(foldersPath, folders);
    //Returns all files ending with .js to commandFile
    const commadFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for(const file of commadFiles){
        const filePath = path.join(commandsPath, file);
        //Returns the data and command of this command file
        const command = require(filePath);
        if('data' in command && 'execute' in command){
            //Adds to the client commands collection
            client.commands.set(command.data.name, command);
        }else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//Log into discord with the client token
client.login(token)
