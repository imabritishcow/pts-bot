const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const fs = require('fs');
const today = new Date();
const moment = require('moment-timezone');
const mongoose = require('mongoose')

mongoose.connect(config.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	id: String,
	username: String,
	pts: Number,
	dateCreated: String
});

let User = mongoose.model('user', UserSchema);

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.login(config.TOKEN);

const PREFIX = '/';

client.on('ready', () => {
	console.log('Started bot');
	client.user.setActivity("/pts");
});

client.on('userUpdate', (oldUser, newUser) => {
	User.findOne({ id: oldUser.id }, function(err, user) {
		if (err) throw err;

		if(user != null) {
			user.username = newUser.username;
			user.save();
		}
	})
});


client.on('messageDelete', (message) => {
	let embed = new Discord.MessageEmbed()
		.setDescription('**Message Deleted**')
		.setColor(0x2e3192)
		.addField('Sent by', `<@${message.author.id}>`)
		.addField('Message', message.content)
		.setFooter(moment(today).tz('America/New_York').format('L h:mm A z'));
	client.channels.fetch('686360592357130342').then(channel => {
		channel.send(embed);
	})
});

client.on('message', (message) => {
	let args = message.content.substring(PREFIX.length).split(' ');
	if (!message.content.includes(PREFIX)) return;

	switch (args[0]) {
		case 'addpts':
			client.commands.get('addpts').execute(message, args, User);
			break;
		case 'delac':
			client.commands.get('delac').execute(message, User);
			break;
		case 'faqs':
			client.commands.get('faqs').execute(message);
			break;
		case 'help':
			client.commands.get('help').execute(message);
			break;
		case 'leaderboard':
			client.commands.get('leaderboard').execute(message, User);
			break;
		case 'newac':
			client.commands.get('newac').execute(message, User);
			break;
		case 'pts':
			client.commands.get('pts').execute(message, args, User);
			break;
		case 'setpts':
			client.commands.get('setpts').execute(message, args, User);
			break;
		case 'staffhelp':
			client.commands.get('staffhelp').execute(message);
			break;
	}
});
