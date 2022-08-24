const Discord = require(`discord.js`)
const MessageEmbed = require(`discord.js`)
const guildId = '872201881248739339'
const fs = require('node:fs')
const path = require('node:path')
const { Client, GatewayIntentBits, Partials, Collection  } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.DirectMessageReactions],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction] });

const { prefix, token } = require(`./config.json`)

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}






client.once('ready', async () =>{
// let db = new sqlite.Database('./timezones.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
// db.run('CREATE TABLE IF NOT EXISTS timezones(userid INTEGER NOT NULL, username TEXT NOT NULL, timezone TEXT NOT NULL)')

  console.log(`Ready!`)

  client.user.setActivity(`Use -help for a command list.`)
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.on('messageCreate', message =>{

console.log(message.content)

if(!message.content.startsWith(`${prefix}`)){
//|| message.author.bot)
return
}

})


client.login(token)